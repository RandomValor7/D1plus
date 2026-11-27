const db = require("../config/db");
const { ReporteModel } = require("../models");
const { ROLES, RECEPTORES_ALERTAS } = require("../config/permisos");
const reglas = require("../config/reglas");
const { aDia, aSql, sumarDias } = require("../utils/fechas");
const marcadores = (lista) => lista.map(() => "?").join(", ");

// Usuarios activos que tienen alguno de los roles
const destinatarios = async (roles) => {
   const [filas] = await db.query(
      `SELECT u.id_usuario FROM usuario u
 JOIN rol r ON r.id_rol = u.id_rol
 WHERE u.estado = 1 AND r.nombre_rol IN (${marcadores(roles)})`,
      roles
   );
   return filas.map((f) => f.id_usuario);
};

// Crea la notificacion para cada destinatario, sin repetir una que
// todavia no ha leido (RNF09: alertas sin duplicados)
const notificar = async (tipo, mensaje, roles = RECEPTORES_ALERTAS) => {
   const texto = mensaje.slice(0, 255);
   let creadas = 0;
   for (const id of await destinatarios(roles)) {
      const [repetida] = await db.query(
         `SELECT id_notificacion FROM notificacion
 WHERE id_usuario = ? AND tipo = ? AND mensaje = ? AND estado = 0`,
         [id, tipo, texto]
      );
      if (repetida.length > 0) {
         continue;
      }
      await db.query(
         `INSERT INTO notificacion (mensaje, tipo, id_usuario)
 VALUES (?, ?, ?)`,
         [texto, tipo, id]
      );
      creadas++;
   }
   return creadas;
};

const mensajeStock = (p) =>
   "Stock bajo: " + p.nombre + " tiene " + p.stock +
   " unidades (minimo: " + p.stock_minimo + ")";
// RF33: alerta de un solo producto (se usa despues de vender)
const alertaStockBajo = async (idProducto) => {
   const [filas] = await db.query(
      `SELECT nombre, stock, stock_minimo, estado
 FROM producto WHERE id_producto = ?`,
      [idProducto]
   );
   const p = filas[0];
   if (!p || p.estado !== 1 || p.stock > p.stock_minimo) {
      return 0;
   }
   return notificar("Stock bajo", mensajeStock(p));
};

// RF33: revisa todos los productos
const alertasStockBajo = async () => {
   const [productos] = await db.query(
      `SELECT nombre, stock, stock_minimo FROM producto
 WHERE estado = 1 AND stock <= stock_minimo`
   );
   let total = 0;
   for (const p of productos) {
      total += await notificar("Stock bajo", mensajeStock(p));
   }
   return total;
};

// RF11 y RF35: productos vencidos o por vencer
const alertasVencimiento = async () => {
   const hoy = aDia(new Date());
   const limite = aDia(sumarDias(new Date(), reglas.DIAS_VENCIMIENTO));
   const [productos] = await db.query(
      `SELECT nombre, fecha_vencimiento FROM producto
 WHERE estado = 1 AND fecha_vencimiento IS NOT NULL
 AND fecha_vencimiento <= ?`,
      [limite]
   );
   let total = 0;
   for (const p of productos) {
      const dia = aDia(new Date(p.fecha_vencimiento));
      const vencido = dia < hoy;
      total += await notificar(
         vencido ? "Producto vencido" : "Producto por vencer",
         (vencido ? "Vencido: " : "Por vencer: ") + p.nombre +
         " vence el " + dia
      );
   }
   return total;
};

// RF34: pedidos que llevan varios dias sin aprobarse
const alertasPedidosPendientes = async () => {
   const limite = aSql(
      sumarDias(new Date(), -reglas.DIAS_PEDIDO_PENDIENTE)
   );
   const [pedidos] = await db.query(
      `SELECT id_pedido, fecha_pedido FROM pedido
 WHERE estado = 'Pendiente' AND fecha_pedido <= ?`,
      [limite]
   );
   let total = 0;
   for (const p of pedidos) {
      total += await notificar(
         "Pedido pendiente",
         "El pedido #" + p.id_pedido + " sigue pendiente desde el " +
         aDia(new Date(p.fecha_pedido))
      );
   }
   return total;
};

// RF12: productos con stock que casi no se venden
const alertasBajaRotacion = async () => {
   const desde = aSql(sumarDias(new Date(), -reglas.DIAS_ROTACION));
   const productos = await ReporteModel.rotacion(desde);
   let total = 0;
   for (const p of productos) {
      if (p.stock > 0 && Number(p.vendidas) < reglas.ROTACION_MEDIA) {
         total += await notificar(
            "Baja rotacion",
            "Baja rotacion: " + p.nombre + " vendio " + p.vendidas +
            " unidades en " + reglas.DIAS_ROTACION + " dias"
         );
      }
   }
   return total;
};

// Revisa todas las alertas y devuelve cuantas creo de cada tipo
const generarAlertas = async () => ({
   stock_bajo: await alertasStockBajo(),
   vencimiento: await alertasVencimiento(),
   pedidos_pendientes: await alertasPedidosPendientes(),
   baja_rotacion: await alertasBajaRotacion()
});

// RF36: error critico del sistema, solo para administradores
const notificarError = (accion) =>
   notificar("Sistema", "Error critico al " + accion, [ROLES.ADMIN]);
module.exports = {
   notificar,
   alertaStockBajo,
   generarAlertas,
   notificarError
};

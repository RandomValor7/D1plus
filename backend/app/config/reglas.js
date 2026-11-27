// Reglas de negocio ajustables
module.exports = {
    // Pedido automatico (RF15): cantidad = stock minimo x 2 - stock
    MULTIPLO_REPOSICION: 2,
    // Alertas de vencimiento (RF11 y RF35)
    DIAS_VENCIMIENTO: 30,
    // Rotacion de productos (RF12 y RF29)
    DIAS_ROTACION: 30,
    ROTACION_ALTA: 100,
    ROTACION_MEDIA: 30,
    // Alerta de pedidos sin aprobar (RF34)
    DIAS_PEDIDO_PENDIENTE: 2,
    // Cada cuanto el servidor revisa las alertas por su cuenta
    MINUTOS_ENTRE_ALERTAS: 60
};

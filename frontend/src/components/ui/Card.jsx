//Tarjeta que sirve como contenedor con titulo.

export default function Card({ titulo, children }) {
    return (
        <section className="card">
            {titulo && <h3 className="card-titulo">{titulo}</h3>}
            {children}
        </section>
    );
}


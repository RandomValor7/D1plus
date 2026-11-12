// Componente de filtro de búsqueda. Permite al usuario ingresar un valor de búsqueda y manejar cambios en ese valor.

export default function SearchFilter({
    valor,
    onChange,
    placeholder = "Buscar...",
    children,
}) {
    return (
        <div className="filtros">
            <input
                className="filtro-busqueda"
                type="search"
                placeholder={placeholder}
                value={valor}
                onChange={(e) => onChange(e.target.value)}
            />
            {children}
        </div>
    );
}


export default function Sidebar({ setSortType }) {

    return (

        <div className="sidebar">

            <h3 className="sidebar-title">
                Ordenar por
            </h3>

            <button
                onClick={() => setSortType("top")}
                className="sidebar-link"
            >
                 Top
            </button>

            <button
                onClick={() => setSortType("new")}
                className="sidebar-link"
            >
                 Nuevo
            </button>

        </div>

    )

}
import { Link } from "react-router-dom";

export default function Navbar({ currentUser, handleLogout }) {
  return (
    <nav className="navbar">

      <div className="navbar-inner">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="navbar-logo">
            reddit
          </span>
        </Link>

        {/* BUSCADOR */}
        <div className="flex-1 px-10">
          <input
            type="text"
            placeholder="Buscar en Reddit"
            className="input-base rounded-full"
          />
        </div>

        {/* DERECHA */}
        {currentUser ? (

          <div className="flex items-center gap-4">

            <Link
              to="/create"
              className="btn-primary text-sm"
            >
              Crear
            </Link>

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>

              <span className="text-sm">
                {currentUser.username}
              </span>

              <button
                onClick={handleLogout}
                className="btn-danger text-sm"
              >
                Logout
              </button>

            </div>

          </div>

        ) : (

          <Link
            to="/login"
            className="navbar-link"
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}
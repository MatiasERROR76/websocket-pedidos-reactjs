import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-gray-800 p-6">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between ">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-medium text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/"
            className="text-2xl hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-gray-300"
          >
            Evol services
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            to="/clientes"
            className="text-lg hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-gray-300"
          >
            Clientes
          </Link>
          <Link
            to="/medidores"
            className="text-lg hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-gray-300"
          >
            Medidores
          </Link>
          <Link
            to="/pedidos"
            className="text-lg hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-gray-300"
          >
            Pedidos
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

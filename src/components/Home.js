import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Evol{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Services
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:text-2xl">
            Administradora de Energía Nº1 de Chile
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/clientes"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 md:py-4 md:text-lg md:px-10"
              >
                Ver clientes
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/medidores"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 md:py-4 md:text-lg md:px-10"
              >
                Ver medidores
              </Link>
            </div>

            <div className="mt-3 rounded-md transform hover:scale-105 sm:mt-0 sm:ml-3">
              <Link
                to="/cliente/agregar"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 md:py-4 md:text-lg md:px-10 transition-all duration-300"
              >
                Agregar cliente
              </Link>
            </div>
            <div className="mt-3 rounded-md transform hover:scale-105 sm:mt-0 sm:ml-3">
              <Link
                to="/medidor/agregar"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 md:py-4 md:text-lg md:px-10 transition-all duration-300"
              >
                Agregar medidor
              </Link>
            </div>
          </div>
        </div>
        <br></br>
      </main>
      <footer className="bg-white border-t-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500">
            &copy; 2023 Matias Cisternas. todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

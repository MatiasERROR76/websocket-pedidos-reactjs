import React, { useState, useEffect } from "react";
// ...

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import bookserevice from "../services/measurer.service";
function BookForm() {
  const initialvalue = {
    codigo: "",
    nombre: "",
    descripcion: "",
    clienteId: "", // Ajustado para
  };

  const [formData, setFormData] = useState(initialvalue);
  const [clientes, setClientes] = useState([]);
  console.log("Clientes:", clientes);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await bookserevice.getallids();
        setClientes(response.data.ids);
      } catch (error) {
        console.error("Error al obtener los clientes", error);
      }
    };

    fetchClientes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { codigo, nombre, descripcion, clienteId } = formData;

    if (codigo && nombre && clienteId) {
      bookserevice
        .Createbook(codigo, nombre, descripcion, clienteId)
        .then((response) => {
          setFormData(response);
          navigate(`/medidores`);

          swal("¡Medidor creado exitosamente!", {
            icon: "success",
          });
        })
        .catch((error) => {
          console.log("Error", error);
          error.toString();
        });
    } else {
      swal("Por favor, completa todos los campos.", {
        icon: "warning",
      });
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full w-full	bg-cover bg-center bg-Bg-image">
        <div className="flex flex-col items-center px-6 py-4 mx-auto lg:py-0">
          <div className="lg:mt-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight  text-gray-900 md:text-2xl dark:text-white">
                Agregar Medidor
              </h1>
              <form className="" onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="codigo"
                    >
                      Código del medidor
                    </label>
                    <input
                      type="text"
                      id="codigo"
                      placeholder="código del medidor"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="Nombre"
                    >
                      Nombre del medidor
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      placeholder="Nombre del medidor"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className=""></div>
                  <label
                    className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="descripcion"
                  >
                    Descripción
                  </label>
                  <div className="">
                    <textarea
                      type="text"
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="clienteId"
                    >
                      Asignar un cliente
                    </label>
                    <select
                      id="clienteId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      name="clienteId"
                      value={formData.clienteId}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccionar Cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="mt-8  md:ml-16 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600"
                  >
                    Agregar medidor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookForm;

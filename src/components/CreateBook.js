import React, { useState } from "react";
import bookserevice from "../services/book.service";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function formatRut(value) {
  // Elimina caracteres no numéricos
  const cleanValue = value.replace(/\D/g, "");

  // Divide el RUT en parte numérica y dígito verificador
  const numericPart = cleanValue.slice(0, -1);
  const verifierDigit = cleanValue.slice(-1);

  // Formatea la parte numérica
  const formattedNumericPart = numericPart.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1."
  );

  // Retorna el RUT formateado
  return `${formattedNumericPart}-${verifierDigit}`;
}

function BookForm() {
  const initialvalue = {
    rut: "",
    nombre: "",
    direccion: "",
  };

  const [formData, setFormData] = useState(initialvalue);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "rut") {
      formattedValue = formattedValue.slice(0, 12);
      formattedValue = formatRut(formattedValue);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ((formData.rut && formData.nombre, formData.direccion)) {
      bookserevice
        .Createbook(formData.rut, formData.nombre, formData.direccion)
        .then((response) => {
          setFormData(response.data);
          navigate(`/clientes`);

          swal("Cliente creado exitosamente!", {
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
                Agregar Cliente
              </h1>
              <form className="" onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="rut"
                    >
                      Rut
                    </label>
                    <input
                      type="text"
                      id="rut"
                      placeholder="ej: 19.993.975-0"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      name="rut"
                      value={formData.rut}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="Nombre"
                    >
                      Nombre del cliente
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      placeholder="Nombre del cliente"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="direccion"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      placeholder="Dirección"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-8  md:ml-16 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600"
                  >
                    Agregar cliente
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bookserevice from "../services/book.service";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  // initialize book value
  const initialBookState = {
    nombre: "",
    direccion: "",
  };
  //set states for book
  const [book, setBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  //Get ID from url
  const { id } = useParams();
  //Get api call  to get book with id who's value will be update
  const getbook = async () => {
    bookserevice
      .getbookbyid(id)
      .then((response) => {
        console.log("data", response);
        setBook(response);
      })
      .catch((error) => {
        console.log("Err", error);
      });
  };
  useEffect(() => {
    getbook();
    // eslint-disable-next-line
  }, []);

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };
  //Update book
  const updatebook = () => {
    swal({
      title: "¿Estas seguro de modificar los datos del cliente?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        bookserevice
          .update(id, book)
          .then((response) => {
            navigate(`/clientes`);

            setMessage("Cliente actualizado exitosamente!");

            // Muestra el Sweet Alert de éxito
            swal("Cliente actualizado exitosamente!", {
              icon: "success",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        swal("No se realizó ninguna modificación.");
      }
    });
  };

  return (
    <>
      <div className="bg-no-repeat	bg-cover bg-center bg-new-image">
        <div className="flex flex-col items-center px-6 py-4 mx-auto md:h-screen lg:py-0">
          <div className="m-10 w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              {book ? (
                <div>
                  <div className="mb-4 text-xl font-bold  text-black-600 md:text-2xl">
                    <h4>Actualizar Cliente</h4>
                  </div>
                  <form>
                    <div className=""></div>
                    <label
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="rut"
                    >
                      Nombre del cliente
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        id="nombre"
                        name="nombre"
                        value={book.nombre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="rut"
                      >
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="direccion"
                        name="direccion"
                        value={book.direccion}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="md:ml-16  mt-8 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={updatebook}
                  >
                    Actualizar cliente
                  </button>
                  <p className="mt-4 text-green-600 font-bold">{message}</p>
                  <br></br>

                  <Link
                    to={`/clientes`}
                    className="mt-4  font-md text-blue-600"
                  >
                    Volver a la lista de clientes
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;

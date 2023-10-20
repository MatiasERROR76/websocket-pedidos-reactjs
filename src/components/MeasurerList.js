import { React, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import swal from "sweetalert";
import bookservice from "../services/measurer.service";

const BookList = (props) => {
  // UseNavigate to move other components
  const navigate = useNavigate();

  // set states for Book
  const [book, setBook] = useState([]);

  useEffect(() => {
    //Api call to fetch All Book data
    const geAllbook = async () => {
      bookservice
        .getallbooks()
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.log("Err", error);
        });
    };
    geAllbook();
    // eslint-disable-next-line
  }, []);

  //Function to go to Update page with Book id
  const updatebook = async (bookId) => {
    navigate("/editarmedidor/" + bookId);
  };

  //Delete Book with Specified Id
  const deletebook = async (bookId) => {
    //Use Sweet Alert popup modal for Delete confirmation
    swal({
      title: "¿Estas seguro de eliminar el medidor?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        bookservice.remove(bookId).then((response) => {
          swal("Medidor eliminado exitosamente!", {
            icon: "success",
          });

          // Actualiza el estado de los libros después de la eliminación
          setBook((prevBooks) =>
            prevBooks.filter((book) => book.id !== bookId)
          );
        });
      } else {
        swal("El medidor no se ha borrado!");
      }
    });
  };
  //Setting up column header
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Fecha de creación",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const fecha = value.split("T")[0]; // Obtiene la fecha sin la hora
          return <span>{fecha}</span>;
        },
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Cliente asignado",
        accessor: "clienteId",
      },

      {
        Header: "Opciones",
        accessor: "",

        Cell: ({ row }) => {
          const bookId = row.original.id;
          return (
            <div>
              <button
                type="button"
                className="mr-2 px-3 py-2.5 bg-blue-400 text-white font-medium text-xs uppercase rounded-full hover:bg-blue-500 hover:shadow-lg active:bg-blue-600 active:shadow-lg"
                onClick={() => updatebook(bookId)}
              >
                Editar
              </button>
              <button
                type="button"
                className="px-3 py-2.5 bg-red-600 text-white font-medium text-xs uppercase rounded-full hover:bg-red-700 hover:shadow-lg active:bg-red-700 active:shadow-lg"
                onClick={() => deletebook(bookId)}
              >
                Eliminar
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: book,
    });
  return (
    <>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="my-4 ml-4 text-medium font-bold text-slate-800 uppercase ">
                Medidores evol services
              </div>
              <table
                className="min-w-full divide-y divide-gray-300"
                // apply the table props
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          //Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th
                              className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase "
                              {...column.getHeaderProps()}
                            >
                              {
                                // Render the header
                                column.render("Header")
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                {/* Apply the table body props  */}
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {
                    // Loop over the table rows
                    rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr
                          {...row.getRowProps()}
                          className="divide-x divide-gray-100"
                        >
                          {row.cells.map((cell) => {
                            // Apply the cell props

                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {console.log(row)}
                                {
                                  //Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;

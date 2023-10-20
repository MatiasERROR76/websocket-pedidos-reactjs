import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useTable } from "react-table";
import bookservice from "../services/book.service";

const socket = io("http://localhost:4000");

const BookList = (props) => {
  const [pedidos, setPedidos] = useState([]);
  const [book, setBook] = useState([]);

  const getallpedidos = async () => {
    try {
      const response = await bookservice.getallpedidos();
      setBook(response.data);
    } catch (error) {
      console.log("Err", error);
    }
  };

  useEffect(() => {
    socket.on("pedidos", (pedidos) => {
      setPedidos(pedidos);
    });

    socket.on("pedidoCreado", (nuevoPedido) => {
      setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
    });

    getallpedidos();
  }, []);

  const combinedData = [...pedidos, ...book]; // Combina los pedidos de la API con los recibidos por socket

  const columns = React.useMemo(
    () => [
      {
        Header: "Número",
        accessor: "numero",
      },
      {
        Header: "Costo",
        accessor: "costo",
      },
      {
        Header: "Tiempo",
        accessor: "tiempo",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: combinedData, // Usa el conjunto de datos combinados
    });

  return (
    <div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-300"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="divide-x divide-gray-100">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;

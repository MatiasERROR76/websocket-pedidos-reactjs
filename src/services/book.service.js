import http from "./http-common";

//Api call for Create book
const Createbook = async (rut, nombre, direccion) => {
  return http
    .post("/clientes", {
      rut,
      nombre,
      direccion,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to show book with Id
const getbookbyid = async (id) => {
  return http
    .get(`/clientes/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to show all Books Data  from database
const getallbooks = async () => {
  return http
    .get("/clientes")
    .then(function (response) {
      if (response) {
        return response;
        console.log(response);
      } else {
        return response.status(500).send({
          message: "error de servidor",
        });
      }
      // console.log("Response2", response);
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

const getallpedidos = async () => {
  return http
    .get("/pedidos")
    .then(function (response) {
      if (response) {
        return response;
        console.log(response);
      } else {
        return response.status(500).send({
          message: "error de servidor",
        });
      }
      // console.log("Response2", response);
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Update Api call to update Book
const update = (id, data) => {
  return http.put(`/clientes/${id}`, data);
};

//Remove Book with Id
const remove = (id) => {
  return http.delete(`/clientes/${id}`);
};

const bookserevice = {
  Createbook,
  getbookbyid,
  getallbooks,
  update,
  remove,
  getallpedidos,
};

export default bookserevice;

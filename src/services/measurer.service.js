import http from "./http-common";

//Api call for Create book
const Createbook = async (codigo, nombre, descripcion, clienteId) => {
  return http
    .post("/medidores", {
      codigo,
      nombre,
      descripcion,
      clienteId,
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
    .get(`/medidores/${id}`)
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
    .get("/medidores")
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

const getallids = async () => {
  return http
    .get("/ids")
    .then(function (response) {
      if (response) {
        console.log(response); // Mueve esta línea aquí
        return response;
      } else {
        return response.status(500).send({
          message: "error de servidor",
        });
      }
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Update Api call to update Book
const update = (id, data) => {
  return http.put(`/medidores/${id}`, data);
};

//Remove Book with Id
const remove = (id) => {
  return http.delete(`/medidores/${id}`);
};

const bookserevice = {
  Createbook,
  getbookbyid,
  getallbooks,
  update,
  remove,
  getallids,
};

export default bookserevice;

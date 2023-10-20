import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBook from "./components/CreateBook";
import BookList from "./components/BookList";
import MeasurerList from "./components/MeasurerList";
import UpdateMeasurer from "./components/UpdateMeasurer";
import CreateMeasurer from "./components/CreateMeasurer";
import Update from "./components/UpdateBook";
import Home from "./components/Home";
import Notfound from "./components/NotFound";
import Navbar from "./components/Nav";
import PedidoList from "./components/PedidoList";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path="/cliente/agregar" element={<CreateBook />} />
          <Route exact path="/medidor/agregar" element={<CreateMeasurer />} />
          <Route exact path="/clientes" element={<BookList />} />
          <Route exact path="/medidores" element={<MeasurerList />} />
          <Route exact path="/pedidos" element={<PedidoList />} />
          <Route exact path="/editarmedidor/:id" element={<UpdateMeasurer />} />
          <Route path="/editarcliente/:id" element={<Update />} />

          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;

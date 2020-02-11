import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/ Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: ""
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const { ciudad, pais } = busqueda;

    const consultarAPI = async () => {
      if (consultar) {
        const appId = "989ed5aadcc7e6cac00613d7ea6373c7";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const nuevoResultado = await respuesta.json();

        guardarResultado(nuevoResultado);
        guardarConsultar(false);

        //detectar si hubo resultado correcto en la busqueda y si no, muestra el error
        if (nuevoResultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };

    consultarAPI();
  }, [busqueda, consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="NO HAY RESULTADO" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="CLIMA" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={busqueda => {
                  console.log("APP typeof guardarBusqueda: ", guardarBusqueda);

                  guardarBusqueda(busqueda);
                }}
                guardarConsultar={consulta => {
                  console.log(
                    "APP typeof guardarConsultar: ",
                    guardarConsultar
                  );

                  guardarConsultar(consulta);
                }}
              />
            </div>
            <div className="col m6 s12">
              {componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

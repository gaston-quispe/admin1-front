import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import BuscarTurnoParaSolicitar from './BuscarTurnoParaSolicitar';
import ConfirmarSolicitudDeTurno from "./ConfirmarSolicitudDeTurno";
import AuthenticatedComponent from './AuthenticatedComponent';
import ResponsiveDrawer from "./ResponsiveDrawer";
import MisTurnos from "./MisTurnos";
import DetallesMedico from "./DetallesMedico";
import DetalleTurnoPaciente from "./DetalleTurnoPaciente";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { css } from "glamor";

const appBarTitles = {
    "/" : "Home",
    "/Login" : "Login",
    "/BuscarTurnoParaSolicitar" : "Solicitud de Turno",
    "/ConfirmarSolicitudDeTurno" : "Confirmar Solicitud",
    "/MisTurnos" : "Mis Turnos",
    "/DetalleTurnoPaciente" : "Detalle Turno",
    "/DetallesMedico" : "Detalles medico",
}
class App extends Component {
    render() {
      return (
        <div className="App">
          <BrowserRouter>
              <Switch>
                <ResponsiveDrawer titles={appBarTitles}>
                  <Route path="/Login" component={Login}/>
                  <AuthenticatedComponent>
                    <Route exact path="/" component={Home} />
                    <Route path="/BuscarTurnoParaSolicitar" component={BuscarTurnoParaSolicitar} />
                    <Route path="/ConfirmarSolicitudDeTurno" component={ConfirmarSolicitudDeTurno} />
                    <Route path="/MisTurnos" component={MisTurnos} />
                    <Route path="/DetallesMedico" component={DetallesMedico} />
                    <Route path="/DetalleTurnoPaciente" component={DetalleTurnoPaciente} />
                  </AuthenticatedComponent>

                </ResponsiveDrawer>
              </Switch>
          </BrowserRouter>
          <ToastContainer style = {{bottom: '25px'}}
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            closeButton={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
        </div>
      );
    }
}

export default App;

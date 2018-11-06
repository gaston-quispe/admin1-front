import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ObtenerTurno from './ObtenerTurno';
import AuthenticatedComponent from './AuthenticatedComponent';
import ResponsiveDrawer from "./ResponsiveDrawer";
import MisTurnos from "./MisTurnos"
import DetallesMedico from "./DetallesMedico"
import DetallesTurnosPaciente from "./DetallesTurnosPaciente"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const appBarTitles = {
    "/" : "Home",
    "/Login" : "Login",
    "/ObtenerTurno" : "Obtener Turno",
    "/MisTurnos" : "Mis Turnos",
    "/DetallesTurnosPaciente" : "Detalles turnos paciente",
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
                    <Route path="/ObtenerTurno" component={ObtenerTurno} />
                    <Route path="/MisTurnos" component={MisTurnos} />
                    <Route path="/DetallesMedico" component={DetallesMedico} />
                    <Route path="/DetallesTurnosPaciente" component={DetallesTurnosPaciente} />
                  </AuthenticatedComponent>

                </ResponsiveDrawer>
              </Switch>
          </BrowserRouter>
          <ToastContainer style = {{height: '50px'}}
            position="top-right"
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

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ObtenerTurno from './ObtenerTurno';
import AuthenticatedComponent from './AuthenticatedComponent';
import ResponsiveDrawer from "./ResponsiveDrawer";
import MisTurnos from "./MisTurnos"
import DetallesMedico from "./DetallesMedico"
import DetallesPaciente from "./DetallesPaciente"

const appBarTitles = {
    "/" : "Home",
    "/Login" : "Login",
    "/ObtenerTurno" : "Obtener Turno",
    "/MisTurnos" : "Mis Turnos",
    "/DetallesPaciente" : "Detalles paciente",
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
                  {/*<AuthenticatedComponent>*/}
                    <Route exact path="/" component={Home} />
                    <Route path="/ObtenerTurno" component={ObtenerTurno} />
                    <Route path="/MisTurnos" component={MisTurnos} />
                    <Route path="/DetallesMedico" component={DetallesMedico} />
                    <Route path="/DetallesPaciente" component={DetallesPaciente} />
                  {/*</AuthenticatedComponent>*/}

                </ResponsiveDrawer>
              </Switch>
          </BrowserRouter>
        </div>
      );
    }
}

export default App;

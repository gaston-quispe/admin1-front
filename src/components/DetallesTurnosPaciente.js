import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import proxy from './proxy';
import {getUser} from '../helpers/user'
import {getPacienteTurnos} from '../helpers/user'

class DetallesTurnosPaciente extends Component {
    constructor(props) {
        super(props)
        this.state = {
              turnos: [],
              id: [],
              pacienteID: [],
              profesionalID: [],
              fecha: [],
              franjaHorariaID: [],
        }
    }

     componentDidMount() {
          proxy.getPacienteTurnos(getUser().id).then((turnos)=>{
            this.setState({id: turnos.id});
            this.setState({id: turnos.id});
            this.setState({pacienteID: turnos.pacienteID});
            this.setState({profesionalID: turnos.profesionalID});
            this.setState({fecha: turnos.fecha});
            this.setState({franjaHorariaID: turnos.franjaHorariaID});
            console.log(this.state.id);
      });
     }

    render() {
        return (

            
            <h2> {this.state.turnos} </h2>
         )
    }

}

export default DetallesTurnosPaciente;
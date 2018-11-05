import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import proxy from './proxy';
import {getUser} from '../helpers/user'
import {getPacienteTurnos} from '../helpers/user'

class DetallesPaciente extends Component {
    constructor(props) {
        super(props)
        this.state = {
              id: "1",
              pacienteID: "3",
              profesionalID: "2",
              fecha: "2018",
              franjaHorariaID: "1125864895",
        }
    }

     componentDidMount() {
          proxy.getPacienteTurnos(getUser().id).then((turnos)=>{
            this.setState({id: turnos.id});
            this.setState({pacienteID: turnos.pacienteID});
            this.setState({profesionalID: turnos.profesionalID});
            this.setState({fecha: turnos.fecha});
            this.setState({franjaHorariaID: turnos.franjaHorariaID});
      });
     }

    render() {
        return (
            <h2> {this.state.id} </h2>
         )
    }

}

export default DetallesPaciente;
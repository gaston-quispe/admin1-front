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
              id: '',
              pacienteID: '',
              profesionalID: '',
              fecha: '',
              franjaHorariaID: '',
        }
    }

     componentDidMount() {
          proxy.getPacienteTurnos(getUser().id).then((turnos)=>{
            this.setState({id: turnos[0].id});
            this.setState({pacienteID: turnos[0].pacienteID});
            this.setState({profesionalID: turnos[0].profesionalID});
            this.setState({fecha: turnos[0].fecha});
            this.setState({franjaHorariaID: turnos[0].franjaHorariaID});
            console.log(this.state.id);
      });
     }

    render() {
        return (
            <Card>
                <h2> Id turno: {this.state.id} </h2>
                <h2> Id paciente: {this.state.pacienteID} </h2>
                <h2> id medico: {this.state.profesionalID} </h2>
                <h2> Fecha: {this.state.fecha} </h2>
                <h2> Franja horaria: {this.state.franjaHorariaID} </h2>

            </Card>
         )
    }

}

export default DetallesTurnosPaciente;
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
              /*id: '',
              pacienteID: '',
              profesionalID: '',
              fecha: '',
              franjaHorariaID: '',*/
        }
    }

     componentDidMount() {
        proxy.getPacienteTurnos(getUser().id).then((t)=>{
            this.setState({turnos : t})
            /*this.setState({id: turnos[0].id});
            this.setState({pacienteID: turnos[0].pacienteID});
            this.setState({profesionalID: turnos[0].profesionalID});
            this.setState({fecha: turnos[0].fecha});
            this.setState({franjaHorariaID: turnos[0].franjaHorariaID});
            console.log(this.state.id);*/
        })
     }

    listaDeTurnos () {
        return (
            <div>
            {this.state.turnos.map(item => 
                <Card key={item.id + item.fecha + item.franjaHorariaID} style={{marginTop: '5px', padding:'15px'}}>
                    <p> Id turno: {item.id} </p>
                    <p> Id paciente: {item.pacienteID} </p>
                    <p> id medico: {item.profesionalID} </p>
                    <p> Fecha: {item.fecha} </p>
                    <p> Franja horaria: {item.franjaHorariaID} </p>
                </Card>
            )}
            </div>
        )
    }

    render() {
        if (!this.state.turnos || this.state.turnos.length === 0)
            return (
                <p>No tiene turnos reservados</p>
            )
        else
            return (
                this.listaDeTurnos()
            )
    }

}

export default DetallesTurnosPaciente;
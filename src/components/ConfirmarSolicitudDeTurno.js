import React, { Component } from 'react';  
import {getUser} from '../helpers/user'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import proxy from './proxy';
import { mytoast } from '../helpers/mytoast'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    //paper
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
  });
  
class ConfirmarSolicitudDeTurno extends Component {
    constructor(props) {
        super(props);
        this.handleConfirmarSolicitud = this.handleConfirmarSolicitud.bind(this);
        this.state = {
            user: getUser()
        }
    }

    handleConfirmarSolicitud () {
       // this.props.location.state.turno['Estado'] = 'VENIDERO';
       // proxy.eliminarTurnoDisponible(this.props.location.state.turno.id);
     //   proxy.postAlmacenarTurno(this.props.location.state.turno);
        this.props.history.push('/');
        mytoast.success('Turno creado!');
    }
    
    render() {
        console.log(this.props.location.state.turno)
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <h3>Detalles del turno:</h3>
                <ul>

                    <li><b>Id Turno:</b> {this.props.location.state.turno.id}</li>
                    <li><b>Fecha:</b> {this.props.location.state.turno.Fecha}</li>
                    <li><b>Horario:</b> {this.props.location.state.turno.HoraDesde + ' a ' + this.props.location.state.turno.HoraHasta}</li>
                    <li><b>Consultorio:</b> {this.props.location.state.turno.Consultorio}</li>
                    <li><b>Especialidad:</b> {this.props.location.state.turno.Descripcion}</li>
                    <li><b>Datos del Paciente:</b></li>
                    <ul>
                        <li><b>Nombre:</b> {this.state.user.nombre}</li>
                        <li><b>Apellido:</b> {this.state.user.apellido}</li>
                        <li><b>DNI:</b> {this.state.user.d_n_i}</li>                
                    </ul>
                    <li><b>Datos del Medico:</b></li>
                    <ul>
                        <li><b>Nombre:</b> {this.props.location.state.turno.Nombre}</li>
                        <li><b>Apellido:</b> {this.props.location.state.turno.Apellido}</li>
                        <li><b>Matricula:</b> {this.props.location.state.turno.Matricula}</li>                
                    </ul>
                </ul>

                <div style={{textAlign: 'center'}}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleConfirmarSolicitud()}>
                        Solicitar Turno
                    </Button>
                </div>
            </Paper>
         )
     }
}

export default withStyles(styles)(withRouter(ConfirmarSolicitudDeTurno));
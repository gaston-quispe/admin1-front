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
  
class DetalleTurnoPaciente extends Component {
    constructor(props) {
        super(props);
        this.handleCancelarSolicitud = this.handleCancelarSolicitud.bind(this);
        this.state = {
            user: getUser()
        }
    }

    handleCancelarSolicitud () {

        /*hasta que no se haga esta funcion postCancelarTurno, la cosa siempre va a tirar error al hacer click al boton "CANCELAR TURNO"*/
        proxy.postCancelarTurno(this.props.location.state.turno.id, this.state.user.id) //pero parece q khalil no nos para el id => preguntarle. Este numero 1 cualquiera. 
            .then (respuesta => {
                //EXITO

                // La respuestas es un "OK". Probé con http://ec2-18-191-193-14.us-east-2.compute.amazonaws.com/TP_proyectos_backend/web/app.php/pacientes/1/turnos
                // y andaba. Ahora si se vuelve a hacer, tira error porque ya se canceló el turno
                // No viene con un estado de "CANCELADO". Eso tenemos q setearlo nosotros.
                this.props.history.push('/');
                mytoast.success('Turno cancelado!');
            })
            .catch(err => {
                this.props.history.push('/');
                mytoast.warn(err.response.data.error.message);
            });


    }
    
    renderBotonCancelar(classes) {
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleCancelarSolicitud()}>
                    Cancelar Turno
                </Button>
            </div>
        )   
    }
    
    render() {
        console.log(this.props.location.state.turno); // <= ACA TENES TODOS LOS DATOS NECESARIOS PARA TRABAJAR
        console.log(getUser()) // <= Con esto obtenes que usuario sos y toda tu info de usuario.
        const { classes } = this.props;

        var estado = {
            cancela : this.props.location.state.turno.Cancelo == "true" ? "Si" : "No",
            venidero : this.props.location.state.turno.Venidero == "true" ? "Si" : "No",
            asistio : this.props.location.state.turno.Asistio  == "true" ? "Si" : "No"
        };


        return (
            <Paper className={classes.root} elevation={1}>
                <ul>
                    <li><b>Id Turno:</b> {this.props.location.state.turno.id}</li>
                    <li><b>Estado:</b></li> 
                    <ul>
                        <li><b>Cancelo:</b> {estado.cancela}</li>
                        <li><b>Venidero:</b> {estado.venidero}</li>
                        <li><b>Asistio:</b> {estado.asistio}</li>                
                    </ul>
                    <li><b>Fecha:</b> {this.props.location.state.turno.Fecha}</li>
                    <li><b>Horario:</b> {this.props.location.state.turno.HoraDesde + ' a ' + this.props.location.state.turno.HoraHasta}</li>
                    <li><b>Consultorio:</b> FALTA EN EL BACK</li>
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
                        <li><b>Matricula:</b> FALTA EN EL BACK</li>                
                    </ul>
                </ul>
                {this.renderBotonCancelar(classes)}
            </Paper>
         )
     }
}

export default withStyles(styles)(withRouter(DetalleTurnoPaciente));
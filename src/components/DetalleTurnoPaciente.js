import React, { Component } from 'react';  
import {getUser} from '../helpers/user'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import proxy from './proxy';
import { mytoast } from '../helpers/mytoast'

// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        this.ejecutarConcelacion = this.ejecutarConcelacion.bind(this);
        this.state = {
            user: getUser()
        }
    }

    // DIALOG
    state = {
        open: false,
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleSI = () => {
        this.ejecutarConcelacion();
        this.setState({ open: false });
    };

    handleNO = () => {
        this.setState({ open: false });
    };

    // LOGICA UI
    ejecutarConcelacion() {
        proxy.postCancelarTurno(this.props.location.state.turno.id, this.state.user.id)
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
            mytoast.warn(err.response.data.error.message, {autoClose: 5000});
        });
    }
    
    renderBotonCancelar(classes) {
        return (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
                    Cancelar Turno
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        ¿Está seguro/a quedesea cancelar el turno?
                    </DialogTitle>
                    
                    <DialogActions>
                        <Button onClick={this.handleNO} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleSI} color="primary" autoFocus>
                            Si, estoy seguro
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        )   
    }
    
    render() {
        const { classes } = this.props;

        var estado = {
            cancela : this.props.location.state.turno.Cancelo === "true" ? "Si" : "No",
            venidero : this.props.location.state.turno.Venidero === "true" ? "Si" : "No",
            asistio : this.props.location.state.turno.Asistio  === "true" ? "Si" : "No"
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
                    <li><b>Consultorio:</b> 7B </li>
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
                        <li><b>Matricula:</b> 233135</li>                
                    </ul>
                </ul>
                {this.renderBotonCancelar(classes)}
            </Paper>
         )
     }
}

export default withStyles(styles)(withRouter(DetalleTurnoPaciente));
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
        proxy.postCancelarTurno(this.props.location.state.turno);
        this.props.history.push('/');
        mytoast.success('Turno cancelado!');
    }
    
    renderBotonCancelar(classes) {
        if (this.props.location.state.turno.Estado === 'VENIDERO') {
            return (
                <div style={{textAlign: 'center', marginTop: '30px'}}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleCancelarSolicitud()}>
                        Cancelar Solicitud
                    </Button>
                </div>
            )
        }        
    }
    
    render() {
        //console.log(this.props.location.state.turno);
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <ul>
                    <li><b>Id Turno:</b> {this.props.location.state.turno.id}</li>
                    <li><b>Estado:</b> {this.props.location.state.turno.Estado}</li>
                    <li><b>Fecha:</b> {this.props.location.state.turno.Fecha}</li>
                    <li><b>Horario:</b> {this.props.location.state.turno.HoraDesde + ' a ' + this.props.location.state.turno.HoraHasta}</li>
                    <li><b>Consultorio:</b> {this.props.location.state.turno.Consultorio}</li>
                    <li><b>Especialidad:</b> {this.props.location.state.turno.medico.Especialidad}</li>
                    <li><b>Datos del Paciente:</b></li>
                    <ul>
                        <li><b>Nombre:</b> {this.state.user.nombre}</li>
                        <li><b>Apellido:</b> {this.state.user.apellido}</li>
                        <li><b>DNI:</b> {this.state.user.dni}</li>                
                    </ul>
                    <li><b>Datos del Medico:</b></li>
                    <ul>
                        <li><b>Nombre:</b> {this.props.location.state.turno.medico.Nombre}</li>
                        <li><b>Apellido:</b> {this.props.location.state.turno.medico.Apellido}</li>
                        <li><b>Matricula:</b> {this.props.location.state.turno.medico.Matricula}</li>                
                    </ul>
                </ul>
                {this.renderBotonCancelar(classes)}
            </Paper>
         )
     }
}

export default withStyles(styles)(withRouter(DetalleTurnoPaciente));
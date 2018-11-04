
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers/jwt'

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Modal
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import proxy from './proxy';

import Button from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";


const styles = theme => ({

    //Especialista
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

    card: {
        marginTop: "10px",
    },
    cardContent: {
        padding:0,
    },
    //Fecha de turno
    //container: {
    //    display: 'flex',
    //    flexWrap: 'wrap',
    //},
    //textField: {
        //marginLeft: theme.spacing.unit,
        //marginRight: theme.spacing.unit,
        //width: '100%',
    //},
    // Modal
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    // Botones de modal
    button: {
        margin: theme.spacing.unit,
        width: '110px'
      },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
  });

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class ObtenerTurno extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            idEspecialista : '',
            idMedico: '',
            nombre: '',
            fecha: '',
            turnosDisponibles: []
        }

        this.handleChangeEspecialista = this.handleChangeEspecialista.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeFecha = this.handleChangeFecha.bind(this);
        this.actualizarListaDeTurnos = this.actualizarListaDeTurnos.bind(this);
        this.modalContent = this.modalContent.bind(this);
        this.modalHandleOpen = this.modalHandleOpen.bind(this);
        this.modalHandleClose = this.modalHandleClose.bind(this);
        this.filtros = this.filtros.bind(this);
        this.turnos = this.turnos.bind(this);

    }

    actualizarListaDeTurnos() {
        proxy.getEspecialidadesTurnosDisponibles(this.state.idEspecialista, this.state.fecha)
            .then((turnos) => {
                this.setState({turnosDisponibles: turnos});
            })
    }

    handleChangeEspecialista(event) {
        this.setState(
            {idEspecialista:  event.target.value}, this.actualizarListaDeTurnos)
    }

    handleChangeMedico(event) {
        this.setState(
            {idMedico:  event.target.value}, this.actualizarListaDeTurnos)
    }

    handleChangeFecha(event) {
        this.setState(
            {fecha:  event.target.value}, this.actualizarListaDeTurnos)
    }

    handleConfirmarTurno(event) {
        console.log("Confirmado")
        this.props.history.push('/')
    }

    filtros(classes) {
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="idEspecialista-label-placeholder">
                        Especialista
                    </InputLabel>
                    <Select
                        value={this.state.idEspecialista}
                        onChange={(e) =>this.handleChangeEspecialista(e)}
                        input={<Input name="idEspecialista" id="idEspecialista-label-placeholder" />}
                        displayEmpty
                        //name="idEspecialista"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={1}>Otorrino</MenuItem>
                        <MenuItem value={2}>Cardiologo</MenuItem>
                        <MenuItem value={3}>Pediatra</MenuItem>
                    </Select>
                    {/*<FormHelperText>Label + placeholder</FormHelperText>*/}
                </FormControl>
                
                <FormControl className={classes.formControl}>
                    <TextField
                        id="date"
                        label="Fecha"
                        type="date"
                        onChange={(e) =>this.handleChangeFecha(e)}
                        //defaultValue="2017-05-24"
                        value={this.state.fecha}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </FormControl>
                {/*
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="idMedico-label-placeholder">
                        Medico
                    </InputLabel>
                    <Select
                        value={this.state.idMedico}
                        onChange={(e) =>this.handleChangeMedico(e)}
                        input={<Input name="idMedico" id="idMedico-label-placeholder" />}
                        displayEmpty
                        //name="idMedico"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={1}>Jaun Perez</MenuItem>
                        <MenuItem value={2}>Santiago Devoto</MenuItem>
                        <MenuItem value={3}>Toto Sanchez</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="horaDesde"
                        label="Hora desde"
                        type="time"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="horaHasta"
                        label="Hora Hasta"
                        type="time"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        min: '9:00',
                        max: '20:00',
                        }}
                    />
                </FormControl>
                */}
        </div>)
    }

    turnos(classes) {
        return (
            <div style={{width: "100%", marginTop: "20px"}}>

            {this.state.turnosDisponibles.map(item =>
                <Card key = {item.HoraDesde + item.HoraHasta} className={classes.card} style={{minWidth:'100%'}}  onClick={ (e) => this.modalHandleOpen() } >
                    <CardContent className={classes.cardContent} style={{padding:'10px'}}>
                        {item.Nombre + ' ' + item.Apellido}
                        <br />
                        {item.HoraDesde + ' a ' + item.HoraHasta}
                    </CardContent>
                </Card>
            )}
            </div>
        )
    }

    modalContent(classes) {
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    Confirmación de turno
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    <p>Doctor: Khalil Moriello</p>
                    <p>Especialidad: Cardiólogo</p>
                    <p>Fecha: 2018-04-12</p>
                    <p>Horario: 13:30</p>
                </Typography>
                <Button variant="contained" size="medium" className={classes.button} onClick={ () => this.modalHandleClose() }>
                    VOLVER
                </Button>
                <Button variant="contained" size="medium" color="primary" className={classes.button}  onClick={ (e) => this.handleConfirmarTurno() }>
                    CONFIRMAR
                    {/*<SendIcon size="small" className={classes.rightIcon} />*/}
                </Button>
            </div>
        )
    }
    
    modalHandleOpen = () => {
        this.setState({ modalOpen: true });
    };

    modalHandleClose = () => {
        this.setState({ modalOpen: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={4}>
                        {this.filtros(classes)}
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {this.turnos(classes)}
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalOpen}
                    onClose={this.modalHandleClose}>
                        {this.modalContent(classes)}
                </Modal>
            </div>

        )
     }

}

export default withStyles(styles)(withRouter(ObtenerTurno));
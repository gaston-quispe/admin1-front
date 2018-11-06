
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers/jwt'
import { getUser } from '../helpers/user'

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
import moment from 'moment'

//tablas

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// toast
import { mytoast } from '../helpers/mytoast'

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
    seleccionado: {
        '&:hover': {
            backgroundColor: '#BAE4FF',
            cursor: 'pointer',
            fontWeight: 'bold'
            
       },
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
    //table

  cellCenter: {
    'text-align': 'center'
  }
 
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
            //idMedico: '',
            nombre: '',
            fechaInicial: moment().format("YYYY-MM-DD"),
            fechaFinal: moment().add(2,'month').format("YYYY-MM-DD"),
            turnosDisponibles: [],
            turnosDisponiblesFiltrados: [],
            listaMedicosDisponibles: [],
            filtroMedico: "",
            mostrarCartelitoNoHayResultados: false,
            turnoSeleccionado: {}
        }

        this.handleChangeEspecialista = this.handleChangeEspecialista.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeFechaInicial = this.handleChangeFechaInicial.bind(this);
        this.handleChangeFechaFinal = this.handleChangeFechaFinal.bind(this);
        this.actualizarListaDeTurnos = this.actualizarListaDeTurnos.bind(this);
        this.modalContent = this.modalContent.bind(this);
        this.modalHandleOpen = this.modalHandleOpen.bind(this);
        this.modalHandleClose = this.modalHandleClose.bind(this);
        this.filtros = this.filtros.bind(this);
        this.turnos = this.turnos.bind(this);

    }

//    componentDidMount() {
 //       this.actualizarListaDeTurnos();
//        this.filtrarTurnos();
  //  }

    actualizarListaDeTurnos() {
        this.setState({mostrarCartelitoNoHayResultados: true})

        if (this.state.idEspecialista === '') {
            this.setState({turnosDisponibles:[], turnosDisponiblesFiltrados: []});
        }
        else {
            proxy.getEspecialidadesTurnosDisponiblesEnRangoDeFechas(this.state.idEspecialista, this.state.fechaInicial, this.state.fechaFinal)
                .then((turnos) => {
                    this.setState({turnosDisponibles: turnos});
                    
                    this.filtrarTurnos();
                    this.actualizarListaMedicosDisponibles();
                })
        }
    }

    eliminarDuplicados(lista) {
        return lista.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
    }

    actualizarListaMedicosDisponibles() {
        let res = this.state.turnosDisponiblesFiltrados.map((turno) => {
            return turno.Nombre + ' ' + turno.Apellido;
        })
        this.setState({listaMedicosDisponibles: this.eliminarDuplicados(res)})
    }

    filtrarXMedico(listaTurnos) {
        if (this.state.filtroMedico === "")
            return listaTurnos;

        const res = listaTurnos.filter((turno) => {
            return (turno.Nombre + ' ' + turno.Apellido) == this.state.filtroMedico;
        })
        return res;
    }

    filtrarXHorario(listaTurnos) {
        return listaTurnos;
    }

    filtrarXFecha(listaTurnos) {
        return listaTurnos.filter((turno) => {
            return this.state.fechaInicial <= turno.Fecha && turno.Fecha <= this.state.fechaFinal;
        })
    }

    filtrarXEspecialidad(listaTurnos) {
        return listaTurnos.filter((turno) => {
            return this.state.idEspecialista == turno.Descripcion
        })
    }

    filtrarTurnos() {
        let filtrados = this.filtrarXMedico(this.state.turnosDisponibles);
        filtrados = this.filtrarXEspecialidad(filtrados)
        filtrados = this.filtrarXHorario(filtrados)
        filtrados = this.filtrarXFecha(filtrados)
        this.setState({turnosDisponiblesFiltrados: filtrados});
    }

    handleChangeEspecialista(event) {
        this.setState(
            {idEspecialista:  event.target.value, filtroMedico: ""}, this.actualizarListaDeTurnos)
    }

    handleChangeMedico(event) {
        this.setState(
            {filtroMedico:  event.target.value}, this.filtrarTurnos)
    }

    handleChangeFechaInicial(event) {
        this.setState(
            {fechaInicial:  event.target.value}, this.actualizarListaDeTurnos)
    }

    handleChangeFechaFinal(event) {
        this.setState(
            {fechaFinal:  event.target.value}, this.actualizarListaDeTurnos)
    }

    handleConfirmarTurno(event) {
        this.props.history.push('/');
        proxy.postTurno({
            id: "1",
            pacienteID: getUser().id,
            profesionalID: "2",
            fecha: this.state.turnoSeleccionado.Fecha,
            franjaHorariaID: "12",
            asistio: false,
            cancelo: false
        })
        mytoast.success('Turno creado!');
    }

    filtros(classes) {
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="idEspecialista-label-placeholder">
                        Especialidad
                    </InputLabel>
                    <Select
                        value={this.state.idEspecialista}
                        onChange={(e) =>this.handleChangeEspecialista(e)}
                        input={<Input name="idEspecialista" id="idEspecialista-label-placeholder" />}
                        displayEmpty
                        //name="idEspecialista"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Seleccione Especialidad</em></MenuItem>
                        <MenuItem value='Otorrino'>Otorrino</MenuItem>
                        <MenuItem value='Cardiologo'>Cardiologo</MenuItem>
                        <MenuItem value='Pediatria'>Pediatria</MenuItem>
                    </Select>
                    {/*<FormHelperText>Label + placeholder</FormHelperText>*/}
                </FormControl>
                
                <FormControl className={classes.formControl}>
                    <TextField
                        id="FechaInicial"
                        label="Fecha Inicial"
                        type="date"
                        onChange={(e) =>this.handleChangeFechaInicial(e)}
                        //defaultValue="2017-05-24"
                        value={this.state.fechaInicial}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <TextField
                        id="FechaFinal"
                        label="Fecha Final"
                        type="date"
                        onChange={(e) =>this.handleChangeFechaFinal(e)}
                        //defaultValue="2017-05-24"
                        value={this.state.fechaFinal}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </FormControl>

                
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="filtroMedico-label-placeholder">
                        Medico
                    </InputLabel>
                    <Select
                        value={this.state.filtroMedico}
                        onChange={(e) =>this.handleChangeMedico(e)}
                        input={<Input name="filtroMedico" id="filtroMedico-label-placeholder" />}
                        displayEmpty
                        //name="idMedico"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Sin filtro</em></MenuItem>
                        {this.state.listaMedicosDisponibles.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                {/*
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
            /*
            <div style={{width: "100%", marginTop: "20px"}}>

            {this.state.turnosDisponiblesFiltrados.map(item =>
                <Card key = {item.id} className={classes.card} style={{minWidth:'100%'}}  onClick={ (e) => this.modalHandleOpen() } >
                    <CardContent className={classes.cardContent} style={{padding:'10px'}}>
                        {item.Nombre + ' ' + item.Apellido}
                        <br />
                        {item.HoraDesde + ' a ' + item.HoraHasta}
                    </CardContent>
                </Card>
            )}
            </div>
            */
        if (this.state.turnosDisponiblesFiltrados.length === 0 && !this.state.mostrarCartelitoNoHayResultados)
            return <p style={{textAlign: "center"}}>Por favor, realice su busqueda</p>
        
        if (this.state.turnosDisponiblesFiltrados.length === 0 && this.state.mostrarCartelitoNoHayResultados)
            return <p style={{textAlign: "center"}}>No hay resultados</p>

        return (

            <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='none' style={{textAlign: "left"}}>Nombre</TableCell>
                <TableCell padding='none' numeric style={{textAlign: "center"}}>Fecha</TableCell>
                <TableCell padding='none' numeric style={{textAlign: "right"}}>Hora</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.turnosDisponiblesFiltrados.map((item,index) => {
                return (
                  <TableRow key={item.id} className={classes.seleccionado} onClick={ (e) => this.modalHandleOpen(index)}>
                    <TableCell padding='none' style={{textAlign: "left"}} numeric>{item.Nombre + ' ' + item.Apellido}</TableCell>
                    <TableCell padding='none' style={{textAlign: "center"}} numeric>{item.Fecha}</TableCell>
                    <TableCell padding='none' style={{textAlign: "right"}} scope="row">{item.HoraDesde + ' a ' + item.HoraHasta}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            
          </Table>
        )
    }

    modalContent(classes) {
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    Confirmación de turno
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    <p>Doctor: {this.state.turnoSeleccionado.Nombre + ' ' + this.state.turnoSeleccionado.Apellido} </p>
                    <p>Especialidad: {this.state.turnoSeleccionado.Descripcion}</p>
                    <p>Fecha: {this.state.turnoSeleccionado.Fecha}</p>
                    <p>Horario: {this.state.turnoSeleccionado.HoraDesde + ' a ' + this.state.turnoSeleccionado.HoraHasta}</p>
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
    
    modalHandleOpen = (index) => {
        this.setState({ turnoSeleccionado: this.state.turnosDisponiblesFiltrados[index] },
            () => { this.setState({ modalOpen: true })});
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
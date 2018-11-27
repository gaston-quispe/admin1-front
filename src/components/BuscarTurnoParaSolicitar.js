
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
//import { getJwt } from '../helpers/jwt'
//import { getUser } from '../helpers/user'

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import proxy from './proxy';

import moment from 'moment'

//tablas

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// toast
//import { mytoast } from '../helpers/mytoast'

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

    //table
    cellCenter: {
        'text-align': 'center'
    }
});

class BuscarTurnoParaSolicitar extends Component {
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
            medicosDisponibles: [],
            especialidadesDisponibles: [],
            filtroMedico: "",
            turnoSeleccionado: {}
        }

        this.handleChangeEspecialista = this.handleChangeEspecialista.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);
        this.handleChangeFechaInicial = this.handleChangeFechaInicial.bind(this);
        this.handleChangeFechaFinal = this.handleChangeFechaFinal.bind(this);

        this.filtros = this.filtros.bind(this);
        this.turnos = this.turnos.bind(this);

    }

    componentDidMount() {
        this.cargarTurnosDisponibles();
    }

    cargarTurnosDisponibles() {
        proxy.getTurnosDisponibles(this.state.fechaInicial, this.state.fechaFinal)
            .then(turnos => this.setState({turnosDisponibles: turnos}, this.filtrarTurnos));
    }

    eliminarDuplicados(lista) {
        return lista.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        })
    }

    actualizarEspecialidadesDisponibles() {
        let especialidades = this.state.turnosDisponibles.map((turno) => {
            return turno.medico.Especialidad;
        })
        
        this.setState({especialidadesDisponibles: this.eliminarDuplicados(especialidades)})
    }

    actualizarMedicosDisponibles() {
        let nombres = this.state.turnosDisponibles.map((turno) => {
            return turno.medico.Nombre + ' ' + turno.medico.Apellido;
        })
        this.setState({medicosDisponibles: this.eliminarDuplicados(nombres)})
    }

    /////////////// FILTROS ///////////////
    filtrarXMedico(listaTurnos) {
        if (this.state.filtroMedico === "")
            return listaTurnos;

        const res = listaTurnos.filter((turno) => {
            return (turno.medico.Nombre + ' ' + turno.medico.Apellido) === this.state.filtroMedico;
        })
        return res;
    }

    filtrarXEspecialidad(listaTurnos) {
        if (this.state.idEspecialista === "")
            return listaTurnos;

        return listaTurnos.filter((turno) => {
            return this.state.idEspecialista === turno.medico.Especialidad
        })
    }

    filtrarTurnos(callbackLuegoDeFiltar) {
        let filtrados = this.state.turnosDisponibles;
        
        filtrados = this.filtrarXEspecialidad(filtrados);
        filtrados = this.filtrarXMedico(filtrados);
        this.setState({turnosDisponiblesFiltrados: filtrados}, () => {
            this.actualizarEspecialidadesDisponibles();
            this.actualizarMedicosDisponibles();
        });
    }

    /////////////// EVENTOS ///////////////
    handleChangeEspecialista(event) {
        this.setState(
            {idEspecialista:  event.target.value}, this.filtrarTurnos)
    }

    handleChangeMedico(event) {
        this.setState(
            {filtroMedico:  event.target.value}, this.filtrarTurnos)
    }

    handleChangeFechaInicial(event) {
        this.setState(
            {fechaInicial:  event.target.value}, this.cargarTurnosDisponibles)
    }

    handleChangeFechaFinal(event) {
        this.setState(
            {fechaFinal:  event.target.value}, this.cargarTurnosDisponibles)
    }
/*
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
*/
    /////////////// REDIRECCION ///////////////
    gotoConfirmarSolicitudDeTurno(turno) {
        //this.props.history.push('/ConfirmarSolicitudDeTurno')
        this.props.history.push({
            pathname: '/ConfirmarSolicitudDeTurno',
            state: { turno: turno }
        })
    }

    /////////////// RENDER ///////////////
    filtros(classes) {
        return (
            <div>
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
                        <MenuItem value=""><em>Sin Filtro</em></MenuItem>
                        {this.state.especialidadesDisponibles.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )}
                    </Select>
                    {/*<FormHelperText>Label + placeholder</FormHelperText>*/}
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
                        {this.state.medicosDisponibles.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )}
                    </Select>
                </FormControl>
        </div>)
    }

    turnos(classes) {
        if (this.state.turnosDisponiblesFiltrados.length === 0)
            return (
                <div style={{textAlign: "center", marginTop: '20px'}}>
                    No existen turnos con las caracteristicas solicitadas.
                </div>
            )

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding='none' numeric style={{textAlign: "left"}}>Fecha</TableCell>
                        <TableCell padding='none' numeric style={{textAlign: "center"}}>Hora</TableCell>
                        <TableCell padding='none' numeric style={{textAlign: "center"}}>Especialidad</TableCell>
                        <TableCell padding='none' style={{textAlign: "right"}}>Medico</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.turnosDisponiblesFiltrados.map((turno, index) => {
                        return (
                        <TableRow key={turno.id} className={classes.seleccionado} onClick={ (e) => this.gotoConfirmarSolicitudDeTurno(turno)}>
                            <TableCell padding='none' style={{textAlign: "left"}} numeric>{turno.Fecha}</TableCell>
                            <TableCell padding='none' style={{textAlign: "center"}} scope="row">{turno.HoraDesde + ' a ' + turno.HoraHasta}</TableCell>
                            <TableCell padding='none' style={{textAlign: "center"}}>{turno.medico.Especialidad}</TableCell>
                            <TableCell padding='none' style={{textAlign: "right"}} numeric>{turno.medico.Nombre + ' ' + turno.medico.Apellido}</TableCell>   
                        </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }

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
            </div>
        )
     }
}

export default withStyles(styles)(withRouter(BuscarTurnoParaSolicitar));

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
import { getUser } from '../helpers/user';
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
            nombre: '',
            fechaInicial: '2018-01-12', //moment().format("YYYY-MM-DD"),
            fechaFinal: '2018-02-12', //moment().add(2,'weeks').format("YYYY-MM-DD"),
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
        this.cargarMisTurnos();
        //this.cargarTurnosDisponibles();
    }

    ordenarTurnos(listaTurnos) {
        return listaTurnos.sort( (t1, t2) => {
            if (t1.Fecha > t2.Fecha)
                return 1;
            else if (t1.Fecha < t2.Fecha)
                return -1;
            else if (t1.HoraDesde > t2.HoraDesde)
                return 1;
            else if (t1.HoraDesde < t2.HoraDesde)
                return -1;
            else
                return 0;
        })
    }

    cargarMisTurnos() {
        proxy.getMisTurnos(getUser().id) // TODO: Poner UN ID REAL!!!!!!
        .then(
            respuesta => {
                this.setState({turnosDisponibles: this.ordenarTurnos([respuesta.data])}, this.filtrarTurnos)
            }
        );
    }

    cargarTurnosDisponibles() {
        proxy.getTurnosDisponibles(this.state.fechaInicial, this.state.fechaFinal)
            .then(
                respuesta => {
                    this.setState({turnosDisponibles: this.ordenarTurnos(respuesta.data)}, this.filtrarTurnos)
                }
            );
    }

    eliminarDuplicados(lista) {
        return lista.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        })
    }

    actualizarEspecialidadesDisponibles() {
        let especialidades = this.state.turnosDisponibles.map((turno) => {
            return turno.Descipcion;
        })
        
        this.setState({especialidadesDisponibles: this.eliminarDuplicados(especialidades).sort()})
    }

    actualizarMedicosDisponibles() {
        let nombres = this.state.turnosDisponibles.map((turno) => {
            return turno.Nombre + ' ' + turno.Apellido;
        })
        this.setState({medicosDisponibles: this.eliminarDuplicados(nombres).sort()})
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
            return this.state.idEspecialista === turno.medico.Descripcion
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

    verificarFechaInicialYcargar(fechaInicial, fechaFinal) {
        if (fechaInicial > fechaFinal)
            this.setState({fechaFinal: fechaInicial}, this.cargarTurnosDisponibles)
        else
            this.cargarTurnosDisponibles()
    }

    handleChangeFechaInicial(event) {
        this.setState(
            {fechaInicial:  event.target.value},
                () => this.verificarFechaInicialYcargar(this.state.fechaInicial, this.state.fechaFinal))
    }

    verificarFechaFinalYcargar(fechaInicial, fechaFinal) {
        if (fechaInicial > fechaFinal)
            this.setState({fechaInicial: fechaFinal}, this.cargarTurnosDisponibles)
        else
            this.cargarTurnosDisponibles()
    }

    handleChangeFechaFinal(event) {
        this.setState(
            {fechaFinal:  event.target.value},
                () => this.verificarFechaFinalYcargar(this.state.fechaInicial, this.state.fechaFinal))
    }

    /////////////// REDIRECCION ///////////////
    gotoDetalleTurnoPaciente(turno) {
        this.props.history.push({
            pathname: '/DetalleTurnoPaciente',
            state: { turno: turno }
        })
    }
    /////////////// UTIL ///////////////
    concatenarCampos(object) {
        var res = ""
        for (var key in  object) res += object[key]
        return res;
    }

    formatearFecha(fecha) {
        return moment(fecha, 'YYYY-MM-DD').format('DD/MM/YYYY')
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
                        value={this.state.fechaFinal}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </FormControl>

                {/*
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="idEspecialista-label-placeholder">
                        Especialidad
                    </InputLabel>
                    <Select
                        value={this.state.idEspecialista}
                        onChange={(e) =>this.handleChangeEspecialista(e)}
                        input={<Input name="idEspecialista" id="idEspecialista-label-placeholder" />}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Sin Filtro</em></MenuItem>
                        {this.state.especialidadesDisponibles.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )}
                    </Select>
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
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Sin filtro</em></MenuItem>
                        {this.state.medicosDisponibles.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                        */}
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
                        <TableRow key={this.concatenarCampos(turno)} className={classes.seleccionado} onClick={ (e) => this.gotoDetalleTurnoPaciente(turno)}>
                            <TableCell padding='none' style={{textAlign: "left"}}>{turno.Fecha}</TableCell>
                            <TableCell padding='none' style={{textAlign: "center"}} scope="row">{turno.HoraDesde + ' a ' + turno.HoraHasta}</TableCell>
                            <TableCell padding='none' style={{textAlign: "center"}}>{turno.Descripcion}</TableCell>
                            <TableCell padding='none' style={{textAlign: "right"}} numeric>{turno.Nombre + ' ' + turno.Apellido}</TableCell>   
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
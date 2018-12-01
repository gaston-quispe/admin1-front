
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import proxy from './proxy';

import moment from 'moment'
import _ from 'lodash';
import utils from '../helpers/utils'

// Tablas
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

    // Tablas
    cellCenter: {
        'text-align': 'center'
    }
});

class BuscarTurnoParaSolicitar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fechaInicial: moment().add(3, 'days').format("YYYY-MM-DD"),
            fechaFinal: moment().add(1, 'weeks').format("YYYY-MM-DD"),
            
            turnos: [],
            turnosXEspecialidad: [],
            turnosXEspecialidadXMedico: [],

            especialidades: [],
            medicos: [],

            EspecialidadID: "",
            ProfesionalID: ""
        }

        this.handleChangeFechaInicial = this.handleChangeFechaInicial.bind(this);
        this.handleChangeFechaFinal = this.handleChangeFechaFinal.bind(this);
        this.handleChangeEspecialista = this.handleChangeEspecialista.bind(this);
        this.handleChangeMedico = this.handleChangeMedico.bind(this);

        this.filtros = this.filtros.bind(this);
        this.turnos = this.turnos.bind(this);

    }

    componentDidMount() {
        this.cargarTurnos();
    }

    cargarTurnos() {
        proxy.getTurnosDisponibles(this.state.fechaInicial, this.state.fechaFinal)
            .then(
                respuesta => {
                    this.setState({turnos: this.ordenarTurnos(respuesta.data)}, this.resetFiltros)
                }
            ).catch(
                error => {
                    this.setState({turnosDisponibles: []}, this.filtrarTurnos)
                }
            )
    }

    ordenarTurnos(listaTurnos) {
        return listaTurnos.sort( (t1, t2) => {
            if (utils.YYYYDDMM_to_YYYYMMDD(t1.Fecha) > utils.YYYYDDMM_to_YYYYMMDD(t2.Fecha))
                return 1;
            else if (utils.YYYYDDMM_to_YYYYMMDD(t1.Fecha) < utils.YYYYDDMM_to_YYYYMMDD(t2.Fecha))
                return -1;
            else if (t1.HoraDesde > t2.HoraDesde)
                return 1;
            else if (t1.HoraDesde < t2.HoraDesde)
                return -1;
            else
                return 0;
        })
    }

    resetFiltros() {
        this.setState({
            turnosXEspecialidad: this.state.turnos,
            turnosXEspecialidadXMedico: this.state.turnos,
            EspecialidadID: "",
            ProfesionalID: ""
        }, () => {
            this.cargarEspecialidades();
            this.cargarMedicos();
        })
    }

    cargarEspecialidades() {
        let especialidades = this.state.turnos.map(turno => {return {id: turno.EspecialidadID, descripcion: turno.Descripcion}})
        this.setState({especialidades: this.eliminarDuplicados(especialidades)})
    }

    cargarMedicos() {
        let medicos = this.state.turnosXEspecialidad.map(turno => {return {id: turno.ProfesionalID, nombre: turno.Nombre, apellido: turno.Apellido, d_n_i: turno.dni}})
        this.setState({medicos: this.eliminarDuplicados(medicos)})
    }

    eliminarDuplicados(lista) {
        return _.uniqBy(lista, e => e.id );
    }

    filtrarXEspecialidad() {
        if (this.state.EspecialidadID === "") {
            this.setState({
                ProfesionalID: "",
                turnosXEspecialidad: this.state.turnos,
                turnosXEspecialidadXMedico: this.state.turnos
            }, this.cargarMedicos)
        }
        else {
            let turnosFiltrados = this.state.turnos.filter( t => t.EspecialidadID === this.state.EspecialidadID)
            this.setState({
                ProfesionalID: "",
                turnosXEspecialidad: turnosFiltrados,
                turnosXEspecialidadXMedico: turnosFiltrados
            }, this.cargarMedicos)
        }
    }

    filtrarXMedico() {
        if (this.state.ProfesionalID === "") {
            this.setState({ turnosXEspecialidadXMedico: this.state.turnosXEspecialidad })
        }
        else {
            let turnosFiltrados = this.state.turnos.filter( t => t.ProfesionalID === this.state.ProfesionalID)
            this.setState({ turnosXEspecialidadXMedico: turnosFiltrados })
        }
    }

    /////////////// EVENTOS ///////////////
    handleChangeEspecialista(event) {
        this.setState({EspecialidadID: event.target.value}, this.filtrarXEspecialidad)
    }

    handleChangeMedico(event) {
        this.setState(
            {ProfesionalID:  event.target.value}, this.filtrarXMedico)
    }

    fechaEnRangoValido(fecha) {
        return moment().add(3, 'days').format("YYYY-MM-DD") <= fecha && fecha <= moment().add(2, 'months').format("YYYY-MM-DD")
    }

    verificarFechaInicialYcargar(fechaInicial, fechaFinal) {
        if (fechaInicial > fechaFinal)
            this.setState({fechaFinal: fechaInicial}, this.cargarTurnosDisponibles)
        else
            this.cargarTurnosDisponibles()
    }

    handleChangeFechaInicial(event) {
        if (this.fechaEnRangoValido(event.target.value))
            this.setState(
                {fechaInicial:  event.target.value},
                    () => this.verificarFechaInicialYcargar(this.state.fechaInicial, this.state.fechaFinal))
    }

    verificarFechaFinalYcargar(fechaInicial, fechaFinal) {
        if (fechaInicial > fechaFinal)
            this.setState({fechaInicial: fechaFinal}, this.cargarTurnos)
        else
            this.cargarTurnos()
    }

    handleChangeFechaFinal(event) {
        if (this.fechaEnRangoValido(event.target.value))
            this.setState(
                {fechaFinal:  event.target.value},
                    () => this.verificarFechaFinalYcargar(this.state.fechaInicial, this.state.fechaFinal))
    }

    /////////////// REDIRECCION ///////////////
    gotoConfirmarSolicitudDeTurno(turno) {
        this.props.history.push({
            pathname: '/ConfirmarSolicitudDeTurno',
            state: { turno: turno }
        })
    }
    /////////////// UTIL ///////////////
    concatenarCampos(object) {
        var res = ""
        for (var key in  object) res += object[key]
        return res;
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

                
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="EspecialidadID-label-placeholder">
                        Especialidad
                    </InputLabel>
                    <Select
                        value={this.state.EspecialidadID}
                        onChange={(e) =>this.handleChangeEspecialista(e)}
                        input={<Input name="EspecialidadID" id="EspecialidadID-label-placeholder" />}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Sin Filtro</em></MenuItem>
                        {this.state.especialidades.map(item =>
                            <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="filtroMedico-label-placeholder">
                        Medico
                    </InputLabel>
                    <Select
                        value={this.state.ProfesionalID}
                        onChange={(e) =>this.handleChangeMedico(e)}
                        input={<Input name="filtroMedico" id="filtroMedico-label-placeholder" />}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>Sin filtro</em></MenuItem>
                        {this.state.medicos.map(item =>
                            <MenuItem key={item.id} value={item.id}>{item.nombre + ' ' + item.apellido}</MenuItem>
                        )}
                    </Select>
                </FormControl>
        </div>)
    }

    turnos(classes) {
        if (this.state.turnosXEspecialidadXMedico.length === 0)
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
                    {this.state.turnosXEspecialidadXMedico.map((turno, index) => {
                        return (
                        <TableRow key={this.concatenarCampos(turno)} className={classes.seleccionado} onClick={ (e) => this.gotoConfirmarSolicitudDeTurno(turno)}>
                            <TableCell padding='none' style={{textAlign: "left"}}>{utils.YYYYDDMM_to_UI(turno.Fecha)}</TableCell>
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
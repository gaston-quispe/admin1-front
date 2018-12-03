import Axios from 'axios';
import appData from './appdata';
import config from '../config'
import utils from '../helpers/utils'
class Proxy {
    constructor() {
        this.data = appData;
    }
  
    login(dni, password) {
        return Axios.get(config.API_ENDPOINT + '/pacientes/dni/' + dni);
    }

    getMisTurnos(idPaciente, fechaDesde, fechaHasta) {
        return Axios.get(config.API_ENDPOINT + '/paciente/' + idPaciente + '/turnos/' + utils.YYYYMMDD_to_YYYYDDMM(fechaDesde) + '/' + utils.YYYYMMDD_to_YYYYDDMM(fechaHasta))
    }

    getPaciente(idPaciente) {
        return new Promise((resolve, reject) => {
            resolve (this.data.pacientes[idPaciente]);
        });
    }

    getPacientes() {
        return new Promise((resolve, reject) => {
            resolve (this.data.pacientes);
        });
    }

    getPacienteTurnos(idPaciente) {
        return new Promise((resolve, reject) => {
            resolve (this.data.pacienteTurnos);
        });
    }

    postTurno(turno) {
        return new Promise((resolve, reject) => {
            this.data.pacienteTurnos.push(turno);
            resolve ("200");
        });
    }

    postPaciente(datosNuevoPaciente) {
        return new Promise((resolve, reject) => {
            this.data.pacientes.push(datosNuevoPaciente);
            resolve ("200");
        });
    }

    getMedico(idMedico) {
        var medicos = this.data.medicos;
        return new Promise((resolve, reject) => {
            resolve (medicos[idMedico]);
        });
    }

    getMedicoDisponibilidad(idMedico) {
        return new Promise((resolve, reject) => {
            resolve ({
                //Ni idea que devuelve
            });
        });
    }

    getEspecialidades() {
        return Axios.get(config.API_ENDPOINT + '/especialidades')
    }

    getMedicos() {
        return Axios.get(config.API_ENDPOINT + '/medicos')
    }

    getTurnosDisponibles(fechaInicial, fechaFinal) {
        return Axios.get(config.API_ENDPOINT + '/especialidades/turnosdisponibles/' + utils.YYYYMMDD_to_YYYYDDMM(fechaInicial) + '/' + utils.YYYYMMDD_to_YYYYDDMM(fechaFinal))
    }
    
    solicitarTurno(turno, pacienteID) {
        console.log(this.data.pacientes);
        return Axios.post(config.API_ENDPOINT + `/pacientes/${pacienteID}/solicitarturnos`, {
            medicoID: turno.ProfesionalID,
            fecha: turno.Fecha,
            franjaHorariaID: turno.FranjaHorariaID,
            hora: turno.Hora,
            minutos: turno.Minutos
          })
    }

    eliminarTurnoDisponible(idTurno) {
        let turnos2 = this.data.turnosDisponibles.filter(t => t.id !== idTurno)
        return new Promise((resolve, reject) => {
            resolve (this.data.turnosDisponibles = turnos2);
        });
    }

    postCancelarTurno(turnoID, turnoPacience) {
        return Axios.post(config.API_ENDPOINT + '/pacientes/' + turnoPacience + '/cancelarturnos', {
                "turnoID" : turnoID,
         })
    }

    getEspecialidadesTurnosDisponibles(idEspecialidad, fecha) {
        return new Promise((resolve, reject) => {
            resolve (
                [{
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    HoraDesde : "16:00",
                    HoraHasta: "16:30",
                },{
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    HoraDesde: "16:30",
                    HoraHasta: "17:00"
                },{
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    HoraDesde: "17:00",
                    HoraHasta: "17:30"
                },{
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    HoraDesde: "17:30",
                    HoraHasta: "18:00"
                }]
            );
        });
    }
}

export default new Proxy();
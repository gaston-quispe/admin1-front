//import Axios from 'axios';
import appData from './appdata';

class Proxy {
    constructor() {
        this.data = appData;
    }
  
    login(dni, password) {
        return new Promise((resolve, reject) => {
            if (dni === '777' && password === '777') {
                resolve (
                    {
                        data: {
                        user: {
                                id: '1',
                                rol: 'paciente',
                                nombre: 'Pepe',
                                apellido: 'Argento',
                                sexo: 'masculino',
                                mail: 'pepe@gmail.com',
                                dni: '777',
                                fechaNacimiento: '1990-12-25',
                                fechaAltaRegistro: '2016-07-13',
                            },
                            token: "xxxxx.yyyyy.zzzzz"
                        }
                    }
                );
            }
            else
                reject (
                    {msg: 'Usuario o password incorrecto!'}
                )
        });

        /* Comentado hasta que exista back
        return Axios.post(config.API_ENDPOINT + '/signin', {
            email: this.state.email,
            password: this.state.password,
        });
        */
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
        return new Promise((resolve, reject) => {
            resolve (this.datos.especialidades);
        });
    }

    getTurnosDisponibles(fechaInicial, fechaFinal) {
        return new Promise((resolve, reject) => {
            resolve (
                this.data.turnosDisponibles.filter((turno) => {
                    return fechaInicial <= turno.Fecha && turno.Fecha <= fechaFinal;
                })            
            );
        });
    }

    postAlmacenarTurno(turno) {
        return new Promise((resolve, reject) => {
            resolve (this.data.pacienteTurnos.push(turno));
        });
    }

    eliminarTurnoDisponible(idTurno) {
        let turnos2 = this.data.turnosDisponibles.filter(t => t.id !== idTurno)
        return new Promise((resolve, reject) => {
            resolve (this.data.turnosDisponibles = turnos2);
        });
    }

    postCancelarTurno(turnoAcancelar) {
        return new Promise((resolve, reject) => {
            let index = this.data.pacienteTurnos.findIndex(t => t.id === turnoAcancelar.id)
            if (index !== -1) {
                this.data.pacienteTurnos[index].Estado = 'CANCELADO'
                resolve ({msg: "Cancelacion exitosa"});
            }
            reject({msg: "El turno a cancelar no existe"})            
        });
    }

    getMisTurnos(fechaInicial, fechaFinal) {
        return new Promise((resolve, reject) => {
            resolve (
                this.data.pacienteTurnos.filter((turno) => {
                    return fechaInicial <= turno.Fecha && turno.Fecha <= fechaFinal;
                })            
            );
        });
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
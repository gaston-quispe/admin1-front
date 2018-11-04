import Axios from 'axios';
import appData from './appdata';

class Proxy {
    constructor() {
        this.data = appData;
    }
  
    login(email, password) {
        return new Promise((resolve, reject) => {
            resolve ({
                data: {
                user: {
                        id: '1',
                        rol: 'paciente'
                    },
                    token: "xxxxx.yyyyy.zzzzz"
                }
            });
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
            resolve ([{
                id: "1",
                pacienteID: "3",
                profesionalID: "2",
                fecha: "2018",
                franjaHorariaID: "1125864895",
                asistio: false,
                cancelo: false
            }, {
                id: "1",
                pacienteID: "3",
                profesionalID: "2",
                fecha: "2018",
                franjaHorariaID: "1125864895",
                asistio: false,
                cancelo: false
            }]);
        });
    }

    postPaciente(datosNuevoPaciente) {
        return new Promise((resolve, reject) => {
            this.data.pacientes.push(datosNuevoPaciente);
            resolve ("200");
        });
    }

    getMedico(idMedico) {
        return new Promise((resolve, reject) => {
            resolve (this.datos.medicos[idMedico]);
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
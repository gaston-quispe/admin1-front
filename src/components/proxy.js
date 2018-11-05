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

    getEspecialidadesTurnosDisponiblesEnRangoDeFechas(idEspecialidad, fechaInicial, fechaFinal) {
        return new Promise((resolve, reject) => {
            resolve (
                [{
                    id: "1",
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-09-13',
                    HoraDesde : "16:00",
                    HoraHasta: "16:30",
                },{
                    id: "2",
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-09-21',
                    HoraDesde: "16:30",
                    HoraHasta: "17:00"
                },{
                    id: "3",
                    Descripcion: "pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-12-06',
                    HoraDesde: "17:00",
                    HoraHasta: "17:30"
                },{
                    id:"4",
                    Descripcion: "pediatria",
                    Apellido: "Perez",
                    Nombre: "Sergio",
                    Fecha: '2018-11-23',
                    HoraDesde: "09:30",
                    HoraHasta: "10:00"
                },
                {
                    id:"5",
                    Descripcion: "pediatria",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-11-11',
                    HoraDesde: "17:30",
                    HoraHasta: "18:00"
                },
                {
                    id:"6",
                    Descripcion: "pediatria",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-11-11',
                    HoraDesde: "18:00",
                    HoraHasta: "18:30"
                },
                {
                    id:"7",
                    Descripcion: "pediatria",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-11-11',
                    HoraDesde: "12:30",
                    HoraHasta: "13:00"
                },
                {
                    id:"8",
                    Descripcion: "pediatria",
                    Apellido: "Garcia",
                    Nombre: "Pedro",
                    Fecha: '2018-11-11',
                    HoraDesde: "12:30",
                    HoraHasta: "13:30"
                },
                {
                    id:"9",
                    Descripcion: "pediatria",
                    Apellido: "Flores",
                    Nombre: "Pedro",
                    Fecha: '2018-11-11',
                    HoraDesde: "12:30",
                    HoraHasta: "13:00"
                }            
            ]
            );
        });
    }
}

export default new Proxy();
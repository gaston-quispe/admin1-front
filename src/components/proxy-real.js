import config from '../config'
import Axios from 'axios';
import appData from './appdata'

class ProxyReal {
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
        return Axios.get(config.API_ENDPOINT + '/especialidades');
    }
    
    getEspecialidadesTurnosDisponibles(idEspecialidad, fecha) {
        return Axios.get(config.API_ENDPOINT + '/especialidades/' + idEspecialidad + '/turnosdisponibles/' + fecha);
    }

    getEspecialidadesTurnosDisponiblesEnRangoDeFechas(idEspecialidad, fechaInicial, fechaFinal) {
        return new Promise((resolve, reject) => {
            resolve (
                [{
                    id: "1",
                    Descripcion: "Pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-09-13',
                    HoraDesde : "16:00",
                    HoraHasta: "16:30",
                },{
                    id: "2",
                    Descripcion: "Pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-11-06',
                    HoraDesde: "16:30",
                    HoraHasta: "17:00"
                },{
                    id: "3",
                    Descripcion: "Pediatria",
                    Apellido: "Moriello",
                    Nombre: "Khalil",
                    Fecha: '2018-12-06',
                    HoraDesde: "17:00",
                    HoraHasta: "17:30"
                },{
                    id:"4",
                    Descripcion: "Pediatria",
                    Apellido: "Perez",
                    Nombre: "Sergio",
                    Fecha: '2018-11-23',
                    HoraDesde: "09:30",
                    HoraHasta: "10:00"
                },
                {
                    id:"5",
                    Descripcion: "Cardiologo",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-11-11',
                    HoraDesde: "17:30",
                    HoraHasta: "18:00"
                },
                {
                    id:"6",
                    Descripcion: "Cardiologo",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-12-12',
                    HoraDesde: "18:00",
                    HoraHasta: "18:30"
                },
                {
                    id:"7",
                    Descripcion: "Cardiologo",
                    Apellido: "Flores",
                    Nombre: "Osvaldo",
                    Fecha: '2018-12-16',
                    HoraDesde: "12:30",
                    HoraHasta: "13:00"
                },
                {
                    id:"8",
                    Descripcion: "Otorrino",
                    Apellido: "Garcia",
                    Nombre: "Pedro",
                    Fecha: '2019-01-03',
                    HoraDesde: "12:30",
                    HoraHasta: "13:30"
                },
                {
                    id:"9",
                    Descripcion: "Otorrino",
                    Apellido: "Flores",
                    Nombre: "Pedro",
                    Fecha: '2018-12-11',
                    HoraDesde: "12:30",
                    HoraHasta: "13:00"
                },
                {
                    id:"10",
                    Descripcion: "Pediatria",
                    Apellido: "Sandiego",
                    Nombre: "Carmen",
                    Fecha: '2018-12-11',
                    HoraDesde: "13:00",
                    HoraHasta: "13:30"
                },
                {
                    id:"11",
                    Descripcion: "Pediatria",
                    Apellido: "Flores",
                    Nombre: "Pedro",
                    Fecha: '2018-12-11',
                    HoraDesde: "13:30",
                    HoraHasta: "14:00"
                },
                {
                    id:"12",
                    Descripcion: "Otorrino",
                    Apellido: "Geronte",
                    Nombre: "Rosto",
                    Fecha: '2019-01-04',
                    HoraDesde: "12:30",
                    HoraHasta: "13:30"
                },
                {
                    id:"13",
                    Descripcion: "Otorrino",
                    Apellido: "De Control",
                    Nombre: "Individuo",
                    Fecha: '2018-12-12',
                    HoraDesde: "13:00",
                    HoraHasta: "13:30"
                },
                {
                    id:"14",
                    Descripcion: "Pediatria",
                    Apellido: "Ginebra",
                    Nombre: "Gin",
                    Fecha: '2018-12-11',
                    HoraDesde: "13:00",
                    HoraHasta: "13:30"
                },
                {
                    id:"15",
                    Descripcion: "Pediatria",
                    Apellido: "Maura",
                    Nombre: "Ana",
                    Fecha: '2018-11-30',
                    HoraDesde: "14:30",
                    HoraHasta: "14:30"
                },
                {
                    id:"16",
                    Descripcion: "Pediatria",
                    Apellido: "Maura",
                    Nombre: "Ana",
                    Fecha: '2018-11-30',
                    HoraDesde: "15:00",
                    HoraHasta: "15:30"
                },
                {
                    id:"17",
                    Descripcion: "Otorrino",
                    Apellido: "Bailo Yo",
                    Nombre: "Aquiles",
                    Fecha: '2018-11-30',
                    HoraDesde: "17:00",
                    HoraHasta: "17:30"
                },
                {
                    id:"18",
                    Descripcion: "Otorrino",
                    Apellido: "De Arco",
                    Nombre: "Juana",
                    Fecha: '2018-11-30',
                    HoraDesde: "18:00",
                    HoraHasta: "18:30"
                },
                {
                    id:"19",
                    Descripcion: "Otorrino",
                    Apellido: "Corleone",
                    Nombre: "Vito",
                    Fecha: '2018-11-30',
                    HoraDesde: "20:00",
                    HoraHasta: "21:30"
                },
                {
                    id:"20",
                    Descripcion: "Cardiologo",
                    Apellido: "Segovia",
                    Nombre: "Luisa",
                    Fecha: '2018-12-15',
                    HoraDesde: "17:00",
                    HoraHasta: "17:30"
                },
                {
                    id:"21",
                    Descripcion: "Cardiologo",
                    Apellido: "Segovia",
                    Nombre: "Luisa",
                    Fecha: '2018-11-30',
                    HoraDesde: "17:30",
                    HoraHasta: "18:00"
                },
                {
                    id:"22",
                    Descripcion: "Cardiologo",
                    Apellido: "Segovia",
                    Nombre: "Luisa",
                    Fecha: '2018-11-30',
                    HoraDesde: "18:30",
                    HoraHasta: "19:00"
                },
                {
                    id:"23",
                    Descripcion: "Cardiologo",
                    Apellido: "Montana",
                    Nombre: "Tony",
                    Fecha: '2018-11-30',
                    HoraDesde: "18:30",
                    HoraHasta: "19:00"
                },
                {
                    id:"24",
                    Descripcion: "Otorrino",
                    Apellido: "De Arco",
                    Nombre: "Juana",
                    Fecha: '2018-11-30',
                    HoraDesde: "18:30",
                    HoraHasta: "19:00"
                },
                {
                    id:"25",
                    Descripcion: "Otorrino",
                    Apellido: "De Arco",
                    Nombre: "Juana",
                    Fecha: '2018-11-30',
                    HoraDesde: "19:00",
                    HoraHasta: "19:30"
                },
                {
                    id:"26",
                    Descripcion: "Otorrino",
                    Apellido: "Garcia",
                    Nombre: "Pedro",
                    Fecha: '2019-01-03',
                    HoraDesde: "14:00",
                    HoraHasta: "14:30"
                },
                {
                    id:"27",
                    Descripcion: "Otorrino",
                    Apellido: "Flores",
                    Nombre: "Pedro",
                    Fecha: '2018-12-11',
                    HoraDesde: "13:00",
                    HoraHasta: "13:30"
                },
                {
                    id:"28",
                    Descripcion: "Otorrino",
                    Apellido: "Flores",
                    Nombre: "Pedro",
                    Fecha: '2018-12-11',
                    HoraDesde: "13:30",
                    HoraHasta: "14:00"
                },
                {
                    id:"29",
                    Descripcion: "Cardiologo",
                    Apellido: "Segovia",
                    Nombre: "Luisa",
                    Fecha: '2018-11-30',
                    HoraDesde: "19:00",
                    HoraHasta: "19:30"
                },
                {
                    id:"30",
                    Descripcion: "Otorrino",
                    Apellido: "Geronte",
                    Nombre: "Rosto",
                    Fecha: '2019-01-04',
                    HoraDesde: "15:00",
                    HoraHasta: "15:30"
                },
                {
                    id:"31",
                    Descripcion: "Otorrino",
                    Apellido: "Bailo Yo",
                    Nombre: "Aquiles",
                    Fecha: '2018-11-30',
                    HoraDesde: "18:00",
                    HoraHasta: "18:30"
                },
                ]
            );
        });
    }
}

export default new ProxyReal();
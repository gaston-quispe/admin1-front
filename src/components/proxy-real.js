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
        /*
        return new Promise((resolve, reject) => {
            if (dni === '777') {
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
*/
        /* Comentado hasta que exista back
        return Axios.post(config.API_ENDPOINT + '/signin', {
            email: this.state.email,
            password: this.state.password,
        });
        */
    }

    getMisTurnos(idPaciente) {
        return Axios.get(config.API_ENDPOINT + '/pacientes/' + idPaciente + '/turnos');
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
        return Axios.get(config.API_ENDPOINT + '/especialidades/turnosdisponibles/' + utils.YYYYMMDD_to_YYYYDDMM(fechaInicial) + '/' + utils.YYYYMMDD_to_YYYYDDMM(fechaFinal))
    }
    
    solicitarTurno(turno, pacienteID) {
        console.log(this.data.pacientes);
        return Axios.post(config.API_ENDPOINT + `/pacientes/${pacienteID}/solicitarturnos`, {
            medicoID: turno.ProfesionalID,
            fecha: turno.Fecha,
            franjaHorariaID: turno.FranjaHorariaID,
            hora: turno.HoraDesde,
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
        //hasta que no se haga este post, la cosa siempre va a tirar error al hacer click al boton "CANCELAR TURNO"
        //HACER POST AL BACK PARA CANCELAR.


        return Axios.post(config.API_ENDPOINT + '/pacientes/' + turnoID + '/cancelarturnos', {
                "turnoID" : turnoID,
         })
/*
        return new Promise((resolve, reject) => {
        let index = this.data.pacienteTurnos.findIndex(t => t.id === turnoAcancelar.id)
        if (index !== -1) {
            this.data.pacienteTurnos[index].Estado = 'CANCELADO'
            resolve ({msg: "Cancelacion exitosa"});
        }
        reject({msg: "El turno a cancelar no existe"})*/            

        //hasta que no se haga este post, la cosa siempre va a tirar error al hacer click al boton "CANCELAR TURNO"
        //HACER POST AL BACK PARA CANCELAR.
        /*  https://github.com/axios/axios
        axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  */

        //ESTO DE ABAJO YA NO IRA MAS
        /*return new Promise((resolve, reject) => {
            let index = this.data.pacienteTurnos.findIndex(t => t.id === turnoAcancelar.id)
            if (index !== -1) {
                this.data.pacienteTurnos[index].Estado = 'CANCELADO'
                resolve ({msg: "Cancelacion exitosa"});
            }
            reject({msg: "El turno a cancelar no existe"})            
        });*/
    }
/*
    getMisTurnos(fechaInicial, fechaFinal) {
        return new Promise((resolve, reject) => {
            resolve (
                this.data.pacienteTurnos.filter((turno) => {
                    return fechaInicial <= turno.Fecha && turno.Fecha <= fechaFinal;
                })            
            );
        });
    }
*/


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
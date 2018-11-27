const appData = {
    pacientes: [{
        id: "1",
        nombre: "Pepe",
        apellido: "Argento",
        dNI:"35375402",
        celular:"1125864895",
        email:"pa@com.ar",
    }, {
        id: "2",
        nombre: "Diego",
        apellido: "Maradona",
        dNI:"25414598",
        celular:"1584684644",
        email:"dam@com.ar",
    }, {
        id: "3",
        nombre: "Beto",
        apellido: "Alonzo",
        dNI:"2757575",
        celular:"1175869920",
        email:"ab@com.ar",
    }],

    medicos: [{
        id: "1",
        nombre: "Ramon",
        apellido: "Castillo",
        dNI:"22584488",
    },{
        id: "2",
        nombre: "Salvador",
        apellido: "Mazza",
        dNI:"259556177",
    }],

    especialidades: [{
        id: "1",
        descipcion: "pediatria",
    },{
        id: "2",
        descipcion: "clinica medica",
    },{
        id: "3",
        descipcion: "cardiologia",
    }],

    pacienteTurnos: [
        {
            id: "1000",
            medico: {
                id: "3",
                Especialidad: "Cardiologo",
                Apellido: "Flores",
                Nombre: "Osvaldo",
                Matricula: "12-911822"
            },
            Fecha: '2018-10-13',
            HoraDesde : "16:00",
            HoraHasta: "16:30",
            Consultorio: "101",
            Estado: 'ASISTIO', // 'Asistio', 'Cancelado', 'Venidero'
        },
        {
            id: "2000",
            medico: {
                id: "14",
                Especialidad: "Cardiologo",
                Apellido: "Segovia",
                Nombre: "Luisa",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-01',
            HoraDesde : "08:30",
            HoraHasta: "09:00",
            Consultorio: "130",
            Estado: 'CANCELADO', // 'Asistio', 'Cancelado', 'Venidero'
        },
        {
            id: "3000",
            medico: {
                id: "5",
                Especialidad: "Otorrino",
                Apellido: "Flores",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2018-10-28',
            HoraDesde : "11:00",
            HoraHasta: "11:30",
            Consultorio: "205",
            Estado: 'ASISTIO', // 'Asistio', 'Cancelado', 'Venidero'
        }
    ],

    turnosDisponibles: [
        {
            id: "1",
            medico: {
                id: "1",
                Especialidad: "Pediatria",
                Apellido: "Moriello",
                Nombre: "Khalil",
                Matricula: "12-911822"
            },
            Fecha: '2018-09-13',
            HoraDesde : "16:00",
            HoraHasta: "16:30",
            Consultorio: "101",
        },{
            id: "2",
            medico: {
                id: "1",
                Especialidad: "Pediatria",
                Apellido: "Moriello",
                Nombre: "Khalil",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-06',
            HoraDesde: "16:30",
            HoraHasta: "17:00",
            Consultorio: "205",
        },{
            id: "3",
            medico: {
                id: "1",
                Especialidad: "Pediatria",
                Apellido: "Moriello",
                Nombre: "Khalil",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-06',
            HoraDesde: "17:00",
            HoraHasta: "17:30",
            Consultorio: "107",
        },{
            id:"4",
            medico: {
                id: "2",
                Especialidad: "Pediatria",
                Apellido: "Perez",
                Nombre: "Sergio",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-23',
            HoraDesde: "09:30",
            HoraHasta: "10:00",
            Consultorio: "102",
        },
        {
            id:"5",
            medico: {
                id: "3",
                Especialidad: "Cardiologo",
                Apellido: "Flores",
                Nombre: "Osvaldo",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-11',
            HoraDesde: "17:30",
            HoraHasta: "18:00",
            Consultorio: "101",
        },
        {
            id:"6",
            medico: {
                id: "3",
                Especialidad: "Cardiologo",
                Apellido: "Flores",
                Nombre: "Osvaldo",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-12',
            HoraDesde: "18:00",
            HoraHasta: "18:30",
            Consultorio: "111",
        },
        {
            id:"7",
            medico: {
                id: "3",
                Especialidad: "Cardiologo",
                Apellido: "Flores",
                Nombre: "Osvaldo",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-16',
            HoraDesde: "12:30",
            HoraHasta: "13:00",
            Consultorio: "333",
        },
        {
            id:"8",
            medico: {
                id: "4",
                Especialidad: "Otorrino",
                Apellido: "Garcia",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2019-01-03',
            HoraDesde: "12:30",
            HoraHasta: "13:30",
            Consultorio: "302",
        },
        {
            id:"9",
            medico: {
                id: "5",
                Especialidad: "Otorrino",
                Apellido: "Flores",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "12:30",
            HoraHasta: "13:00",
            Consultorio: "101",
        },
        {
            id:"10",
            medico: {
                id: "6",
                Especialidad: "Pediatria",
                Apellido: "Sandiego",
                Nombre: "Carmen",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "13:00",
            HoraHasta: "13:30",
            Consultorio: "301",
        },
        {
            id:"11",
            medico: {
                id: "5",
                Especialidad: "Otorrino",
                Apellido: "Flores",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "13:30",
            HoraHasta: "14:00",
            Consultorio: "213",
        },
        {
            id:"12",
            medico: {
                id: "7",
                Especialidad: "Otorrino",
                Apellido: "Geronte",
                Nombre: "Rosto",
                Matricula: "12-911822"
            },
            Fecha: '2019-01-04',
            HoraDesde: "12:30",
            HoraHasta: "13:30",
            Consultorio: "301",
        },
        {
            id:"13",
            medico: {
                id: "8",
                Especialidad: "Otorrino",
                Apellido: "De Control",
                Nombre: "Individuo",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-12',
            HoraDesde: "13:00",
            HoraHasta: "13:30",
            Consultorio: "214",
        },
        {
            id:"14",
            medico: {
                id: "9",
                Especialidad: "Pediatria",
                Apellido: "Ginebra",
                Nombre: "Gin",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "13:00",
            HoraHasta: "13:30",
            Consultorio: "221",
        },
        {
            id:"15",
            medico: {
                id: "10",
                Especialidad: "Pediatria",
                Apellido: "Maura",
                Nombre: "Ana",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-28',
            HoraDesde: "14:30",
            HoraHasta: "14:30",
            Consultorio: "119",
        },
        {
            id:"16",
            medico: {
                id: "10",
                Especialidad: "Pediatria",
                Apellido: "Maura",
                Nombre: "Ana",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-28',
            HoraDesde: "15:00",
            HoraHasta: "15:30",
            Consultorio: "134",
        },
        {
            id:"17",
            medico: {
                id: "11",
                Especialidad: "Otorrino",
                Apellido: "Bailo Yo",
                Nombre: "Aquiles",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-29',
            HoraDesde: "17:00",
            HoraHasta: "17:30",
            Consultorio: "217",
        },
        {
            id:"18",
            medico: {
                id: "12",
                Especialidad: "Otorrino",
                Apellido: "De Arco",
                Nombre: "Juana",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-29',
            HoraDesde: "18:00",
            HoraHasta: "18:30",
            Consultorio: "318",
        },
        {
            id:"19",
            medico: {
                id: "13",
                Especialidad: "Otorrino",
                Apellido: "Corleone",
                Nombre: "Vito",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-29',
            HoraDesde: "20:00",
            HoraHasta: "21:30",
            Consultorio: "211",
        },
        {
            id:"20",
            medico: {
                id: "14",
                Especialidad: "Cardiologo",
                Apellido: "Segovia",
                Nombre: "Luisa",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-15',
            HoraDesde: "17:00",
            HoraHasta: "17:30",
            Consultorio: "316",
        },
        {
            id:"21",
            medico: {
                id: "14",
                Especialidad: "Cardiologo",
                Apellido: "Segovia",
                Nombre: "Luisa",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-30',
            HoraDesde: "17:30",
            HoraHasta: "18:00",
            Consultorio: "113",
        },
        {
            id:"22",
            medico: {
                id: "14",
                Especialidad: "Cardiologo",
                Apellido: "Segovia",
                Nombre: "Luisa",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-05',
            HoraDesde: "18:30",
            HoraHasta: "19:00",
            Consultorio: "104",
        },
        {
            id:"23",
            medico: {
                id: "15",
                Especialidad: "Cardiologo",
                Apellido: "Montana",
                Nombre: "Tony",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-10',
            HoraDesde: "18:30",
            HoraHasta: "19:00",
            Consultorio: "118",
        },
        {
            id:"24",
            medico: {
                id: "12",
                Especialidad: "Otorrino",
                Apellido: "De Arco",
                Nombre: "Juana",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-30',
            HoraDesde: "18:30",
            HoraHasta: "19:00",
            Consultorio: "104",
        },
        {
            id:"25",
            medico: {
                id: "12",
                Especialidad: "Otorrino",
                Apellido: "De Arco",
                Nombre: "Juana",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-07',
            HoraDesde: "19:00",
            HoraHasta: "19:30",
            Consultorio: "231",
        },
        {
            id:"26",
            medico: {
                id: "4",
                Especialidad: "Otorrino",
                Apellido: "Garcia",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2019-01-03',
            HoraDesde: "14:00",
            HoraHasta: "14:30",
            Consultorio: "131",
        },
        {
            id:"27",
            medico: {
                id: "5",
                Especialidad: "Otorrino",
                Apellido: "Flores",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "13:00",
            HoraHasta: "13:30",
            Consultorio: "222",
        },
        {
            id:"28",
            medico: {
                id: "5",
                Especialidad: "Otorrino",
                Apellido: "Flores",
                Nombre: "Pedro",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-11',
            HoraDesde: "13:30",
            HoraHasta: "14:00",
            Consultorio: "312",
        },
        {
            id:"29",
            medico: {
                id: "14",
                Especialidad: "Cardiologo",
                Apellido: "Segovia",
                Nombre: "Luisa",
                Matricula: "12-911822"
            },
            Fecha: '2018-11-30',
            HoraDesde: "19:00",
            HoraHasta: "19:30",
            Consultorio: "315",
        },
        {
            id:"30",
            medico: {
                id: "3",
                Especialidad: "Cardiologo",
                Apellido: "Flores",
                Nombre: "Osvaldo",
                Matricula: "12-911822"
            },
            Fecha: '2019-01-04',
            HoraDesde: "15:00",
            HoraHasta: "15:30",
            Consultorio: "503",
        },
        {
            id:"31",
            medico: {
                id: "11",
                Especialidad: "Otorrino",
                Apellido: "Bailo Yo",
                Nombre: "Aquiles",
                Matricula: "12-911822"
            },
            Fecha: '2018-12-01',
            HoraDesde: "18:00",
            HoraHasta: "18:30",
            Consultorio: "201",
        },
    ]
}

export default appData;
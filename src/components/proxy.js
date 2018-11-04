class Proxy {
    constructor() {
    }
  
    ObtenerMisDatosSoyPaciente() {
        return new Promise(function(resolve, reject) {
            resolve ({
                nombre: "Pepe",
                apellido: "Argento",
                d_n_i:"35375402",
            });
        });
    }
  
    obtenerMisDatosSoyMedico() {
        return new Promise(function(resolve, reject) {
            resolve ({
                nombre: "Diego",
                apellido: "Maradona",
                d_n_i:"3537d402",
            });
        });
    }
}

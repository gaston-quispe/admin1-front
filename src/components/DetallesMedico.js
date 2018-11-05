import proxy from './proxy';
import React, { Component } from 'react';

class DetallesMedico extends Component {
    constructor(props) {
        super(props)
        this.data = {
            id: '0'
        }
        this.obtenerDatos();
    }


    obtenerDatos() {
    	proxy.getMedico(this.data.id)
    	    .then(res => {
    	    	console.log('Datos del médico: ' + res);
    	    })
    	    .catch(err => console.log(`No se pudo obtener los datos del médico: ${err}`))
    }

    render() {
        return (
            <h1>------Detalle Medico------</h1>
         )
     }

}

export default DetallesMedico;
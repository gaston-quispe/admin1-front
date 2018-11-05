import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import proxy from './proxy';
import {getUser} from '../helpers/user'
import {getPacienteTurnos} from '../helpers/user'

class DetallesPaciente extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
             <h1>DetallesPaciente</h1>
         )
     }

}

export default DetallesPaciente;
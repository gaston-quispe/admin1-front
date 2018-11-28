import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {setJwt} from '../helpers/jwt'
import {setUser} from '../helpers/user'
import proxy from './proxy';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginTop: '2em'
    },
    title: {
        fontSize: '1.5em',
    },
    card: {
        margin: '1em',
        marginTop: '4em',
        maxWidth: 275,
        display: 'inline-block',
    },

})
class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dni: '',
            password: '',
            msg: ''
        }

        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }


    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        proxy.login(this.state.dni, this.state.password)
            .then(res => {
                setJwt(res.data.token)
                setUser(res.data.user)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(`No se pudo autenticar: ${err.msg}`)
                this.setState({msg: 'El nombre de usuario o la contraseña son incorrectos. Por favor vuelva a intentarlo.'})
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{textAlign: 'center'}}>
           <Card className={classes.card}>
               <CardContent>
               <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Acceder
                </Typography>

                    <form onSubmit={e=> this.submit(e)}>
                        <TextField
                            id="dni"
                            name="dni"
                            label="Usuario"
                            value={this.state.dni}
                            type="text"
                            onChange={e => this.change(e)}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            type="password"
                            onChange={e => this.change(e)}
                            margin="normal"
                        />
                        <br />
                        <p style={{color: 'red'}}>{this.state.msg}</p>
                        <Button type="submit" variant="contained" color="primary" className={this.props.classes.button}>
                            Acceder
                        </Button>
                    </form>
               </CardContent>
           </Card>
           </div>
        )
    }
}

export default withStyles(styles)(Login)
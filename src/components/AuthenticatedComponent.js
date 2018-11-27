import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt'
import { withRouter } from 'react-router-dom';

class AuthenticatedComponent extends Component {
    //constructor(props) {
    //    super(props)
    //}

    componentDidMount() {
        const jwt = getJwt();
        //console.log('131' + jwt);
        if (!jwt) this.props.history.push('/Login')
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent);
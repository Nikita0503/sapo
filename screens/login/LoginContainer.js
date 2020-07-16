import React from 'react';
import {connect} from 'react-redux';
import {setEmail, setPassword} from '../../redux/login/actions';
import LoginScreen from './LoginScreen';

class LoginContainer extends React.Component{
    render(){
        return(
            <LoginScreen
                email={this.props.email}
                password={this.props.password}
                setEmail={this.props.setEmail}
                setPassword={this.props.setPassword}
            />
        )
    }

    
}

const mapStateToProps = state => {
    return {
        email: state.login.email,
        password: state.login.password
    }
}

const mapDispatchToProps = {
    setEmail,
    setPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
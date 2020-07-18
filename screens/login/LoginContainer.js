import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTab,
     setEmail,
     setPassword, 
     setShownDialogId, 
     setSelectedRegion, 
     setSelectedCity, 
     setSelectedStreet, 
     setSelectedHouse, 
     setSelectedFlat, 
     setSelectedAccountNumber} from '../../redux/login/actions';
import LoginScreen from './LoginScreen';

class LoginContainer extends React.Component{
    render(){
        return(
            <LoginScreen
                navigation={this.props.navigation}
                currentTab={this.props.currentTab}
                email={this.props.email}
                password={this.props.password}
                shownDialogId={this.props.shownDialogId}
                selectedRegion={this.props.selectedRegion}
                selectedCity={this.props.selectedCity}
                selectedStreet={this.props.selectedStreet}
                selectedHouse={this.props.selectedHouse}
                selectedFlat={this.props.selectedFlat}
                selectedAccountNumber={this.props.selectedAccountNumber}
                setCurrentTab={this.props.setCurrentTab}
                setEmail={this.props.setEmail}
                setPassword={this.props.setPassword}
                setShownDialogId={this.props.setShownDialogId}
                setSelectedRegion={this.props.setSelectedRegion}
                setSelectedCity={this.props.setSelectedCity}
                setSelectedStreet={this.props.setSelectedStreet}
                setSelectedHouse={this.props.setSelectedHouse}
                setSelectedFlat={this.props.setSelectedFlat}
                setSelectedAccountNumber={this.props.setSelectedAccountNumber}
            />
        )
    }

    
}

const mapStateToProps = state => {
    return {
        currentTab: state.login.currentTab,
        email: state.login.email,
        password: state.login.password,
        shownDialogId: state.login.shownDialogId,
        selectedRegion: state.login.selectedRegion,
        selectedCity: state.login.selectedCity,
        selectedStreet: state.login.selectedStreet,
        selectedHouse: state.login.selectedHouse,
        selectedFlat: state.login.selectedFlat,
        selectedAccountNumber: state.login.selectedAccountNumber
    }
}

const mapDispatchToProps = {
    setCurrentTab,
    setEmail,
    setPassword,
    setShownDialogId,
    setSelectedRegion,
    setSelectedCity,
    setSelectedStreet,
    setSelectedHouse,
    setSelectedFlat,
    setSelectedAccountNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
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
     setSelectedAccountNumber,
     fetchTokenByEmailPassword,
     fetchTokenByAddress,
     fetchRegionsInfo,
     fetchCompaniesInfo,
     setSelectedCityCompany,
     setCompanies,
     setSelectedCompany,
     setRegionsInfo,
     setAuthMethod
    } from '../../redux/login/actions';
import LoginScreen from './LoginScreen';

class LoginContainer extends React.Component {
    render(){
        return(
            <LoginScreen
                navigation={this.props.navigation}
                currentTab={this.props.currentTab}
                email={this.props.email}
                password={this.props.password}
                shownDialogId={this.props.shownDialogId}
                selectedStreet={this.props.selectedStreet}
                selectedHouse={this.props.selectedHouse}
                selectedFlat={this.props.selectedFlat}
                selectedAccountNumber={this.props.selectedAccountNumber}
                regionsInfo={this.props.regionsInfo}
                companiesInfo={this.props.companiesInfo}
                selectedCityCompany={this.props.selectedCityCompany}
                companies={this.props.companies}
                selectedCompany={this.props.selectedCompany}
                token={this.props.token}
                authMethod={this.props.authMethod}
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
                fetchTokenByEmailPassword={this.props.fetchTokenByEmailPassword}
                fetchTokenByAddress={this.props.fetchTokenByAddress}
                fetchRegionsInfo={this.props.fetchRegionsInfo}
                fetchCompaniesInfo={this.props.fetchCompaniesInfo}
                setSelectedCityCompany={this.props.setSelectedCityCompany}
                setCompanies={this.props.setCompanies}
                setSelectedCompany={this.props.setSelectedCompany}
                setRegionsInfo={this.props.setRegionsInfo}
                setAuthMethod={this.props.setAuthMethod}
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
        selectedStreet: state.login.selectedStreet,
        selectedHouse: state.login.selectedHouse,
        selectedFlat: state.login.selectedFlat,
        selectedAccountNumber: state.login.selectedAccountNumber,
        regionsInfo: state.login.regionsInfo,
        companiesInfo: state.login.companiesInfo,
        selectedCityCompany: state.login.selectedCityCompany,
        companies: state.login.companies,
        selectedCompany: state.login.selectedCompany,
        token: state.login.token,
        authMethod: state.login.authMethod
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
    setSelectedAccountNumber,
    fetchTokenByEmailPassword,
    fetchTokenByAddress,
    fetchRegionsInfo,
    fetchCompaniesInfo,
    setSelectedCityCompany,
    setCompanies,
    setSelectedCompany,
    setRegionsInfo,
    setAuthMethod
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
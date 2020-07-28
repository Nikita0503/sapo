import React from 'react';
import {connect} from 'react-redux';
import {
    setUserData,
    setOsbbId,
    setAccountId,
    setAccountIds,
    setWorkPeriods,
    setAllApartmentData,
    setNumber,
    setCurrentApartmentData,
    setAllCostsData,
    setCurrentCostsData,
    setDebtData,
    setLiqpayData,
    setIsActivated,
    clearState
  } from '../../../redux/home/actions';
import { setCurrentWorkPeriod } from '../../../redux/monthPicker/actions';
import HomeScreen from './HomeScreen';

class HomeContainer extends React.Component {
    render(){
        return(
            <HomeScreen
                navigation={this.props.navigation}
                token={this.props.token}
                userData={this.props.userData}
                osbbId={this.props.osbbId}
                accountId={this.props.accountId}
                accountIds={this.props.accountIds}
                currentWorkPeriod={this.props.currentWorkPeriod}
                workPeriods={this.props.workPeriods}
                allApartmentData={this.props.allApartmentData}
                currentApartmentData={this.props.currentApartmentData}
                allCostsData={this.props.allCostsData}
                currentCostsData={this.props.currentCostsData}
                debtData={this.props.debtData}
                liqpayData={this.props.liqpayData}
                isActivated={this.props.isActivated}
                imageAvatar={this.props.imageAvatar}
                setUserData={this.props.setUserData}
                setOsbbId={this.props.setOsbbId}
                setAccountId={this.props.setAccountId}
                setAccountIds={this.props.setAccountIds}
                setNumber={this.props.setNumber}
                setWorkPeriods={this.props.setWorkPeriods}
                setCurrentWorkPeriod={this.props.setCurrentWorkPeriod}
                setAllApartmentData={this.props.setAllApartmentData}
                setCurrentApartmentData={this.props.setCurrentApartmentData}
                setAllCostsData={this.props.setAllCostsData}
                setCurrentCostsData={this.props.setCurrentCostsData}
                setDebtData={this.props.setDebtData}
                setLiqpayData={this.props.setLiqpayData}
                setIsActivated={this.props.setIsActivated}
                clearState={this.props.clearState}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        userData: state.home.userData,
        osbbId: state.home.osbbId,
        accountId: state.home.accountId,
        accountIds: state.home.accountIds,
        workPeriods: state.home.workPeriods,
        currentWorkPeriod: state.header.currentWorkPeriod,
        allApartmentData: state.home.allApartmentData,
        currentApartmentData: state.home.currentApartmentData,
        allCostsData: state.home.allCostsData,
        currentCostsData: state.home.currentCostsData,
        debtData: state.home.debtData,
        liqpayData: state.home.liqpayData,
        isActivated: state.home.isActivated,
        imageAvatar: state.profile.imageAvatar
    }
}

const mapDispatchToProps = {
    setUserData,
    setOsbbId,
    setAccountId,
    setAccountIds,
    setNumber,
    setWorkPeriods,
    setCurrentWorkPeriod,
    setAllApartmentData,
    setCurrentApartmentData,
    setAllCostsData,
    setCurrentCostsData,
    setDebtData,
    setLiqpayData,
    setIsActivated,
    clearState
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
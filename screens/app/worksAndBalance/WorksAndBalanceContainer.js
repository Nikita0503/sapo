import React from 'react';
import {connect} from 'react-redux';
import {setAllHouseData, setAllHouseCostsData } from '../../../redux/worksAndBalance/actions';
import {setExpensesGeneralData, setExpensesFilesData } from '../../../redux/worksAndBalance/expenses/actions';
import WorksAndBalanceScreen from './WorksAndBalanceScreen';

class WorksAndBalanceContainer extends React.Component{
    render(){
        return(
        <WorksAndBalanceScreen
            navigation={this.props.navigation}
            token={this.props.token}
            osbbId={this.props.osbbId}
            accountId={this.props.accountId}
            currentWorkPeriod={this.props.currentWorkPeriod}
            workPeriods={this.props.workPeriods}
            allHouseData={this.props.allHouseData}
            allHouseCostsData={this.props.allHouseCostsData}
            userData={this.props.userData}
            imageAvatar={this.props.imageAvatar}
            setAllHouseData={this.props.setAllHouseData}
            setAllHouseCostsData={this.props.setAllHouseCostsData}
            setExpensesGeneralData={this.props.setExpensesGeneralData}
            setExpensesFilesData={this.props.setExpensesFilesData}
        />)
    }
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        osbbId: state.home.osbbId,
        accountId: state.home.accountId,
        workPeriods: state.home.workPeriods,
        currentWorkPeriod: state.header.currentWorkPeriod,
        allHouseData: state.house.allHouseData,
        allHouseCostsData: state.house.allHouseCostsData,
        userData: state.home.userData,
        imageAvatar: state.profile.imageAvatar
    }
}

const mapDispatchToProps = {
    setAllHouseData: setAllHouseData,
    setAllHouseCostsData: setAllHouseCostsData,
    setExpensesGeneralData: setExpensesGeneralData,
    setExpensesFilesData: setExpensesFilesData
}

export default connect(mapStateToProps, mapDispatchToProps)(WorksAndBalanceContainer);
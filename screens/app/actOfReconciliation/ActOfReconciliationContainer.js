import React from 'react';
import {connect} from 'react-redux';
import {setFromMonth, 
    setFromYear, 
    setToMonth, 
    setToYear, 
    setSelectedData, 
    setFromMonths, 
    setToMonths, 
    setShowLoading, 
    setFromMonthShow, 
    setFromYearShow, 
    setToMonthShow, 
    setToYearShow} from '../../../redux/actOfReconciliation/actions';
import ActOfReconciliationScreen from './ActOfReconciliationScreen';

class ActOfReconciliationContainer extends React.Component{
    render(){
        return(
            <ActOfReconciliationScreen
                navigation={this.props.navigation}
                token={this.props.token}
                osbbId={this.props.osbbId}
                accountId={this.props.accountId}
                workPeriods={this.props.workPeriods}
                fromMonth={this.props.fromMonth}
                fromYear={this.props.fromYear}
                toMonth={this.props.toMonth}
                toYear={this.props.toYear}
                fromMonths={this.props.toMonths}
                toMonths={this.props.toMonths}
                selectedData={this.props.selectedData}
                showLoading={this.props.showLoading}
                fromMonthShow={this.props.fromMonthShow}
                fromYearShow={this.props.fromYearShow}
                toMonthShow={this.props.toMonthShow}
                toYearShow={this.props.toYearShow}
                setFromMonth={this.props.setFromMonth}
                setFromYear={this.props.setFromYear}
                setToMonth={this.props.setToMonth}
                setToYear={this.props.setToYear}
                setSelectedData={this.props.setSelectedData}
                setFromMonths={this.props.setFromMonths}
                setToMonths={this.props.setToMonths}
                setShowLoading={this.props.setShowLoading}
                setFromMonthShow={this.props.setFromMonthShow}
                setFromYearShow={this.props.setFromYearShow}
                setToMonthShow={this.props.setToMonthShow}
                setToYearShow={this.props.setToYearShow}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        osbbId: state.home.osbbId,
        accountId: state.home.accountId,
        workPeriods: state.home.workPeriods,
        fromMonth: state.actOfReconciliation.fromMonth,
        fromYear: state.actOfReconciliation.fromYear,
        toMonth: state.actOfReconciliation.toMonth,
        toYear: state.actOfReconciliation.toYear,
        selectedData: state.actOfReconciliation.selectedData,
        fromMonths: state.actOfReconciliation.fromMonths,
        toMonths: state.actOfReconciliation.toMonths,
        showLoading: state.actOfReconciliation.showLoading,
        fromMonthShow: state.actOfReconciliation.fromMonthShow,
        fromYearShow: state.actOfReconciliation.fromYearShow,
        toMonthShow: state.actOfReconciliation.toMonthShow,
        toYearShow: state.actOfReconciliation.toYearShow
    }
}

const mapDispatchToProps = {
    setFromMonth,
    setFromYear,
    setToMonth,
    setToYear,
    setSelectedData,
    setFromMonths,
    setToMonths,
    setShowLoading,
    setFromMonthShow,
    setFromYearShow,
    setToMonthShow,
    setToYearShow
}

export default connect(mapStateToProps, mapDispatchToProps)(ActOfReconciliationContainer);
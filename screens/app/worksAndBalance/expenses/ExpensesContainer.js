import React from 'react';
import { connect } from 'react-redux';
import {setExpensesData, setExpensesSelectedFile } from '../../../../redux/worksAndBalance/expenses/actions';
import ExpensesScreen from './ExpensesScreen';

class ExpensesContainer extends React.Component {
  render() {
    return (
      <ExpensesScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        expensesGeneralData={this.props.expensesGeneralData}
        expensesData={this.props.expensesData}
        expensesFilesData={this.props.expensesFilesData}
        expensesSelectedFile={this.props.expensesSelectedFile}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        setExpensesData={this.props.setExpensesData}
        setExpensesSelectedFile={this.props.setExpensesSelectedFile}
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
    currentWorkPeriod: state.header.currentWorkPeriod,
    expensesGeneralData: state.houseExpenses.expensesGeneralData,
    expensesData: state.houseExpenses.expensesData,
    expensesFilesData: state.houseExpenses.expensesFilesData,
    expensesSelectedFile: state.houseExpenses.expensesSelectedFile,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setExpensesData,
  setExpensesSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesContainer);
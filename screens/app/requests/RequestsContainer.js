import React from 'react';
import {connect} from 'react-redux';
import {
  setApplicationsAndOffersData,
  setApplicationsAndOffersDataClear,
  setSelectedOfferData,
  setApplicationsAndOffersOnlyMy,
  setApplicationsAndOffersLoading,
  setApplicationsAndOffersFirstlyOpened,
  setApplicationsAndOffersDisplayAcrhived
} from '../../../redux/requests/actions';
import RequestsScreen from './RequestsScreen';

class RequestsContainer extends React.Component{
    render(){
        return(
        <RequestsScreen
            navigation={this.props.navigation}
            token={this.props.token}
            osbbId={this.props.osbbId}
            accountId={this.props.accountId}
            workPeriods={this.props.workPeriods}
            currentWorkPeriod={this.props.currentWorkPeriod}
            applicationsAndOffersData={this.props.applicationsAndOffersData}
            applicationsAndOffersDataMy={this.props.applicationsAndOffersDataMy}
            selectedOfferData={this.props.selectedOfferData}
            onlyMy={this.props.onlyMy}
            userData={this.props.userData}
            loading={this.props.loading}
            firstlyOpened={this.props.firstlyOpened}
            displayArchived={this.props.displayArchived}
            imageAvatar={this.props.imageAvatar}
            setApplicationsAndOffersData={this.props.setApplicationsAndOffersData}
            setApplicationsAndOffersDataClear={
            this.props.setApplicationsAndOffersDataClear
            }
            setSelectedOfferData={this.props.setSelectedOfferData}
            setApplicationsAndOffersOnlyMy={this.props.setApplicationsAndOffersOnlyMy}
            setApplicationsAndOffersLoading={this.props.setApplicationsAndOffersLoading}
            setApplicationsAndOffersFirstlyOpened={this.props.setApplicationsAndOffersFirstlyOpened}
            setApplicationsAndOffersDisplayAcrhived={this.props.setApplicationsAndOffersDisplayAcrhived}
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
        applicationsAndOffersData: state.applicationsAndOffers.applicationsAndOffersData,
        onlyMy: state.applicationsAndOffers.onlyMy,
        userData: state.home.userData,
        loading: state.applicationsAndOffers.loading,
        firstlyOpened: state.applicationsAndOffers.firstlyOpened,
        displayArchived: state.applicationsAndOffers.displayArchived,
        imageAvatar: state.profile.imageAvatar
    }
}

const mapDispatchToProps = {
    setApplicationsAndOffersData,
    setApplicationsAndOffersDataClear,
    setSelectedOfferData,
    setApplicationsAndOffersOnlyMy,
    setApplicationsAndOffersLoading,
    setApplicationsAndOffersFirstlyOpened,
    setApplicationsAndOffersDisplayAcrhived  
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsContainer);
import React from 'react';
import {connect} from 'react-redux';
import {} from '../../../redux/requests/actions';
import RequestsScreen from './RequestsScreen';

class RequestsContainer extends React.Component{
    render(){
        return(
        <RequestsScreen
            navigation={this.props.navigation}>

        </RequestsScreen>)
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsContainer);
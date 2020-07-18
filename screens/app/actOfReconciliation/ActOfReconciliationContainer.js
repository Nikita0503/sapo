import React from 'react';
import {connect} from 'react-redux';
import {} from '../../../redux/actOfReconciliation/actions';
import ActOfReconciliationScreen from './ActOfReconciliationScreen';

class ActOfReconciliationContainer extends React.Component{
    render(){
        return(
        <ActOfReconciliationScreen
            navigation={this.props.navigation}>

        </ActOfReconciliationScreen>)
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ActOfReconciliationContainer);
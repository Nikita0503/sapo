import React from 'react';
import {connect} from 'react-redux';
import {} from '../../../redux/worksAndBalance/actions';
import WorksAndBalanceScreen from './WorksAndBalanceScreen';

class WorksAndBalanceContainer extends React.Component{
    render(){
        return(
        <WorksAndBalanceScreen
            navigation={this.props.navigation}/>)
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WorksAndBalanceContainer);
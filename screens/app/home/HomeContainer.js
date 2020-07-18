import React from 'react';
import {connect} from 'react-redux';
import {} from '../../../redux/home/actions';
import HomeScreen from './HomeScreen';

class HomeContainer extends React.Component{
    render(){
        return(
        <HomeScreen
            navigation={this.props.navigation}>

        </HomeScreen>)
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
import {USMap} from '../component/USMap';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
  return {
    usmap:state.USMap
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    test:()=>{
      dispatch();
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(USMap);

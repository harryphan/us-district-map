import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';

export default class Main extends PureComponent{
  render(){
    return(
      <div>
        <div>
          <h1>Test</h1>
        </div>
        <div>
          <USMapContainer/>
        </div>
      </div>
    );
  }
}

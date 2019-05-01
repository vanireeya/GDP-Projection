import React from 'react';
import logo from './logo.svg';
import './assets/styles/App.css';
import Holder from './components/holder';

function App() {


  return (
    <div id="1">
      <div id="title" class="slide header">
        <h1>Reeya Vani</h1>
      </div>
      
      <div id="slide2" class="slide">
      

        {/* <div id="temp">HHHHHHHHHHHHHHHHHHHHHHHHs</div> */}
        {/* <div class="title"> */}
        <Holder />

        {/* <svg style={{width: '400', height:'60'}}></svg> */}
        {/* </div> */}
        <img style={{opacity: "0.85"}} src={require('./assets/images/line Graph.png')} />
        <img  src={require('./assets/images/graphdesc.png')} />
        {/* <img src="https://lorempixel.com/640/480/abstract/4/" /> */}
      </div>

      <div id="slide4" class="slide header">
        <h1>Thank You!</h1>
      </div>


    </div>
  );
}

export default App;

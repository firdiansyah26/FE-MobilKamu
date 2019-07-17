import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './store'
import { Provider } from "react-redux";
import Home from './MasterMenu/MainMenu/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'

function App() {
  return (
    <Provider store={store}>
      <Home />
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div> */}
    </Provider>
  );
}

export default App;

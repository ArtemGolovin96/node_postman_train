import logo from './logo.svg';
import './App.css';
import { PureComponent } from 'react';
import Buttons from './components/Buttons'

export default class App extends PureComponent{
  render() {
    return (
      <div className="App">
          <header className="header">
              <h1 className="h1">Рыболов</h1>
          </header>
          <Buttons />
      </div>
    );
  }
}


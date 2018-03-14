import React from 'react';
import './App.css';
import TimerList from './components/TimerList';
import AddTimer from './components/AddTimer';
import Background from './components/Background';

const App = () => (
  <div className="App">
    <Background className="Background" baseColorR={255} baseColorG={165} baseColorB={0} />
    <AddTimer />
    <TimerList />
  </div>
);

export default App;

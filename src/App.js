import React from 'react';
import './App.css';
import TimerList from './components/TimerList';
import AddTimer from './components/AddTimer';

const App = () => (
  <div className="App">
    <AddTimer />
    <TimerList />
  </div>
);

export default App;

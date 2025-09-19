import React from 'react';
import logo from './img/logo.png';
import './App.css';
import Button from './components/button';

function App() {
  return (
    <div className="App w-full">
      <header>
        <img src={logo} alt="logo" />
        <p>
          Bienvenue sur l'application MyContacts
        </p>
        <div className='flex gap-10 w-full justify-center mb-5'>
          <Button onClick={() => alert('')}>s'inscrire</Button>
          <Button onClick={() => alert('')}>se connecter</Button>
        </div>
      </header>
    </div>
  );
}

export default App;

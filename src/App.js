import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  let positionX = 0;
  let positionY = 0;
  const socket = new WebSocket("ws://localhost:8080/websocket/test")

  socket.addEventListener("open", (event) => {
    socket.send("Connection established")
  })

  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data)
    positionX = event.data.split(',')[0];
    positionY = event.data.split(',')[1];
    updateCarPosition(positionX, positionY);
  })

  socket.addEventListener("close", (event) => {
    console.log("Connection closed")
  })

  const updateCarPosition = (x, y) => {
    const carElement = document.getElementById('car');
    if (carElement) {
      carElement.style.left = `${x*3}px`;
      carElement.style.bottom = `${y*3}px`;
    }
  };

  const handleButtonClick = async (action) => {
    socket && socket.send(action);
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        console.log('monter');
        handleButtonClick('monter');
        break;
      case 'ArrowDown':
        console.log('descendre');
        handleButtonClick('descendre');
        break;
      case 'ArrowLeft':
        console.log('reculer');
        handleButtonClick('reculer');
        break;
      case 'ArrowRight':
        console.log('avancer');
        handleButtonClick('avancer');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <h1>Simulateur de voiture</h1>
      <div id="car" className="car"></div>
    </div>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import maisonPositions from './maisonsPosition';
import stationPosition from './stationPosition';

function App() {
  const canvasRef = useRef(null);
  const carPosition = { x: 0, y: 0 };

  const socket = new WebSocket("ws://localhost:8080/websocket/test");

  socket.addEventListener("open", (event) => {
    socket.send("Connection established");
  });

  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    const [newX, newY] = event.data.split(',').map(parseFloat);
    updateCarPosition(newX, newY);
  });

  socket.addEventListener("close", (event) => {
    console.log("Connection closed");
  });

  const updateCarPosition = (x, y) => {
    carPosition.x = x;
    carPosition.y = y;
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.log("Canvas is null");
      return;
    }

    const ctx = canvas.getContext("2d");
    // Efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessine le plateau
    drawPlateau(ctx);

    // Dessine les maisons
    drawMaisons(ctx);

    // Dessine la voiture
    drawCar(ctx);
  };

  const drawMaisons = (ctx) => {
    const maisonStyle = {
      width: '20px',
      height: '20px',
      backgroundColor: 'red', 
    };

    const stationStyle = {
      width: '20px',
      height: '20px',
      backgroundColor: 'green', 
    };
  
    // Utilisez la liste des positions de maisons de votre fichier maisonsPosition
    maisonPositions.forEach((position, index) => {
      ctx.fillStyle = maisonStyle.backgroundColor;
      ctx.fillRect(position.x, position.y, 9, 9);
    });

    stationPosition.forEach((position, index) => {
      ctx.fillStyle = stationStyle.backgroundColor;
      ctx.fillRect(position.x, position.y, 9, 9);
      }
    );
  }

  const drawPlateau = (ctx) => {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, 500, 300);
  };

  const drawCar = (ctx) => {
    ctx.fillStyle = "#00F";
    ctx.fillRect(carPosition.x, carPosition.y, 9, 9);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
  
    if (!canvas) {
      console.log("Canvas is null");
      return;
    }
  
    const ctx = canvas.getContext("2d");
    draw();
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        console.log('descendre');
        handleButtonClick('descendre');
        break;
      case 'ArrowDown':
        console.log('monter');
        handleButtonClick('monter');
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

  const handleButtonClick = async (action) => {
    socket && socket.send(action);
  };

  return (
    <div className="App">
      <h1>Simulateur de voiture</h1>
      <canvas ref={canvasRef} width="500" height="300"></canvas>
    </div>
  );
}
export default App;

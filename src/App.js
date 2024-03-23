import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import maisonPositions from './maisonsPosition';
import stationPosition from './stationPosition';

import carImage from './imageCar.png';
import bouleImage from './imageBoule.png';
import maisonImage from './imageMaison.png';
import stationImage from './imageStation.png';

function App() {
  const canvasRef = useRef(null);
  const carPosition = { x: 0, y: 0 };
  const boulePosition = { x: 0, y: 0 };

  // Préchargement des images
  const carImg = new Image();
  const bouleImg = new Image();
  const maisonImg = new Image();
  const stationImg = new Image();

  carImg.src = carImage;
  bouleImg.src = bouleImage;
  maisonImg.src = maisonImage;
  stationImg.src = stationImage;


  const socket = new WebSocket("ws://localhost:8080/websocket/test");
  // const socket = new WebSocket("wss://polytech2.home.lange.xyz/websocket/test");
  
  

  socket.addEventListener("open", (event) => {
    socket.send("Connection established");
  });

  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    const [newX, newY, bouleX, bouleY] = event.data.split(',').map(parseFloat);
    updateCarPosition(newX, newY);
    updateBoulePosition(bouleX,bouleY);
  });

  socket.addEventListener("close", (event) => {
    console.log("Connection closed");
  });

  const updateCarPosition = (x, y) => {
    carPosition.x = x;
    carPosition.y = y;
    draw();
  };

  const updateBoulePosition = (x, y) => {
    boulePosition.x = x;
    boulePosition.y = y;
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.log("Canvas is null");
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlateau(ctx);
    drawMaisons(ctx);
    drawCar(ctx);
    drawBoule(ctx);
  };

  const drawPlateau = (ctx) => {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, 500, 300);
  };

  const drawMaisons = (ctx) => {
    maisonPositions.forEach((position, index) => {
      ctx.drawImage(maisonImg, position.x, position.y, 50, 50);
    });

    stationPosition.forEach((position, index) => {
      ctx.drawImage(stationImg, position.x, position.y, 50, 50);
    });
  };

  const drawCar = (ctx) => {
    ctx.drawImage(carImg, carPosition.x, carPosition.y, 50, 50);
  };

  const drawBoule = (ctx) => {
    ctx.drawImage(bouleImg, boulePosition.x, boulePosition.y, 50, 50);
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

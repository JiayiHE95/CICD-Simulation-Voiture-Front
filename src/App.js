import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  const handleButtonClick = async (action) => {
    try {
      const url = 'http://localhost:8080/api/commands/' + action;
      const response = await axios.post(url);
      console.log("response ",response); // Affichez la réponse de l'API dans la console
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  };

  useEffect(() => {
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

    document.addEventListener('keydown', handleKeyDown);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <h1>Simulateur de voiture</h1>

    {/*
          <button onClick={() => handleButtonClick('avancer')}>Avancer</button>
          <button onClick={() => handleButtonClick('reculer')}>Reculer</button>
          <button onClick={() => handleButtonClick('monter')}>Monter</button>
          <button onClick={() => handleButtonClick('descendre')}>Descendre</button>
    */}
      
    </div>
  );
}

export default App;

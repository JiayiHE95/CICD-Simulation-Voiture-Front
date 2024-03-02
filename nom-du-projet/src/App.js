import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const handleButtonClick = async (action) => {
    try {
      const url = 'http://localhost:8080/api/commands/' + action;
      const response = await axios.post(url);
      console.log(response.data); // Affichez la réponse de l'API dans la console
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  };

  return (
    <div className="App">
      <h1>Simulateur de voiture</h1>

      <button onClick={() => handleButtonClick('avancer')}>Avancer</button>
      <button onClick={() => handleButtonClick('reculer')}>Reculer</button>
      <button onClick={() => handleButtonClick('monter')}>Monter</button>
      <button onClick={() => handleButtonClick('descendre')}>Descendre</button>

      
    </div>
  );
}

export default App;

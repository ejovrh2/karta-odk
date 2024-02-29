import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios'; // Import Axios
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Stilizacija

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://edc-central.xyz/v1/sessions', { username, password });
      const data = response.data;
      setToken(data.token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Greška prilikom prijave:', error);
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <MapContainer center={[45.815, 15.9819]} zoom={12} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Dodajte vaše komponente za sidebar i ostale potrebne elemente */}
        </MapContainer>
      ) : (
        <div className="login-form">
          <h2>Prijava</h2>
          <input type="text" placeholder="Korisničko ime" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Prijavi se</button>
        </div>
      )}
    </div>
  );
}

export default App;

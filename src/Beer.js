import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  let API = "https://api.punkapi.com/v2/beers/";

  const fetchApi = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        setBeers(data);
    }catch(error){
        console.log(error);
    }
}

  useEffect(() => {
    fetchApi(API)
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search beers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="beer-container">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
            <p>ABV: {beer.abv}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
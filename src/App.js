import './App.css';
import { useEffect, useState } from 'react';
import * as React from 'react';

function App() {
    const [allCharacters, setAllCharacters] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [catURL, setCatURL] = useState(null);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [open, setOpen] = useState(true)
    useEffect(() => {
      const fetchData = async () => {
      try {
        let response0 = await fetch('https://api.thecatapi.com/v1/images/search?limit=9');
        let response1 = await fetch('https://api.thecatapi.com/v1/images/search?limit=9');
        let response2 = await fetch('https://api.thecatapi.com/v1/images/search?limit=9');
        if (!response0.ok) {
          throw new Error(response0.statusText);
        }
        if (!response1.ok) {
          throw new Error(response1.statusText);
        }
        if (!response2.ok) {
          throw new Error(response2.statusText);
        }
      const data1 = await response0.json();
      const data2 = await response1.json();
      const data3 = await response2.json();
      const data = data1.concat(data2, data3)
      setAllCharacters(data);

      } catch (err) {
        console.log(err)
        setErrorMsg(err)
      }
    };
    fetchData();
    }, [])
  function handleClick (cat) {
    let catImage = cat.url
    let catBreeds = cat.breeds
    setCatURL(catImage);
    setSelectedBreed(catBreeds);
    setOpen(!open);
    }
  function handleClose () {
    setOpen(!open);
  }
  return (
    <div className='App'>
      <br></br>
      <h1 id='headerStyle'>$$$ STEAM DEAL TRACKER $$$
      </h1>
      {errorMsg && <h3>{errorMsg}</h3>}
      {open ? 
      <div></div> : 
      <div id='popUpBox' onClick={() => handleClose()}>
        <div id='saleText'><img src={catURL}></img></div>
        <div id='saleText'>Breed: {selectedBreed}</div>
      </div>}
      <div id='buttonContainer'>
      {allCharacters.map((cat, index) => {
        return (
          <div>
            <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleClick(cat)}>
              <img key={index} src = {cat.url}></img>
              
            </button>
          </div>
        
        )
      })}

      </div>

    </div>
  );
};

export default App;
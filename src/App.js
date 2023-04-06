import './App.css';
import { useEffect, useState } from 'react';
import * as React from 'react';

function App() {
    const [allCharacters, setAllCharacters] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [catURL, setCatURL] = useState(null);
    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [openCart, setOpenCart] = useState(false)
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
    setOpen(!open);
    }
  function handleClose () {
    setOpen(!open);
  }
  function handleCartClick () {

    setOpenCart(!openCart);
    }
  function handleBuy () {
    let catImage = cart.concat(catURL);
    setCart(catImage)
    alert("Added to cart!")
  }
  function handleFinal () {
    setOpenCart(!openCart);
    setCart([]);
    alert("Payment processing... Please wait...")
    setTimeout(() => {
      alert("PURCHASE SUCCESSFUL!!! ENJOY YOUR CATS!!!")
    }, "5000");
    
    }
  return (
    <div className='App'>
      <div id='titleContainer'>
      <br></br>

      <h1 id='headerStyle'>cats4life

      </h1>
      <button id='buttonStyling' className='buttonStyleRemove' disabled={open} onClick={() => handleCartClick()}>
        <img id='cartImg' src="https://cdn-icons-png.flaticon.com/512/3721/3721818.png"></img>
      </button>
      </div>
      {errorMsg && <h3>{errorMsg}</h3>}

      {/* cat select window */}
      {open ?       
        <div id='popUpBox'>
        <div id='saleText'><img id='catImg2' src={catURL}></img></div>
        <div id='saleText'>Maybe put price here?</div>
        <div>
          <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleClose()}>
            <h1 id='headerStyle'>CLOSE</h1>
          </button>
          <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleBuy(catURL)}>
            <h1 id='headerStyle'>BUY</h1>
          </button>

        </div>
      </div>
       : <div></div>}

      {/* cart window */}
      {openCart ? 
      <div id='popUpBox' onClick={() => handleCartClick()}>
        {cart.map(catUrl => {
          return (
            <img id='catImg' src = {catUrl}></img>
          )
        })}
        <div id='headerStyle'>
          <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleFinal()}>
            <h1 id='headerStyle'>Finalise purchase?</h1>
          </button>
        </div>
      </div>
       : <div></div>}
      
      {/* map for cat images on homepage */}
      <div id='buttonContainer'>
      {allCharacters.map((cat, index) => {
        return (
          <div>
            <button id='buttonStyling' className='buttonStyleRemove' disabled={openCart} onClick={() => handleClick(cat)}>
              <img id='catImg' key={index} src = {cat.url}></img>
              
            </button>
          </div>
        
        )
      })}

      </div>

    </div>
  );
};

export default App;

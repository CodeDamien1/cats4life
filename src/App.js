import './App.css';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { faker } from '@faker-js/faker';

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

        if (!response0.ok) {
          throw new Error(response0.statusText);
        }
      const data1 = await response0.json();
      const data = data1.concat();
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
  function handleRemove (index) {
  let catURLarray = cart;
  let catURLarraySliced = catURLarray.slice(0, index).concat(catURLarray.slice(index+1))
  setCart(catURLarraySliced)
  }
  
  return (
    <div className='App'>
      <div id='titleContainer'>
      <br></br>
      <img src={require('./images/catLogo.png')}></img>
      <button id='buttonStyling' className='buttonStyleRemove' disabled={open} onClick={() => handleCartClick()}>
        <img id='cartImg' src="https://cdn-icons-png.flaticon.com/512/3721/3721818.png"></img>
      </button>
      </div>
      {errorMsg && <h3>{errorMsg}</h3>}

      {/* cat select window */}
      {open ?       
        <div id='popUpBox'>
        <div id='saleText'><img id='catImg2' src={catURL}></img></div>

        <div id='catInfo'>
          <div>Name: <span id="catText">{faker.name.firstName()}</span></div>
          <div>Location: <span id="catText">{faker.address.cityName()}</span></div>
          <div>Price: <span id="catText">{faker.finance.amount(50, 100, 0, '£')}</span></div>
        </div>

        <div>
          <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleClose()}>
            <h1 id='headerStyle'>❌</h1>
          </button>
          <button id='buttonStyling2' className='buttonStyleRemove2' onClick={() => handleBuy(catURL)}>
            <h1 id='headerStyle'>Add to Cart</h1>
          </button>

        </div>
      </div>
       : <div></div>}

      {/* cart window */}
      {openCart ? 
      <div id='popUpBox'>
        {cart.map((catUrl, index) => {
          return (
            <div>
            <img id='catImg' src = {catUrl}></img>
            <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleRemove(index)}>
            <h1 id='headerStyle'>REMOVE</h1>
            </button>
            </div>
          )
        })}
        <button id='buttonStyling' className='buttonStyleRemove' onClick={() => handleCartClick()}>
          <h1 id='headerStyle'>❌</h1>
        </button>
        <div id='headerStyle'>
          <button id='buttonStyling' className='buttonStyleRemove2' onClick={() => handleFinal()}>
            <h1 id='headerStyle2'>Proceed to Checkout</h1>
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

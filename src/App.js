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

        <div class="buttonsContainer">
          <button className='buttonLeave' onClick={() => handleClose()}>
            ❌
          </button>
          <button className='buttonAdd' onClick={() => handleBuy(catURL)}>
            Add to Cart
          </button>

        </div>
      </div>
       : <div></div>}

      {/* cart window */}
      {openCart ? 
        <div id='popUpBox'>
        {cart.map((catUrl, index) => {
          return (
            <div className="checkoutCatImages">
              <div><img className='checkoutCatImg' src = {catUrl}></img></div>
              <div>
                <button className='checkoutRemove' onClick={() => handleRemove(index)}>
                remove
                </button>
              </div>
            </div>
          )
        })}


        <button className='checkoutLeave' onClick={() => handleCartClick()}>
          ❌
        </button>
        <div className='checkoutHolder'>
          <button className='checkoutProceed' onClick={() => handleFinal()}>
            Proceed to Checkout
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


var year = new Date().getFullYear();
var date = `&copy; Created By: Damien Lewis, Joe Burns, Kim Wong, Andy Harper. ${year} All Rights Reserved.`;

document.getElementsByTagName('footer')[0].innerHTML = date;

export default App;

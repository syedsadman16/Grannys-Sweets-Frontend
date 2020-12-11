import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DishForm.scss";
import { useSelector } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  const DishForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [special,setSpecial] = useState(false);
    const [keyWord, setKeyWord] = useState([]);
    const [allkeyWord, setAllKeyWord] = useState(["Sweet","Cake","Breakfast","Lunch","Dinner"]);
    const [currWord, setcurrKeyWord] = useState("");
    const [price, setPrice] = useState("");
    const [open,setOpen] = useState(false);
    const id = useSelector(({ user }) => user.id);
  
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    function handleNameChange(e) {
      setName(e.target.value);
    }

    const handleDescriptionChange = (e) =>{
      setDescription(e.target.value);
    }

    const handleImageUrlChange = (e) =>{
      setImageUrl(e.target.value);
    }

    const handlePriceChange = (e) =>{
      setPrice(e.target.value);
    }

    const handleSpecialChange = (e) =>{
      setSpecial(e.target.value);
    }

    const handleKeyword = (e) => {
      e.persist();
      console.log(keyWord.includes(e.target.value));
      if (keyWord.includes(e.target.value)) {
        setKeyWord((prev) => prev.filter((word) => word != e.target.value));
      } else {
        setKeyWord((word) => [...word, e.target.value]);
      }
      console.log(keyWord);
    };
    
    const handleSubmission = async (e) =>{
      e.preventDefault();
      // console.log(keyWord);
      // console.log(id);
      // console.log(price);
      // console.log(description);
      setOpen(true);
      if (keyWord.length != 0){
        try {
          let { data } = await axios.post("/menu",{
            chef : {id},
            price : price,
            description : description,
            imageUrl : imageUrl,
            name : name,
            special : special
          })
          
          try{
            keyWord.map(async word => {
              await axios.post("/keyword",  {
                keyWord : word,
                dish : {id: data.id},
                chef : {id : id}
              })}
            )
          }catch (error) {}
          
          console.log(data)  
        }catch (error) {}
      }
      
    };
    
    const handleCurrkeyword = (e) =>{
      setcurrKeyWord(e.target.value);
    }

    const handleAddKeyword = (e) =>{
      e.persist();
      e.preventDefault();
      if (currWord != ""){
        setAllKeyWord(prev => [...prev,currWord]);
      }
      
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    return(
  
      <div class = "box">
        <form className="DishForm" onSubmit = {handleSubmission}>  
            <h1 class = "logo" align = "center">
            </h1>
                 
            {console.log(keyWord)}
            {console.log(allkeyWord)}
            {console.log(currWord)}
            <br></br>
            <div class = "input-container" >
              <input name="Name"
              id = "Name"
              value = {name}
              onChange = {handleNameChange}
              required/>
              <label htmlFor = "Name">Dish Name</label>
            </div>
            <br></br>

            
            <div class = "input-container" align = "center">
              <section align = "center">
                <input 
                  name="Description" 
                  id = "Description" 
                  value = {description}
                  onChange = {handleDescriptionChange}
                  required/>
                <label htmlFor = "Description"> Enter your Dish's Description</label>
              </section>
            </div>
            <br></br>

            
  

            <section>
              <label htmlFor = "isSpecial">Special Type</label>
              <select name="isSpecial" 
              id = "isSpecial"
              value = {special}
              onChange = {handleSpecialChange}
              required>
                <option value = {false}>Not Special</option>
                <option value = {true}>Special</option>
              </select>
            </section>

            <br></br>
            <div class = "input-container" align = "center">
              <section align = "center">

                <input name="image" 
                id = "image" 
                value = {imageUrl}
                onChange = {handleImageUrlChange}
                required />
                <label htmlFor = "image">Enter a valid image URL </label>
              </section>
            </div>
            
            <br></br>


            <div class = "input-container" align = "center">
              <section align = "center">
                <input type = "number" 
                name="price" 
                id = "price"
                min = "0.00" 
                step = "0.50"
                value = {price}
                onChange = {handlePriceChange}
                required/>
                <label htmlFor = "price">Price: </label>
              </section>
            </div>
            

            <br></br>
            
          <section align = "center">
            <span>Give your Dish Some Keywords for people to find it :  (check at least one)</span>
            <br></br>

            {allkeyWord.map(word => 
              <>
              <label align = "center" class="custom-checkbox" htmlFor = {word}> {word} 
              <input type="checkbox"  name = {word} id = {word} value = {word} onChange = {handleKeyword}/>
              <span class="checkmark"></span>
              </label>
              </>
              )}
          </section>

              <br></br>
              
          <div class = "input-container" align = "center">
            <section>
              <input name="other" id = "other"  onChange = {handleCurrkeyword} value = {currWord} />
              <label htmlFor = "other">Other keywords: </label>
            </section>
          </div>

          <section align = "center">
              <button className="dishform-btn"  onClick={handleAddKeyword}>
                Add Keywords
              </button>
          </section>
          <br></br>

          <section align = "center">
            <input type="submit" />
          </section>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>
            
        </form>
      </div>
        
  
        
    );

}

export default DishForm;
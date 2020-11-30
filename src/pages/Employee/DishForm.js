import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DishForm.css";
import { useSelector } from "react-redux";
import { faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  const DishForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [special,setSpecial] = useState(false);
    const [keyWord, setKeyWord] = useState([]);
    const [allkeyWord, setAllKeyWord] = useState(["sweet","cake","Breakfast","Lunch","Dinner"]);
    const [currWord, setcurrKeyWord] = useState("");
    const [price, setPrice] = useState("");
    const id = useSelector(({ user }) => user.id);

    
    const handleNameChange = (e) =>{
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

    return(
  

        <form className="DishForm" onSubmit = {handleSubmission}>  
            <h1 align = "center">
            <FontAwesomeIcon icon={faUtensils} color="gray" />
              Make your dish!!!
            <FontAwesomeIcon icon={faUtensils} color="gray"/></h1>
                 
            {console.log(keyWord)}
            {console.log(allkeyWord)}
            {console.log(currWord)}

            <section align = "center">
              <label htmlFor = "Name">Dish Name : </label>
              <br></br>
              <input name="Name" 
              id = "Name" 
              value = {name}
              onChange = {handleNameChange}
              required/>
            </section>
            <br></br>

            <section align = "center">
              <label htmlFor = "Description">Description : </label>
              <br></br>
              <textarea 
              name="Description" 
              id = "Description" 
              placeholder = "Enter your Dish's Description"
              value = {description}
              onChange = {handleDescriptionChange}
              required/>
            </section>
            <br></br>

            <section align = "center">
              <label htmlFor = "isSpecial">Special Type</label>
              <br></br>              
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

            <section align = "center">
              <label htmlFor = "image">Image URL : </label>
              <br></br>
              <input name="image" 
              id = "image" 
              placeholder = "Enter a valid image URL for your Dish"
              value = {imageUrl}
              onChange = {handleImageUrlChange}
              required />
            </section>
            <br></br>

            <section align = "center">
              <label htmlFor = "price">Price</label>
              <br></br>
              <input type = "number" 
              name="price" 
              id = "price"
              min = "0.00" 
              step = "0.50"
              placeholder = "0.00"
              value = {price}
              onChange = {handlePriceChange}
              required/>
            </section>
            <br></br>
            
          <section align = "center">
            <span>Give your Dish Some Keywords for people to find it :  (check at least one)</span>
            <br></br>

            {/* <input type="checkbox" name = "sweet" id = "sweet" value = "sweet" onChange = {handleKeyword}/>
            <label htmlFor = "sweet"> sweet </label>
            <input type="checkbox" name = "cake" id = "cake" value = "cake" onChange = {handleKeyword}/>
            <label htmlFor = "cake"> cake </label>
            <input type="checkbox" name = "Breakfast" id = "BreakFast" value = "BreakFast" onChange = {handleKeyword}/>
            <label htmlFor = "BreakFast"> BreakFast </label>
            <input type="checkbox" name = "Lunch" id = "Lunch" value = "Lunch" onChange = {handleKeyword}/>
            <label htmlFor = "Lunch"> Lunch </label>
            <input type="checkbox" name = "Dinner" id = "Dinner" value = "Dinner" onChange = {handleKeyword}/>
            <label htmlFor = "Dinner"> Dinner </label>
            <br></br> */}

            {allkeyWord.map(word => 
              <>
              <label htmlFor = {word}> {word} </label>
              <input type="checkbox" name = {word} id = {word} value = {word} onChange = {handleKeyword}/>
              </>
              )}
          

              <label htmlFor = "other">Other : </label>
              <br></br>
              <input name="other" id = "other"  onChange = {handleCurrkeyword} value = {currWord} placeholder = "Other keywords" />
              <br></br>
              <button  onClick={handleAddKeyword}>
                Add Keywords
            </button>
            

          </section>
          <br></br>

          <section align = "center">
            <input type="submit" />
          </section>
            
        </form>
  
        
    );

}

export default DishForm;
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./DishForm.css";

function DishForm(){

    const [jobs, setJobs] = useState([]);

   
    const url = '/jobs/delivery';
    useEffect( () => {
      async function testing() {
        const jobsapi = await axios.get(url);
        setJobs(jobsapi.data);
        return jobsapi;
      }
      testing();
    }, [url]);

    console.log(jobs);
    return(
        
        <div>

          <form>
            <button type="submit">Make the Dish!</button>
            <hr></hr>
            <section>
                <label for="dishName">How many patties would you like?</label>
                <input type = "text" name = "dishName" id = "dishName" ></input>
            </section>
            
          </form>
        </div>
        
    );

}

export default DishForm;
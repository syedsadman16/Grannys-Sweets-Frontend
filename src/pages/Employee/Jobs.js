import axios from "axios";
import React, { useState, useEffect } from "react";

function Jobs(){

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
            {
            jobs.map( job => (
                <div> 
                  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{job.id} </span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
                
                </div>
                
            ))}

        </div>

    );

}

export default Jobs;
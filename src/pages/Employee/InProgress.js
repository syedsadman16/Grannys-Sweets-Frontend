import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./Employee.css";

function InProgress(){

    const [jobs, setJobs] = useState([]);
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      });
    const classes = useStyles();

      
    const url = '/jobs/delivery';
    useEffect( () => {
      testing();
    }, [url]);


    async function testing() {
      const jobsapi = await axios.get(url);
      setJobs(jobsapi.data);
      return jobsapi;
    }

    function cancelJob(orderId){
      const url = '/jobs/delivery/cancelJob/'+orderId;
      console.log(url);
      try{
        axios.post(url);
        setJobs(axios.get('/jobs/delivery'));
      }
      catch(E){console.log(E)}
    }

    function completedJob(orderId){
        const url = '/jobs/delivery/completed/'+orderId;
        console.log(url);
        try{
          axios.post(url);
          setJobs(axios.get('/jobs/delivery'));
        }
        catch(E){console.log(E)}
      }

    return(
        <div>
        <div className="page-desc-text">You are currently assigned the following Jobs:</div>

            {
            jobs.length ?  
              jobs.map( job => {
                if(job.status == 1)
                return(
                  <div> 
                      <Card className={classes.root}>
                      <CardActionArea>
                          <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              Job Reference# {job.id}
                          </Typography>
                          <h6 variant="body2" color="textSecondary" component="p">
                              Order # {job.order.id}
                              </h6>
                          <h6> Date: {job.order.date} </h6>
                          <h6> Customer: {job.order.customer.username} </h6>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button size="small" color="primary" onClick={() => cancelJob(job.id)}>
                          Cancel Job
                          </Button>
                          <Button size="small" color="primary" onClick={() => completedJob(job.id)}>
                          Completed Job
                          </Button>
                      </CardActions>
                      </Card>
                  </div>
              )})
            : 
            <h3>You have not accepted any jobs. Visit the Job Center to get started!</h3>
        }
        </div>

    );

}

export default InProgress;
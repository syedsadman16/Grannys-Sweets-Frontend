import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from "@material-ui/core/";
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux";
import "./Employee.css";

function InProgress(){
    const username = useSelector(({ user }) => user.username);
    const [jobs, setJobs] = useState([]);
    const useStyles = makeStyles({
      gridContainer:{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop : "20px",
        paddingBottom : "20px",
        marginLeft : "20px",
        marginRight : "20px",
        marginTop : "20px",
        marginBottom : "20px"
      },
        root: {
          maxWidth: 345,
          width : 320
        },
        media: {
          height: 140,
        },
      });
    const classes = useStyles();
    const history = useHistory();

      
    const url = '/jobs/delivery';
    useEffect( () => {
      testing();
    }, [url]);


    async function testing() {
      const jobsapi = await axios.get(url);
      setJobs(jobsapi.data.filter(a => (
        a.order.deliveryPerson != null && a.order.deliveryPerson.username == username
      )))
      return jobsapi;
    }

    function cancelJob(orderId){
      const url = '/jobs/delivery/cancelJob/'+orderId;
      console.log(url);
      try{
        axios.post(url);
        testing();
        history.go(0);
      }
      catch(E){console.log(E)}
    }

    function completedJob(orderId){
        const url = '/jobs/delivery/completed/'+orderId;
        console.log(url);
        try{
          axios.post(url);
          testing();
          history.go(0);
        }
        catch(E){console.log(E)}
      }

    return(
        <div>
        <div className="page-desc-text">You are currently assigned the following Jobs:</div>

            {
            jobs.length ? 
            <Grid container 
              direction = "row"
              justify = "center"
              allignItems = "center"
              spacing = {4} >
                {jobs.map( job => {
                if(job.status == 1 && job.order.type == 1)
                return(
                  <Grid className = {classes.gridContainer}>
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
                          <h6> Ordered By: {job.order.customer.username} </h6>     
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button size="small" color="primary" onClick={() => cancelJob(job.id)}>
                          Cancel Job
                          </Button>
                          <Button size="small" color="primary" onClick={() => completedJob(job.id)}>
                          Complete Job
                          </Button>
                      </CardActions>
                      </Card>
                  </Grid>        
              )})}
              </Grid>
              
            : 
            <h3>...</h3>
        }
        </div>

    );

}

export default InProgress;
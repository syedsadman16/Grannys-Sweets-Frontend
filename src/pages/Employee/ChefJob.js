import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ChefJob = () =>{
    const [chefJob,setChefJob] = useState([]);
    const history = useHistory();


    // const getJobs = async() =>{
    //     try{
    //         let{
    //             data : jobs
    //         } = await axios.get("/jobs/chefJob/false");
    //         setChefJob(jobs);
    //         console.log(jobs);
    //     }catch(error){console.log(error)};
    // }
    const url = "/jobs/chefJob/false"
    const loadData = async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      try {
    
        axios.get(url, { cancelToken: source.token }).then(element => 
        {
            console.log(element.data);
          //  console.log(element.data.order.id);
            let newData = element.data.map((element) =>({
                jobId : element.id,
                jobStatus : element.completed,
                orderId : element.order.id,
                orderTime : element.order.date,
                customerName: element.order.customer.username,
                quantity : element.order.dishOrders[0].quantity,
                dishName : element.order.dishOrders[0].dish.name,
                dishImage : element.order.dishOrders[0].dish.imageUrl
            }))
          setChefJob( newData);
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
        return () => {
          source.cancel();
        }
      
      };
    };


    useEffect(() => {
        
      loadData();
    
  }, []);

    
    // async function testing() {
    //     const jobsapi = await axios.get(url);
    //     setChefJob(jobsapi.data);
    //     return jobsapi;
    //   }
  
    //   const url = '/jobs/chefJob/false';
    //   useEffect( () => {
    //     testing();
    //   }, [url]);
  
      console.log(chefJob);


    const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 175,
    },
    });

    const classes = useStyles();
    
    const handleComplete = async (id) => {
        const url = "/jobs/chefJob/" + id;
        console.log(url);
        try{
            axios.post(url);
            history.go(0);
            loadData();
        }catch(error){console.log(error)}

    }



  return (
      <div>
        {
          chefJob.map(job => {
            if (job.jobStatus === false)
                return(
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={job.dishImage}
                            title="dish"   //name of the dish goes here
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Job Reference # {job.jobId}
                            </Typography>
                            <h6 variant="body2" color="textSecondary" component="p">
                                Order # {job.orderId}
                            </h6>
                            <h6> Date: {job.orderTime} </h6>
                            <h6> Dish: {job.dishName}  ||  QTY. {job.quantity} </h6>
                            <h6> Ordered By: {job.customerName}</h6>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick = { () => handleComplete(job.jobId)}>
                                Mark Completed!
                            </Button>
                        </CardActions>
                    </Card>

                )
          })

        }

        </div>
    
  );

};

export default ChefJob;
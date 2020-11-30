import axios from "axios";
import React, { useState, useEffect } from "react";
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


    // const getJobs = async() =>{
    //     try{
    //         let{
    //             data : jobs
    //         } = await axios.get("/jobs/chefJob/false");
    //         setChefJob(jobs);
    //         console.log(jobs);
    //     }catch(error){console.log(error)};
    // }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
    
        const loadData = () => {
          try {
            axios.get("/jobs/chefJob/false", { cancelToken: source.token }).then(element => 
            {
                console.log(element.data);
                let newData = element.data.map((element) =>({
                    jobId : element.id,
                    jobStatus : element.completed,
                    orderTime : element.order.date,
                    quantity: element.order.dishOrders[0].quantity,
                    dishName: element.order.dishOrders[0].dish.name
                }))
              setChefJob(prev => [...prev,...newData]);
            });
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("cancelled");
            } else {
              throw error;
            }
          }
        };
    loadData();
    return () => {
      source.cancel();
    };
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



  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg"
          title="dish"   //name of the dish goes here
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Mark Completed!
        </Button>
      </CardActions>
    </Card>
  );

};

export default ChefJob;
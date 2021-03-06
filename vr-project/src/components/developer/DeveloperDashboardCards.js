import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 385,
  },
  flex: {
    flexGrow: 1,
  },
  media: {
    height: 180,
  },
});

const dashboardData = [
    {
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      company: "Jungle George",
      style: "Meditate with tons of confusing lines of code.",
      funding: "$12,593 to go!",

  },
  {
      img: "https://images.pexels.com/photos/4009621/pexels-photo-4009621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      company: "Jungle George",
      style: "Cheap Date Night Simulator.",
      funding: "$32,155 to go!",

  },
]

export default function DeveloperDashboardCards() {
  const params = useParams();
  const history = useHistory();
  const id = params.id
  const [projects, setProjects] = useState([]);
  useEffect(() => {
      axiosWithAuth() 
      .get(`/api/entrepreneur/${id}/projects`)
      .then(response => {
        console.log("Public Projects Axios Get", response);
        setProjects(response.data)
      })
      .catch(err => {
        console.error("Server Error", err);
      });
  }, [])


  const classes = useStyles();

  const handleDelete = (userId) => {
    axiosWithAuth()
      .delete(`/api/entrepreneur/projects/${userId}`)
      .then(res => {
        console.log("user was deleted", res)
        window.location.reload();
      })
      .catch(err => {
        console.log("Unable to delete", err)
      })
  }

  return (
      <div style={{margin: "6%", marginTop: "1%"}} >
          
          <div className={classes.flex}>
          <h2 style={{color: "white", marginBottom: "4%", marginLeft: "auto"}}>Your Projects</h2>
    <Grid container spacing={6} direction="row" display="flex" justify="space-between" align="center">
    {projects.map(comp => {
      console.log(comp)
              return(
 
             <Grid item xs>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={comp.img}
          title={comp.projectNames}
        />
        <CardContent>
          <Typography style={{fontSize: "1.1rem"}} gutterBottom variant="h5" component="h3">
            {comp.projectName}
          </Typography>
          {/* <Typography style={{fontSize: "0.8rem"}} variant="body2" color="textSecondary" component="p">
          {comp.style}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>{history.push(`/developer-dashboard/project/${comp.id}`)}} size="small" color="primary">
          Edit
        </Button>
        <Button onClick={()=>{handleDelete(comp.id)}} size="small" color="primary">
          Delete
        </Button>
        <Button size="small" color="primary">
          {comp.fundingAmount} to go!
        </Button>
      </CardActions>
    </Card>
    </Grid>
    )})}
          
          
          
          
          {/* {dashboardData.map(comp => {
              return(
 
             <Grid item xs>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={comp.img}
          title={comp.company}
        />
        <CardContent>
          <Typography style={{fontSize: "1.1rem"}} gutterBottom variant="h5" component="h3">
            {comp.company}
          </Typography>
          <Typography style={{fontSize: "0.8rem"}} variant="body2" color="textSecondary" component="p">
          {comp.style}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          {comp.funding}
        </Button>
      </CardActions>
    </Card>
    </Grid>
    )})} */}
    </Grid>
    </div>
    </div>
  );
}

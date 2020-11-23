import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 350,
    cursor: "pointer",
    boxShadow: "0 10px 6px -6px #777",
    borderRadius:"10%"
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    margin: "15px",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  header: {
    color: "red",
    fontSize: "24px",
    fontWeight: 600,
  },
}));

export default function BookCard({ data, handleClick }) {
  const classes = useStyles();
  console.log("data", data);
  if (data) {
    var { name, author, category, year, image, _id } = data;
  }

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} onClick={() => handleClick(_id)}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.header}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Author: {author}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Category: {category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {year}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
    cursor: "pointer",
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    margin: "20px",
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

export default function SongsCard({ data }) {
  const classes = useStyles();
  console.log("category", data);
  if (data) {
    var { name, chapters, img } = data;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src="https://via.placeholder.com/150"
              />
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
                 CHAPTERS
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

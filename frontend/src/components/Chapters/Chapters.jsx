import React, { useEffect, useState } from "react";
import ChaptersCard from "./ChaptersCard";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setChaptersData } from "../../redux/App/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  divContainer: {
    margin: "20px",
  },
}));

export default function Chapters(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chaptersData = useSelector((state) => state.app.chaptersData) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: `http://localhost:8000/api/book/` + props.match.params.id,
    })
      .then((res) => dispatch(setChaptersData(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div>
      {chaptersData.chapters &&
        chaptersData.chapters.map((item, id) => (
          <div key={id} className={classes.divContainer}>
            <ChaptersCard data={item} />
          </div>
        ))}
    </div>
  );
}

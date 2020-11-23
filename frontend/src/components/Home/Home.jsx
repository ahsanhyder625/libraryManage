import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setBookData } from "../../redux/App/actions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchBar from "./SearchBar";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    background: "#EEEEEE",
  },
  divContainer: {
    margin: "20px",
    width: "800px",
  },
  paper: {
    height: "300px",
    margin: "20px",
    textAlign: "center",
    borderRadius:"8%",
    color:"#FF0000",
    padding:"5px"
  },
  formControl: {
    margin: theme.spacing(0),
    width: 180,
    height:60,
    textAlign: "left",
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("null");

  const bookData = useSelector((state) => state.app.bookData) || [];
  const dispatch = useDispatch();


  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: "http://localhost:8000/api/getBooks",
    })
      .then((res) => dispatch(setBookData(res.data)))
      .catch((error) => console.log(error));
  }, [dispatch]);


  const handleClick = (_id) => {
    history.push(`/chapters/${_id}`);
  };

  const handleChange = (e) => {
    const type = e.target.value;
    console.log("type", type);
    setType(type);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    console.log("sort", sort);
    setSort(sort);
  };

  console.log("Bookata1", bookData[0]);
  return (
    <>
      <Grid className={classes.root}>
        <Grid>
          {bookData &&
            bookData
              .filter((item) => {
                if (type === "all") {
                  return true;
                }
                return type === item.category;
              })
              .sort((a, b) => {
                if (sort === "null") {
                  return 0;
                }
                if (sort === "asc") {
                  return a.year - b.year;
                } else if (sort === "desc") {
                  return b.year - a.year;
                }
              })
              .map((item, id) => (
                <div key={id} className={classes.divContainer}>
                  <BookCard data={item} handleClick={handleClick} />
                </div>
              ))}
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <h4>Filter By Type</h4>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Filter By Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                label="Filter by Type"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
              </Select>
            </FormControl>
            <h4>Sort by Category</h4>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Sort by Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleSort}
                label="Sort by category"
              >
                <MenuItem value="null">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setBookData } from '../../redux/App/actions';
import SearchBar from "../Home/SearchBar";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        outline: 'none',
        position: 'relative',
        flexWrap: 'wrap',
        marginLeft: "auto",
        backgroundColor: "#889B2F ",
        color: "white"
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const bookData = useSelector((state) => state.app.bookData) || [];


    useEffect(() => {
        if (query === "") {
          setSuggestions([]);
        } else {
          let out = bookData
            .filter((item) =>
              item.name.toLowerCase().indexOf(query) !== -1 ? true : false
            )
            .map((item) => item.name);
          console.log(out);
          setSuggestions(out);
        }
        setLoading(false);
      }, [query]);

    return (
        <React.Fragment>
           <Toolbar className={classes.toolbar}>
                <MenuList className={classes.toolbar}>
                <MenuItem >
                <div className={classes.divContainer} style={{"color": "black"}}>
                        <SearchBar
                        loading={loading}
                        setLoading={setLoading}
                        value={query}
                        onChange={(val) => setQuery(val)}
                        suggestions={suggestions}
                        />
                 </div>
                    </MenuItem>    
                <MenuItem component={Link} to="/">
                        Home
                    </MenuItem>
                    <MenuItem component={Link} to="/admin">
                        Admin
                    </MenuItem>
                </MenuList>
            </Toolbar>
        </React.Fragment>
    );
};

export default Navbar;

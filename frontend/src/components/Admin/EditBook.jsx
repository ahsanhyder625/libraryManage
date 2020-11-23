import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function EditBook(props) {
  console.log(props);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: `http://localhost:8000/api/books/${props.match.params.id}`,
    })
      .then((res) => {
        return (
          setId(res.data._id),
          setName(res.data.name),
          setAuthor(res.data.author),
          setCategory(res.data.category),
          setYear(res.data.year)
        );
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleUpdate = () => {
    let payload = {
      name: name,
      author: author,
      category: category,
      year: year,
    };

    let config = {
      method: "post",
      url: `http://localhost:8000/api/book/update/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    axios(config)
      .then((res) => {
        props.history.push("/admin");
      })
      .catch((err) => alert(err));
  };

  return (
    <div style={{ margin: "auto", width: 350, position: "relative", top: 100 }}>
      <form>
        <h2>Edit Page</h2>
        <div>
          <TextField
            style={{ width: 350, margin: 5 }}
            onChange={handleNameChange}
            name="name"
            value={name}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            style={{ width: 350, margin: 5 }}
            onChange={handleAuthorChange}
            name="name"
            value={author}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            style={{ width: 350, margin: 5 }}
            onChange={handleCategoryChange}
            name="category"
            value={category}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            style={{ width: 350, margin: 5 }}
            onChange={handleYearChange}
            name="year"
            value={year}
            id="outlined-basic"
            variant="outlined"
          />
        </div>

        <div>
          <Button
            onClick={handleUpdate}
            style={{ marginLeft: 5 }}
            variant="contained"
            color="primary"
          >
            UPDATE
          </Button>
        </div>
      </form>
    </div>
  );
}
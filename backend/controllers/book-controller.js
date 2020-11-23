const Book = require('../models/Book')

const getBooks = (req, res) => {
    const sortBy = req.query.sortBy;
    let sortCriteria = req.query.sortCriteria;
    let filterBy = '';
    if (req.query.filterBy) filterBy = req.query.filterBy;
    console.log(sortBy, sortCriteria, filterBy);
    Book.find()
        .then((books) => {
            //first task is filter
            if (filterBy !== '') {
                books = books.filter((item) => {
                    // console.log(item.type);
                    if (item.category === filterBy) {
                        return item;
                    }
                });
            }
            //sort the filtered data
            books.sort((a,b) => {
                console.log(sortCriteria)
                if(sortBy === "asc"){
                    console.log(a[sortCriteria])
                    return a[sortCriteria] - b[sortCriteria]
                }
                else if(sortBy === "desc"){
                    return b[sortCriteria] - a[sortCriteria]
                    
                }
                
            })
            res.json(books);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
};

const getBook= (req, res) => {
    Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error: " + err))
}

  const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json("Book Deleted Successfully"))
      .catch((err) => res.status(400).json("Error: " + err));
}

const editBook = (req, res) => {
    Book.findById(req.params.id)
      .then((book) => {
        book.name = req.body.name;
        book.author = req.body.author;
        book.category = req.body.category;
        book.year = req.body.year;
  
        book
          .save()
          .then(() => res.json("Book updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
}

module.exports = { getBooks, getBook, deleteBook, editBook }
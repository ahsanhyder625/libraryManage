const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const { getBooks, getBook, deleteBook, editBook } = require('../controllers/book-controller');

router.get('/getBooks', getBooks);
router.get('/book/:id', getBook);
router.delete('/book/:id', deleteBook);
router.post('/book/update/:id', editBook);

module.exports = router;

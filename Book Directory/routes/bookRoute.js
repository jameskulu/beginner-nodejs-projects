const router = require('express').Router()
const Book = require('../models/Book')


// Get all the books
router.get('',async(req,res)=>{
    try{
        const books = await Book.find({})
        res.status(200).json({
            data:books
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
})


// Get a single book
router.get('/:bookId',async(req,res)=>{
    const bookId = req.params.bookId
    try{
        const book = await Book.findById(bookId)
        res.status(200).json({
            data : book
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
})


// Add a new book
router.post('/new', async(req , res)=>{

    const {book_name,description,price,author} = req.body


    if (!book_name || !description || !price || !author) {
        return res.status(400).json({ msg: "Not all fields are inserted" });
      }

    const book = new Book({
        book_name,
        description,
        price,
        author
      });


    try{
        const savedBook = await book.save()
        res.status(200).json({
            data:savedBook
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
})



// Update existing book
router.put('/update/:bookId', async(req , res)=>{

    const bookId = req.params.bookId
    const data = req.body;

    try{
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            data, 
            {new: true}
        )
        res.status(200).json({
            data:updatedBook
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
})


// Deleting existing book
router.delete('/delete/:bookId', async(req , res)=>{

    const bookId = req.params.bookId

    try{
        const deletedBook = await Book.findByIdAndDelete(bookId)
        res.status(200).json({
            data:deletedBook
        })
    }
    catch(err){
        res.status(400).json({
            msg:err
        })
    }
})



module.exports = router

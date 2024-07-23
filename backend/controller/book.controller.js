import Book from "../model/book.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const searchBooks = async (req, res) => {
    try {
      const query = req.query.query;
      const books = await Book.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
          { language: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } }
        ]
      });
      res.status(200).json(books);
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const addBook = async (req, res) => {
    try {
        const { title, author, description, genre, image, condition,language,price, age, binding, isSold, userSold} = req.body;

        const newBook = new Book({
            title,
            author,
            description,
            genre,
            image,
            condition,
            language,
            price,
            age,
            binding,
            isSold,
            userSold

        });

        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const buyBook = async (req, res) => {
  try {
      const bookId = req.body.bookId;
      const userId = req.body.userId;
      const address = req.body.address;
      const book = await Book.findById(
          bookId);
          book.userBuy.push(userId);
          book.address.push(address);    
          await book.save();
      res.status(200).json(book);
  } catch (error) {
      console.error('Error buying book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

export const setSold = async (req, res) => {
  try {
      const bookId = req.body.bookId;
      const book = await Book.findById(
          bookId);
          book.isSold=1;    
          await book.save();
      res.status(200).json(book);
  } catch (error) {
      console.error('Error buying book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}



export const userSold = async (req, res) => {
  try {
    const userId = req.query.userSold; 
    const books = await Book.find({ userSold: userId });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books' });
  }
}

// export const userBuy = async (req, res) => {
//   try {
//     const userId = req.query.userBuy; 
//     const books = await Book.find({ userBuy: userId });
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// };

export const getBmk = async (req, res) => {
  const idsString = req.query.ids;
    if (!idsString) {
        return res.status(400).json({ message: 'Missing ids parameter' });
    }
    const idsArray = idsString.split(',');
  try {
    const { ids } = req.query.ids;
    console.log(ids);
    const books = await Book.find({ _id: { $in: idsArray } });
    res.json(books);
  } catch (error) {
      console.error('Error buying book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
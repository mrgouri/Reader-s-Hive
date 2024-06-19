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
      const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { userBuy: userId, isSold: 1, address: address },
          { new: true }
      );

      res.status(200).json(updatedBook);
  } catch (error) {
      console.error('Error buying book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

// export const userSold = async (req, res) => {
//   try {
//     const userId = req.body.userId; 
    
//     let filter = {};
//     if (userId) {
//       filter = { userSold: userId }; 
//     }

//     const books = await Book.find(filter);
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// }

// export const userBuy = async (req, res) => {
//   try {
//     const userId = req.body.userId; 
    
//     let filter = {};
//     if (userId) {
//       filter = { userBuy: userId }; 
//     }

//     const books = await Book.find(filter);
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// };

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

export const userBuy = async (req, res) => {
  try {
    const userId = req.query.userBuy; 
    const books = await Book.find({ userBuy: userId });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};
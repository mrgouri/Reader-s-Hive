import express from 'express';
import { getBooks, searchBooks, addBook, buyBook, userSold, userBuy} from '../controller/book.controller.js';

const router = express.Router();

router.put("/buy", buyBook);
router.get("/search", searchBooks);
router.get("/userSold", userSold);
router.get("/userBuy", userBuy);
router.get("/", getBooks);
router.post('/add', addBook);



export default router;

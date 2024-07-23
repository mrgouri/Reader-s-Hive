import express from 'express';
import { getBooks, searchBooks, addBook, buyBook, userSold, getBmk, setSold} from '../controller/book.controller.js';

const router = express.Router();

router.put("/buy", buyBook);
router.put("/setSold", setSold);
router.get("/search", searchBooks);
router.get("/getBmk", getBmk);
router.get("/userSold", userSold);

router.get("/", getBooks);
router.post('/add', addBook);



export default router;

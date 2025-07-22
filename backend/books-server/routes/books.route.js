import express from "express";
import booksCtrl from "../controllers/books.controller.js";
import {authenticateJWT}  from "../../shared/auth.middleware.js";


const router = express.Router();

//Public routes
router.route('/:id').get(booksCtrl.apiGetBook);
router.route('/textbooks').get(booksCtrl.apiGetBooks);


export default router;
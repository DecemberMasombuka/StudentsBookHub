import express from "express";
import booksCtrl from "../controllers/books.controller.js";
import {authenticateJWT}  from "../../shared/auth.middleware.js";


const router = express.Router();

//Public routes
router.route('/textbooks').get(booksCtrl.apiGetBooks);
router.route('/categories').get(booksCtrl.apigetCatergories);
router.route('/:id').get(booksCtrl.apiGetBook);


//Protected Texbook Routes
router.route('/textbooks').post(authenticateJWT,booksCtrl.apiAddBook)

export default router;
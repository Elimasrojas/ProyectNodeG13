const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoriaController = require('../controllers/categoriaController');


router.get("/",authMiddleware,categoriaController.leerCategoria);

router.post("/",authMiddleware,categoriaController.crearCategoria);

router.put("/:id",authMiddleware,categoriaController.actualizarCategoria);

router.delete("/:id",authMiddleware,categoriaController.borrarCategoria);


module.exports = router
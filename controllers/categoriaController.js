const Categoria= require("../models/categoria")

exports.leerCategoria= async(req,res)=>{
    //res.json({mg: 'se ejecuto leer categoria'});
    try {
        const categoria= await Categoria.find({creador: req.usuario.id});
        res.json({categoria})
    } catch (error) {
        console.log(error);
    }

}
exports.crearCategoria= async(req,res)=>{
    //res.json({mg: 'se ejecuto crea categoria'});
    try {
        //leer el body
        //req es lo podemos llerer desde posman
        //lo que enviamos al front
        const categoria= new Categoria(req.body);
        categoria.creador = req.usuario.id;

        categoria.save();
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
}
exports.actualizarCategoria= async(req,res)=>{
    //res.json({mg: 'se ejecuto actualizar categoria'});
    const {id} =req.params;
    const categoria=await Categoria.findById(id);
    if(!categoria){
        return res.status(400).json({msg: "categoria no encontrada"});
    }
    if(categoria.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({msg: "Accion no validad para este usuario"});
    }
    categoria.nombre= req.body.nombre || categoria.nombre;
    categoria.save();
    res.json({ categoria})
}
exports.borrarCategoria= async(req,res)=>{
    //res.json({mg: 'se ejecuto borrar categoria'});
    try {
        const {id} =req.params;
        const categoria=await Categoria.findById(id);
        //const categoria = await Categoria.deleteOne({_id: req.params.id});
        
        if(!categoria){
            return res.status(400).json({msg: "categoria no encontrada"});
        }
        console.log(categoria.id)
        if(categoria.creador.toString() !== req.usuario.id.toString()){
            return res.status(400).json({msg: "Accion no validad para este usuario"});
        }
        await Categoria.deleteOne({_id: categoria.id});
        res.json({mgs: "categoria eliminada"});
    } catch (error) {
        console.log(error)
    }
}
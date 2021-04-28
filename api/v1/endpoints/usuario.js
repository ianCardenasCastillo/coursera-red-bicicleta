var Usuario = require('../../../models/usuario');

module.exports = ()=>({
    usuariosList: (req,res)=>{
        Usuario.find({},(err,usuarios)=>{
            res.status(200).json({
                usuarios: usuarios
            });
        })
        
    },
    usuariosCreate: (req,res)=>{
        var usuario = new Usuario({nombre: req.body.nombre});
        usuario.save((err)=>{
            res.status(200).json(usuario)
        })
    },
    usuariosReservar: (req,res)=>{
        Usuario.findById(req.body.id,(err,usuario)=>{
            console.log(usuario);
            usuario.reservar(req.body.bici_id,req.body.desde,req.body.hasta,()=>{
                console.log('reservado!');
                res.status(200).send();
            })
        })
    }
});
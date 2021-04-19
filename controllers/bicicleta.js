var Bicicleta = require('../models/bicicleta'); // Se importa la bicicleta

// exports.bicicletaList = (req,res)=>{
//     res.render('bicicletas/index',{bicis: Bicicleta.allBicis}); // Se renderiza el index de bicicleta con datos a bicis
// }

module.exports = ()=>({
    bicicletaList: (req,res)=>{
        res.render('bicicletas/index',{bicis: Bicicleta.allBicis}); // Se renderiza el index de bicicleta con datos a bicis
    },
    bicicletaCreateGet: (req,res)=>{
        res.render('bicicletas/create')
    },
    bicicletaCreatePost: (req,res)=>{
        var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo);
        bici.ubicacion=[req.body.lat,req.body.lng];
        Bicicleta.add(bici);
        res.redirect('/bicicletas')
    },
    bicicletaDelete:(req,res)=>{
       var id = req.params.id;
       Bicicleta.removeById(id);
       res.redirect('/bicicletas');
    },
    bicicletaUpdateGet: (req,res)=>{
        var bici = Bicicleta.findById(req.params.id)
        
        res.render('bicicletas/update',{bici:bici})
    },
    bicicletaUpdatePost:(req,res)=>{
        var bici = Bicicleta.findById(req.params.id)
        bici.id=req.body.id;
        bici.color=req.body.color;
        bici.modelo=req.body.modelo;
        bici.ubicacion=[req.body.lat,req.body.lng];
        res.redirect('/bicicletas');
    }
})
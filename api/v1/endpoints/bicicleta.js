var Bicicleta = require('../../../models/bicicleta');

module.exports = ()=>({
    bicicletaList:(req,res)=>{
        res.status(200).json({
            bicicletas:Bicicleta.allBicis
        });
    },
    bicicletaCreate:(req,res)=>{
        var bici = new Bicicleta(
            req.body.id,req.body.color,req.body.modelo
        )
        bici.ubicacion=[req.body.lat,req.body.lng];
        Bicicleta.add(bici)
        res.status(201).json({bicicleta:bici})
    },
    bicicletaDelete:(req,res)=>{
        let id = req.params.id;
        Bicicleta.removeById(id);
        res.status(204).send();
    },
    bicicletaUpdate:(req,res)=>{
        let id = req.params.id;
        let bici = Bicicleta.findById(id);
        bici.id=req.body.id;
        bici.color=req.body.color;
        bici.modelo=req.body.modelo;
        bici.ubicacion=[req.body.lat,req.body.lng];
        res.status(200).json({bicicleta:bici})
    }
})
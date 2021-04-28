var Bicicleta = require('../../../models/bicicleta');

module.exports = ()=>({
    bicicletaList:(req,res)=>{
        Bicicleta.find({},(err,bicis)=>{
            res.status(200).json({
                bicicletas: bicis
            });
        })
        
    },
    bicicletaCreate:(req,res)=>{
        var bici = new Bicicleta(
            {code:req.body.id,color:req.body.color,modelo:req.body.modelo}
        )
        bici.ubicacion=[req.body.lat,req.body.lng];
        Bicicleta.add(bici)
        res.status(201).json({bicicleta:bici})
    },
    bicicletaDelete:(req,res)=>{
        let id = req.params.id;
        Bicicleta.deleteOne({_id:id},(err,success)=>{
            res.status(204).send();
        })
    },
    bicicletaUpdate:async (req,res)=>{
        let id = req.params.id;
        var bici = new Bicicleta(
            {_id:id,code:req.body.code,color:req.body.color,modelo:req.body.modelo}
        )
        bici.ubicacion=[req.body.lat,req.body.lng];
        let doc = await Bicicleta.findOneAndUpdate({_id:id}, bici,{
            new: true
          });
        res.status(200).json({bicicleta:doc})
        
        
    }
})
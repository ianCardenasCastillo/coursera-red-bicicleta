
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion:{
        type: [Number], // Ubicación sera de tipo array de numner
        index: {type:'2dsphere', sparse: true} // Se creara un Indice de tipo geografico y como se implementara el indice
    }
})

bicicletaSchema.statics.createInstance = function (code,color,modelo,ubicacion) {
    return new this({
        code:code,
        color:color,
        modelo:modelo,
        ubicacion:ubicacion
    })
}
bicicletaSchema.statics.allBicis = function(cb){ // Function que se agrega directo al modelo
    return this.find({},cb)
}
bicicletaSchema.statics.add=function (bici,cb) {
    this.create(bici,cb)
}
bicicletaSchema.statics.findByCode=function(code,cb){
    return this.findOne({code:code},cb)
};
bicicletaSchema.statics.removeByCode=function(code,cb){
    return this.deleteOne({code:code},cb)
};


bicicletaSchema.methods.toString = function (){ // Metodos de Instancia del esquema
    return `id: ${this.id} | color: ${this.color}`;
}
module.exports=mongoose.model('Bicicleta',bicicletaSchema)

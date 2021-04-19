var Bicicleta = function (id,color,modelo,ubicacion){ // Constructor de la Bicicleta
    this.id=id;
    this.color=color;
    this.modelo=modelo;
    this.ubicacion=ubicacion;
}

Bicicleta.prototype.toString = function (){ // Función de toString de la Bicicleta
    return `id: ${this.id} | color: ${this.color}`;
}
Bicicleta.allBicis=[]; // Arreglo para guardar la bicicleta

Bicicleta.add=(addBici)=>{
    Bicicleta.allBicis.push(addBici);
}

Bicicleta.findById=(biciId)=>{
    let found = Bicicleta.allBicis.find(x=>x.id==biciId)
    if(found){
        return found;
    }
    else{
        throw new Error(`No existe una bicicleta con el id ${biciId}`)
    }
}

Bicicleta.removeById=(biciId)=>{
    var indexOf = Bicicleta.allBicis.findIndex(x=>x.id==biciId)
    console.log(indexOf)
    if(indexOf!=-1){
        Bicicleta.allBicis.splice(indexOf,1)
    }
    else{
        throw new Error(`No existe una bicicleta con el id ${biciId}`)
    }
}

var bici1= new Bicicleta(1,'rojo','urbana',[-34.601424,-58.3861497]);
var bici2= new Bicicleta(2,'blanca','urbana',[-34.596932,-58.3808287]);

Bicicleta.add(bici1);
Bicicleta.add(bici2);

module.exports = Bicicleta;
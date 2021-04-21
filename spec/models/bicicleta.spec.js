var Bicicleta = require('../../models/bicicleta');

describe('Bicicleta.allBicis',()=>{ // Grupo de Test
    it('comienza vacia',()=>{ // Que es lo que se quiere probar
        expect(Bicicleta.allBicis.length).toBe(0); // Validación
    });
});

describe('Bicicleta.add',()=>{
    it('agregamos una',()=>{
        var bici= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
        Bicicleta.add(bici)
        expect(Bicicleta.allBicis[0]).toBe(bici);
    });
});

describe('bicicleta.findById',()=>{
    it('debe devolver la bicicleta con id 1',()=>{
        var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
        var bici2= new Bicicleta(2,'azul','ciudad',[-33.4545163,-70.5978979]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);
        var found = Bicicleta.findById(1);
        expect(found.id).toBe(1)
        expect(found.color).toBe('rojo');
        expect(found.modelo).toBe('urbana');
    });
})

describe('Bicicleta.removeById',()=>{
    it('debele eliminar la bicicleta con el id 2',()=>{
        var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
        var bici2= new Bicicleta(2,'azul','ciudad',[-33.4545163,-70.5978979]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);
        Bicicleta.removeById(2);
        var found = Bicicleta.findById(2);
        expect(found).toEqual(null)

    })
});
beforeEach(()=>{
    expect(Bicicleta.allBicis.length).toBe(0);
})
afterEach(()=>{
    Bicicleta.allBicis=[]
});
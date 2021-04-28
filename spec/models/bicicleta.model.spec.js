var mongoose = require('mongoose')
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', ()=>{
    beforeAll((done)=>{
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true});
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error'));
        db.once('open',()=>{
            console.log('We are connected to test database!');
            done();
        })
    });
    afterEach((done)=>{
        Bicicleta.deleteMany({},(err,success)=>{
            if(err) console.log(err);
            done();
        })
    });
    describe('Bicicleta.createInstance',()=>{
        it('crea una instancia de Bicicleta',()=>{
            var bici = Bicicleta.createInstance(1,"verde","urbana",[-34.5,-54.1]);
            expect(bici.code).toBe(1)
            expect(bici.color).toBe("verde")
            expect(bici.modelo).toBe("urbana")
            expect(bici.ubicacion[0]).toBe(-34.5)
            expect(bici.ubicacion[1]).toBe(-54.1)
        })
    })
    describe('Bicicleta.allBicis',()=>{
        it('comienza vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                done();
            })
        })
    })
    describe('Bicicleta.add',()=>{
        it('agrega solo una bici',(done)=>{
            var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
            Bicicleta.add(bici,(err,newBici)=>{
                if(err) console.log(err);
                Bicicleta.allBicis((err,bicis)=>{
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(bici.code);
                    done();
                })
            })
        })
    })
    describe('Bicicleta.findByCode',()=>{
        it('debe devolver la bicicleta con code 1',(done)=>{
            Bicicleta.allBicis((err,bicis)=>{
                expect(bicis.length).toBe(0);
                var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
                Bicicleta.add(bici,(err,newBici)=>{
                    if(err) console.log(err);
                    var bici2 = new Bicicleta({code:2,color:"roja",modelo:"urbana"})
                    Bicicleta.add(bici2,(err,newBici)=>{
                        if(err) console.log(err);
                        Bicicleta.findByCode(1,(err,found)=>{
                            expect(found.code).toBe(bici.code)
                            expect(found.color).toBe(bici.color)
                            expect(found.modelo).toBe(bici.modelo)
                            done();
                        })
                    })
                })
            });
        })
        it('debe devolver null al buscar una bicicleta con code 3',(done)=>{
            Bicicleta.allBicis((err,bicis)=>{
                expect(bicis.length).toBe(0);
                var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
                Bicicleta.add(bici,(err,newBici)=>{
                    if(err) console.log(err);
                    var bici2 = new Bicicleta({code:2,color:"roja",modelo:"urbana"})
                    Bicicleta.add(bici2,(err,newBici)=>{
                        if(err) console.log(err);
                        Bicicleta.findByCode(3,(err,found)=>{
                            expect(found).toBe(null)
                            done();
                        })
                    })
                })
            });
        })
    })
    describe('Bicicleta.removeByCode',()=>{
        it('debe eliminar la bicicleta con code 1',(done)=>{
            Bicicleta.allBicis((err,bicis)=>{
                expect(bicis.length).toBe(0);
                var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
                Bicicleta.add(bici,(err,newBici)=>{
                    if(err) console.log(err);
                    var bici2 = new Bicicleta({code:2,color:"roja",modelo:"urbana"})
                    Bicicleta.add(bici2,(err,newBici)=>{
                        if(err) console.log(err);
                        Bicicleta.removeByCode(1,(err,removed)=>{
                            Bicicleta.findByCode(1,(err,found)=>{
                                expect(found).toBe(null)
                                done();
                            })
                        })
                    })
                })
            });
        })
        it('debe retornar la bicicleta con code 2 elimiando el code 1',(done)=>{
            Bicicleta.allBicis((err,bicis)=>{
                expect(bicis.length).toBe(0);
                var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
                Bicicleta.add(bici,(err,newBici)=>{
                    if(err) console.log(err);
                    var bici2 = new Bicicleta({code:2,color:"roja",modelo:"urbana"})
                    Bicicleta.add(bici2,(err,newBici)=>{
                        if(err) console.log(err);
                        Bicicleta.removeByCode(1,(err,removed)=>{
                            Bicicleta.findByCode(2,(err,found)=>{
                                expect(found).not.toBe(null)
                                done();
                            })
                        })
                    })
                })
            });
        })
    })
})

// describe('Bicicleta.allBicis',()=>{ // Grupo de Test
//     it('comienza vacia',()=>{ // Que es lo que se quiere probar
//         expect(Bicicleta.allBicis.length).toBe(0); // Validación
//     });
// });

// describe('Bicicleta.add',()=>{
//     it('agregamos una',()=>{
//         var bici= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
//         Bicicleta.add(bici)
//         expect(Bicicleta.allBicis[0]).toBe(bici);
//     });
// });

// describe('bicicleta.findById',()=>{
//     it('debe devolver la bicicleta con id 1',()=>{
//         var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
//         var bici2= new Bicicleta(2,'azul','ciudad',[-33.4545163,-70.5978979]);
//         Bicicleta.add(bici1);
//         Bicicleta.add(bici2);
//         var found = Bicicleta.findById(1);
//         expect(found.id).toBe(1)
//         expect(found.color).toBe('rojo');
//         expect(found.modelo).toBe('urbana');
//     });
// })

// describe('Bicicleta.removeById',()=>{
//     it('debele eliminar la bicicleta con el id 2',()=>{
//         var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
//         var bici2= new Bicicleta(2,'azul','ciudad',[-33.4545163,-70.5978979]);
//         Bicicleta.add(bici1);
//         Bicicleta.add(bici2);
//         Bicicleta.removeById(2);
//         var found = Bicicleta.findById(2);
//         expect(found).toEqual(null)

//     })
// });
// beforeEach(()=>{
//     expect(Bicicleta.allBicis.length).toBe(0);
// })
// afterEach(()=>{
//     Bicicleta.allBicis=[]
// });
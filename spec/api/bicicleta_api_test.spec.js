var Bicicleta = require('../../models/bicicleta');
var request = require('request');

var server = require('../../bin/www');

describe('Bicicleta API',()=>{
    describe('GET Bicicletas /',()=>{
        it('Status 200',(done)=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
            var bici2= new Bicicleta(2,'azul','ciudad',[-33.4545163,-70.5978979]);
            Bicicleta.add(bici1);
            Bicicleta.add(bici2);
            request.get('http://localhost:5000/api/v1/bicicletas',(err,response,body)=>{
                expect(response.statusCode).toBe(200)
                done();
            })
        });
    });
    describe('POST Bicicletas /',()=>{
        it('Status 201',(done)=>{ // El done es un callback
            var headers = {'content-type':'application/json'};
            var aBici = '{"id":10,"color":"rojo","modelo":"urbana","lat":-33,"lng":-10}';
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/v1/bicicletas',
                body:aBici
            },(err,response,body)=>{
                expect(response.statusCode).toBe(201);
                expect(Bicicleta.findById(10).color).toBe("rojo")
                done();
            })
        });
    })
    describe('DELETE Bicicletas /',()=>{
        it('Status 204',(done)=>{ // El done es un callback
            var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
            Bicicleta.add(bici1);
            request.delete({
                url: 'http://localhost:5000/api/v1/bicicletas/'+bici1.id
            },(err,response,body)=>{
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.findById(bici1.id)).toEqual(null)
                done();
            })
        });
    })
    describe('DELETE Bicicletas /',()=>{
        it('Status 204',(done)=>{ // El done es un callback
            var headers = {'content-type':'application/json'};
            var aBici = '{"id":1,"color":"azul","modelo":"urbana","lat":-33,"lng":-10}';
            var bici1= new Bicicleta(1,'rojo','urbana',[-33.4545163,-70.5978979]);
            Bicicleta.add(bici1);
            request.put({
                headers: headers,
                url: 'http://localhost:5000/api/v1/bicicletas/'+bici1.id,
                body:aBici
            },(err,response,body)=>{
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(bici1.id).color).toBe('azul')
                done();
            })
        });
    })
})
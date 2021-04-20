var map = L.map('main_map').setView([-33.4488897, -70.6692655], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.ajax({
    dataType:"json",
    url:"api/v1/bicicletas", // https://api.dominio.cl/api/v1/bicicletas
    success: (result)=>{
        console.log(result);
        result.bicicletas.forEach(element => {
            L.marker(element.ubicacion,{title:element.id}).addTo(map)
        });
    }
})
const ventas = require("./datos.js");

function ValorVenta(venta) {
    return ventas.cantidad * ventas.precio;
}

function TotalVendido(ventas){
    let i = 0;
    for (const venta of ventas) 
        i +=  ValorVenta(venta)
    return i
}

function unidadesVendidas(ventas){
    let i = 0;
    for (venta of ventas) 
        i +=  venta.cantidad
    return i
}


function ventaMayor(ventas) {
    let mayor = null;
    let valorMayor = 0;

    for (const venta of ventas) {
        const valorActual = ValorVenta(venta);

        if (mayor === null || valorActual > valorMayor) {
            mayor = venta;
            valorMayor = valorActual;
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let TotalVentas = 0
    for (const venta of ventas)
        if (venta.cantidad > 0)
            TotalVentas += 1
    if (TotalVentas === 0) {
        return 0
    } 
    return TotalVendido(ventas) / TotalVentas

}


function ventasDeCiudad(ventas, ciudad) {
    let arr = [];
    const buscada = ciudad.trim().toLowerCase();

    for (venta of ventas) {
        if ((venta.ciudad.trim().toLowerCase()) == buscada) {
            arr.push(venta);
        }
    }
    return TotalVendido(arr);
}

console.log(ventasDeCiudad(ventas, "Medellín"))
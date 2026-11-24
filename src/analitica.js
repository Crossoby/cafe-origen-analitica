const ventas = require("./datos.js");

function ValorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function TotalVendido(ventas) {
    let i = 0;
    for (const venta of ventas)
        i += ValorVenta(venta)
    return i
}

function unidadesVendidas(ventas) {
    let i = 0;
    for (venta of ventas)
        i += venta.cantidad
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

function TotalVendidoM(ventas) {
    return ventas.reduce((acumulado, venta) => acumulado + ValorVenta(venta), 0);
}

function UnidadesVendidasM(ventas) {
    return ventas.reduce((acumulado, venta) => acumulado + venta.cantidad, 0)
}

function ventasDeCiudadM(ventas, ciudad) {
    const buscada = ciudad.trim().toLowerCase();
    const ventasFiltradas = ventas.filter((venta) => { if (venta.ciudad.trim().toLowerCase() === buscada) { return venta } });
    return TotalVendidoM(ventasFiltradas)
}

function totalPorCiudad(ventas) {
    const totalCiudades = { "Medellín": ventasDeCiudadM(ventas, "Medellín"), "Cali": ventasDeCiudadM(ventas, "Cali"), "Bogotá": ventasDeCiudadM(ventas, "Bogotá"), "Pereira": ventasDeCiudadM(ventas, "Pereira") }
    return totalCiudades
}

function unidadesPorProducto(ventas) {
    const totales = {};
    for (const venta of ventas) {
        const producto = venta.producto;
        if (!Object.hasOwn(totales, producto)) {
            totales[producto] = 0;
        }
        totales[producto] += venta.cantidad;
    }
    return totales;
}

function topProductosPorValor(ventas, k) {
    const totales = {};
    for (const venta of ventas) {
        const producto = venta.producto;
        if (!Object.hasOwn(totales, producto)) {
            totales[producto] = 0;
        }
        totales[producto] += ValorVenta(venta);
    }
    const productos = Object.entries(totales).map(([producto, valor]) => ({
        producto,
        valor
    }));
    return [...productos]
        .sort((a, b) => b.valor - a.valor)
        .slice(0, k);
}

module.exports = {
    TotalVendido,
    TotalVendidoM,
    unidadesVendidas,
    UnidadesVendidasM,
    ventasDeCiudad,
    ventasDeCiudadM
};




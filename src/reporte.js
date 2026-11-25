const ventas = require("./datos.js");
const {
    TotalVendidoM, UnidadesVendidasM, ticketPromedio, ventaMayor, ValorVenta,
    totalPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia
} = require("./analitica.js");

function pesos(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

function resumen(registros) {
    const mayor = ventaMayor(registros);
    return {
        "Total vendido": pesos(TotalVendidoM(registros)),
        "Unidades": UnidadesVendidasM(registros),
        "Ticket promedio": pesos(ticketPromedio(registros)),
        "Venta de mayor valor": pesos(mayor ? ValorVenta(mayor) : 0)
    };
}

const diaConVentas = "2026-09-01";
const diaSinVentas = "2026-09-07";

console.log("Café Origen v0.1");
console.log("\n1. Resumen general");
console.table({
    "Todas las fechas": resumen(ventas),
    [diaConVentas]: resumen(ventasDelDia(ventas, diaConVentas)),
    [diaSinVentas]: resumen(ventasDelDia(ventas, diaSinVentas))
});

console.log("\n2. Ventas por ciudad");
console.table(Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
    Ciudad: ciudad,
    "Total vendido": pesos(total)
})));

console.log("\n3. Unidades por producto");
console.table(Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
    Producto: producto,
    Unidades: unidades
})));

console.log("\n4. Top 3 de productos por valor");
console.table(topProductosPorValor(ventas, 3).map(({ producto, valor }, indice) => ({
    Puesto: indice + 1,
    Producto: producto,
    "Total vendido": pesos(valor)
})));

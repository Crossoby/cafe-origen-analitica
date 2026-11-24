const ventas = require("./datos.js")
const analitica = require("./analitica.js")
const funcion1 = analitica.TotalVendido
const funcion2 = analitica.TotalVendidoM
const funcion3 = analitica.unidadesVendidas
const funcion4 = analitica.UnidadesVendidasM
const funcion5 = analitica.ventasDeCiudad
const funcion6 = analitica.ventasDeCiudadM 

function verificarFunciones(funcion_1, funcion_2) {
    if (funcion_1 === funcion_2){
        return "OK"
    }else {
        return "DIFERENTE"
    }
}

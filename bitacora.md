# Bitácora de Análisis - Café Origen v0.1

## 1. Diccionario de datos (Minirreto 1)

| Propiedad | Tipo de dato | Significado |
| :--- | :--- | :--- |
| `id` | Number | Identificador del 1 al 12 |
| `fecha` | String | Fecha de la venta en formato Año, Mes, Día |
| `cliente` | String | Código del cliente que compró |
| `producto` | String | Nombre del producto que se compró |
| `ciudad` | String | Ciudad de la venta o del cliente |
| `cantidad` | Number | Cantidad vendida del producto |
| `precio` | Number | Precio del producto por unidad |

---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**: Ciudades con espacios y minúsculas
- **¿Cómo se debe tratar en el análisis?**: Normalizar antes de hacer la comparación

### Hallazgo 2:
- **Descripción**: Cantidad errónea en la venta con id: 8
- **¿Cómo se debe tratar en el análisis?**: No cuenta en el registro

---

## 3. Patrones con ciclos manuales (Minirreto 2)

- **`totalVendido(ventas)`**:
  - *Patrón usado (contador, acumulador, filtro, extremo)*: Acumulador
- **`totalUnidades(ventas)`**:
  - *Patrón usado*: Acumulador
- **`ventaMayorValor(ventas)`**:
  - *Patrón usado*: Búsqueda de extremo (máximo)
- **`ventasDeCiudad(ventas, ciudad)`**:
  - *Patrón usado*: Filtro manual con normalización de texto (`.trim().toLowerCase()`) + acumulador
- **`promedioPorVenta(ventas)`**:
  - *Patrón usado*: Acumulador + Contador combinados

### Plan en pseudocódigo (paso 1)

**`totalVendido(ventas)`**

```
FUNCIÓN totalVendido(ventas)
    total ← 0                               // valor inicial
    PARA CADA venta EN ventas               // qué recorro
        total ← total + valorVenta(venta)   // qué acumulo
    DEVOLVER total
```

**`totalUnidades(ventas)`**

```
FUNCIÓN totalUnidades(ventas)
    total ← 0                            // valor inicial
    PARA CADA venta EN ventas            // qué recorro
        total ← total + venta.cantidad   // qué acumulo
    DEVOLVER total
```

**`ventaMayorValor(ventas)`**

```
FUNCIÓN ventaMayorValor(ventas)
    mayorVenta ← nulo                                      // valor inicial (la venta más alta)
    mayorValor ← nulo                                      // valor inicial (su valor)
    PARA CADA venta EN ventas                              // qué recorro
        valorActual ← valorVenta(venta)
        SI mayorVenta es nulo O valorActual > mayorValor   // condición
            mayorValor ← valorActual                       // qué acumulo: el valor más alto hasta ahora
            mayorVenta ← venta                             // y su registro completo
    DEVOLVER mayorVenta
```

**`ventasDeCiudad(ventas, ciudad)`**

```
FUNCIÓN ventasDeCiudad(ventas, ciudad)
    buscada ← normalizar(ciudad)                // normalizar = .trim().toLowerCase()
    arr ← lista vacía                           // valor inicial
    PARA CADA venta EN ventas                   // qué recorro
        SI normalizar(venta.ciudad) = buscada   // condición
            agregar venta a arr                 // qué acumulo
    DEVOLVER totalVendido(arr)
```

**`promedioPorVenta(ventas)`**

```
FUNCIÓN promedioPorVenta(ventas)
    numeroVentas ← 0                          // valor inicial
    PARA CADA venta EN ventas                 // qué recorro
        SI venta.cantidad > 0                 // condición
            numeroVentas ← numeroVentas + 1   // qué acumulo: cuántas ventas válidas hay
    SI numeroVentas = 0
        DEVOLVER 0
    DEVOLVER totalVendido(ventas) / numeroVentas
```

### Pruebas con tres entradas (paso 6)

Un solo elemento: la venta con `id: 1`. En `ventasDeCiudad` se buscó `"Medellín"`.

| Función | Arreglo completo (`ventas`) | Un solo elemento (`[ventas[0]]`) | Arreglo vacío (`[]`) |
| :--- | :--- | :--- | :--- |
| `totalVendido` | 985000 | 84000 | 0 |
| `totalUnidades` | 21 | 2 | 0 |
| `ventaMayorValor` | registro con `id: 10` | registro con `id: 1` | `null` |
| `ventasDeCiudad` | 356000 | 84000 | 0 |
| `promedioPorVenta` | 89545.45454545454 | 84000 | 0 |

### Tabla de traza (paso 7)

Se verificaron a mano dos resultados con el arreglo completo (`ventas`) y se compararon con los que devuelve el programa.

**Traza 1: `totalVendido(ventas)`**

| `venta.id` | `cantidad` | `precio` | `valorVenta(venta)` | `total` al terminar la vuelta |
| :--- | :--- | :--- | :--- | :--- |
| (inicio) | | | | 0 |
| 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 1 | 95000 | 95000 | 205000 |
| 4 | 1 | 42000 | 42000 | 247000 |
| 5 | 3 | 45000 | 135000 | 382000 |
| 6 | 2 | 26000 | 52000 | 434000 |
| 7 | 1 | 120000 | 120000 | 554000 |
| 8 | 0 | 42000 | 0 | 554000 |
| 9 | 2 | 45000 | 90000 | 644000 |
| 10 | 4 | 42000 | 168000 | 812000 |
| 11 | 1 | 95000 | 95000 | 907000 |
| 12 | 3 | 26000 | 78000 | 985000 |

- Resultado a mano: **985000**
- Resultado del programa: **985000**
- ¿Coinciden?: Sí

**Traza 2: `ventasDeCiudad(ventas, "Medellín")`**

`buscada` = `"medellín"`

| `venta.id` | `venta.ciudad` | Normalizada (`.trim().toLowerCase()`) | ¿Igual a `buscada`? | `arr` (ids) al terminar la vuelta |
| :--- | :--- | :--- | :--- | :--- |
| (inicio) | | | | [] |
| 1 | Medellín | medellín | Sí | [1] |
| 2 | Bogotá | bogotá | No | [1] |
| 3 | Cali | cali | No | [1] |
| 4 | Medellín | medellín | Sí | [1, 4] |
| 5 | medellín | medellín | Sí | [1, 4, 5] |
| 6 | Bogotá | bogotá | No | [1, 4, 5] |
| 7 | Bogotá | bogotá | No | [1, 4, 5] |
| 8 | Cali | cali | No | [1, 4, 5] |
| 9 | Cali | cali | No | [1, 4, 5] |
| 10 | Pereira | pereira | No | [1, 4, 5] |
| 11 | Medellín | medellín | Sí | [1, 4, 5, 11] |
| 12 | Bogotá | bogotá | No | [1, 4, 5, 11] |

Al terminar el ciclo: `totalVendido(arr)` = 84000 + 42000 + 135000 + 95000 = 356000.

- Resultado a mano: **356000**
- Resultado del programa: **356000**
- ¿Coinciden?: Sí

---

## 4. Del ciclo al método: Preguntas de transformación y agrupación (Minirreto 3)

- **¿Qué filtro? (`.filter`)**:
- **¿Qué transformo? (`.map`)**:
- **¿Qué reduzco / acumulo? (`.reduce`)**:
- **¿Cómo agrupo en un diccionario?**:
- **¿Cómo ordeno sin modificar el arreglo original? (`.sort`)**:

---

## 5. Verificación del reporte y pureza de funciones (Minirreto 4)

- **¿Cómo comprobaste que el arreglo `ventas` original no fue modificado?**:
- **Comando para ejecutar el reporte**:

# Bitácora de Análisis - Café Origen v0.1

## 1. Diccionario de datos (Minirreto 1)

| Propiedad | Tipo de dato | Significado |
| :--- | :--- | :--- |
| `id` |number |identificador de cada registro de venta |
| `fecha` |string |fecha de la venta |
| `cliente` |string |codigo del cliente para su identificación |
| `producto` |string |el origen del producto y su cantidad  |
| `ciudad` |string |ciudad asociada al registro |
| `cantidad` |number |numero de unidades del producto |
| `precio` |number |valor del producto por unidad |

---

## 2. Casos borde detectados en los datos (Minirreto 1)

### Hallazgo 1:
- **Descripción**:Ciudad escrita de dos formas diferentes, exactamente en sus iniciales (una mayuscula y la otra no)
- **¿Cómo se debe tratar en el análisis?**:cambiar la letra de la que esta en minuscula para tratar mejor los datos en otra ocasión


### Hallazgo 2:
- **Descripción**:cantidad pedida de 0, lo que seria ilógico ya que no se registraria como venta 
- **¿Cómo se debe tratar en el análisis?**:no registrar dicho caso

---

## 3. Patrones con ciclos manuales (Minirreto 2)

- **`totalVendido(ventas)`**:
  - *Patrón usado (contador, acumulador, filtro, extremo)*:
- **`totalUnidades(ventas)`**:
  - *Patrón usado*:
- **`ventaMayorValor(ventas)`**:
  - *Patrón usado*:
- **`ventasDeCiudad(ventas, ciudad)`**:
  - *Patrón usado*:
- **`promedioPorVenta(ventas)`**:
  - *Patrón usado*:

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

"use strict";

/*
    PROYECTO: Alicia en el país de las maravillas
    Asignatura: Programación Web I
    Tecnologías: JavaScript nativo y DOM
*/


// ==================================================
// EJERCICIO 1: LA POCIÓN MÁGICA DE ALICIA
// ==================================================

const formPocion = document.getElementById("formPocion");
const resultadoPocion = document.getElementById("resultadoPocion");

const ALTURA_PUERTA = 150;
const FACTOR_POCION = 10;
const POCION_MAXIMA = 20;


/*
    Calcula la altura final de Alicia y determina
    si puede atravesar la puerta.
*/
function calcularPocion(evento) {
    evento.preventDefault();

    const alturaInicial = Number(
        document.getElementById("alturaInicial").value
    );

    const cantidadPocion = Number(
        document.getElementById("cantidadPocion").value
    );

    // Validar los datos introducidos.
    if (
        !Number.isFinite(alturaInicial) ||
        !Number.isFinite(cantidadPocion) ||
        alturaInicial <= 0 ||
        cantidadPocion < 0 ||
        cantidadPocion > POCION_MAXIMA
    ) {
        mostrarResultado(
            resultadoPocion,
            "Error\nLa altura debe ser positiva y la poción debe estar entre 0 y 20 ml.",
            "error"
        );
        return;
    }

    // Aplicar la fórmula matemática.
    const aumento = cantidadPocion * FACTOR_POCION;
    const alturaFinal = alturaInicial + aumento;

    let mensaje;

    // Comparar la altura con la puerta.
    if (alturaFinal <= ALTURA_PUERTA) {
        mensaje = "¡Alicia puede pasar por la puerta!";
    } else if (alturaFinal <= ALTURA_PUERTA + 50) {
        mensaje = "Alicia no puede pasar. ¡La poción la hizo demasiado alta!";
    } else {
        mensaje = "¡Alicia creció demasiado y necesita otra solución!";
    }

    // Preparar los resultados.
    const texto =
        "Resultado de la poción\n" +
        "Altura inicial: " + alturaInicial + " cm\n" +
        "Poción consumida: " + cantidadPocion + " ml\n" +
        "Aumento de altura: " + aumento + " cm\n" +
        "Altura final: " + alturaFinal + " cm\n" +
        "Altura de la puerta: " + ALTURA_PUERTA + " cm\n" +
        mensaje;

    mostrarResultado(resultadoPocion, texto, "exito");
}

formPocion.addEventListener("submit", calcularPocion);


// ==================================================
// EJERCICIO 2: LA MERIENDA DEL SOMBRERERO LOCO
// ==================================================

const formMerienda = document.getElementById("formMerienda");
const resultadoMerienda = document.getElementById("resultadoMerienda");

const DESCUENTO = 0.10;
const TAZAS_MINIMAS_DESCUENTO = 5;
const TAZAS_MAXIMAS = 20;


/*
    Devuelve el precio unitario de la bebida
    elegida mediante la estructura switch.
*/
function obtenerPrecio(tipoBebida) {
    let precio;

    switch (tipoBebida) {
        case "te":
            precio = 5;
            break;

        case "cafe":
            precio = 8;
            break;

        case "chocolate":
            precio = 10;
            break;

        case "jugo":
            precio = 6;
            break;

        default:
            precio = -1;
    }

    return precio;
}


/*
    Calcula el subtotal, el descuento y el total
    de la compra del invitado.
*/
function calcularMerienda(evento) {
    evento.preventDefault();

    const nombre = document
        .getElementById("nombreInvitado")
        .value
        .trim();

    const tipoBebida = document.getElementById("tipoBebida").value;

    const cantidadTazas = Number(
        document.getElementById("cantidadTazas").value
    );

    // Validar el nombre.
    if (nombre.length === 0) {
        mostrarResultado(
            resultadoMerienda,
            "Error\nDebes escribir el nombre del invitado.",
            "error"
        );
        return;
    }

    // Validar que la cantidad sea un entero permitido.
    if (
        !Number.isInteger(cantidadTazas) ||
        cantidadTazas < 1 ||
        cantidadTazas > TAZAS_MAXIMAS
    ) {
        mostrarResultado(
            resultadoMerienda,
            "Error\nIntroduce una cantidad entera entre 1 y 20 tazas.",
            "error"
        );
        return;
    }

    // Obtener el precio con switch.
    const precioUnitario = obtenerPrecio(tipoBebida);

    if (precioUnitario < 0) {
        mostrarResultado(
            resultadoMerienda,
            "Error\nSelecciona una bebida válida del menú.",
            "error"
        );
        return;
    }

    // Calcular subtotal y descuento.
    const subtotal = precioUnitario * cantidadTazas;
    let descuentoAplicado = 0;

    if (cantidadTazas >= TAZAS_MINIMAS_DESCUENTO) {
        descuentoAplicado = subtotal * DESCUENTO;
    }

    const total = subtotal - descuentoAplicado;

    // Obtener el nombre completo de la bebida.
    let nombreBebida;

    switch (tipoBebida) {
        case "te":
            nombreBebida = "Té de rosas";
            break;

        case "cafe":
            nombreBebida = "Café mágico";
            break;

        case "chocolate":
            nombreBebida = "Chocolate encantado";
            break;

        case "jugo":
            nombreBebida = "Jugo de maravillas";
            break;

        default:
            nombreBebida = "Bebida desconocida";
    }

    // Preparar el detalle de la compra.
    const texto =
        "Cuenta de la merienda\n" +
        "Invitado: " + nombre + "\n" +
        "Bebida: " + nombreBebida + "\n" +
        "Cantidad de tazas: " + cantidadTazas + "\n" +
        "Precio por taza: Bs " + precioUnitario.toFixed(2) + "\n" +
        "Subtotal: Bs " + subtotal.toFixed(2) + "\n" +
        "Descuento: Bs " + descuentoAplicado.toFixed(2) + "\n" +
        "Total a pagar: Bs " + total.toFixed(2) + "\n" +
        (
            descuentoAplicado > 0
                ? "¡Se aplicó el descuento del 10 %!"
                : "Compra 5 tazas o más para obtener un descuento del 10 %."
        );

    mostrarResultado(resultadoMerienda, texto, "exito");
}

formMerienda.addEventListener("submit", calcularMerienda);


// ==================================================
// EJERCICIO 3: EL DESAFÍO DE LA REINA DE CORAZONES
// ==================================================

const formReina = document.getElementById("formReina");
const resultadoReina = document.getElementById("resultadoReina");

const CARTAS_MINIMAS = 1;
const CARTAS_MAXIMAS = 100;


/*
    Recorre la secuencia de cartas, clasifica los
    números pares e impares y calcula sus sumas.
*/
function analizarCartas(evento) {
    evento.preventDefault();

    const cantidadCartas = Number(
        document.getElementById("cantidadCartas").value
    );

    // Validar la cantidad de cartas.
    if (
        !Number.isInteger(cantidadCartas) ||
        cantidadCartas < CARTAS_MINIMAS ||
        cantidadCartas > CARTAS_MAXIMAS
    ) {
        mostrarResultado(
            resultadoReina,
            "Error\nIntroduce un número entero entre 1 y 100.",
            "error"
        );
        return;
    }

    let secuencia = "";
    let cantidadPares = 0;
    let cantidadImpares = 0;
    let sumaPares = 0;
    let sumaImpares = 0;

    // Recorrer los números desde 1 hasta el límite.
    for (let numero = 1; numero <= cantidadCartas; numero++) {
        secuencia += numero;

        if (numero < cantidadCartas) {
            secuencia += ", ";
        }

        // Clasificar cada número con el operador módulo.
        if (numero % 2 === 0) {
            cantidadPares++;
            sumaPares += numero;
        } else {
            cantidadImpares++;
            sumaImpares += numero;
        }
    }

    // Determinar qué grupo tiene la suma mayor.
    let mensajeGanador;

    if (sumaPares > sumaImpares) {
        mensajeGanador = "¡Ganan los números pares!";
    } else if (sumaImpares > sumaPares) {
        mensajeGanador = "¡Ganan los números impares!";
    } else {
        mensajeGanador = "¡Empate! Ambas sumas son iguales.";
    }

    // Preparar el informe del desafío.
    const texto =
        "Resultado del desafío\n" +
        "Secuencia: " + secuencia + "\n" +
        "Cantidad de números pares: " + cantidadPares + "\n" +
        "Suma de los números pares: " + sumaPares + "\n" +
        "Cantidad de números impares: " + cantidadImpares + "\n" +
        "Suma de los números impares: " + sumaImpares + "\n" +
        "Veredicto: " + mensajeGanador;

    mostrarResultado(resultadoReina, texto, "exito");
}

formReina.addEventListener("submit", analizarCartas);


// ==================================================
// FUNCIÓN GENERAL PARA MOSTRAR LOS RESULTADOS
// ==================================================

/*
    Construye el resultado mediante elementos del DOM.
    Utiliza textContent para mostrar el contenido de
    forma segura y evitar interpretarlo como HTML.
*/
function mostrarResultado(elemento, mensaje, tipo) {
    // Eliminar el resultado anterior.
    elemento.textContent = "";
    elemento.classList.remove("exito", "error");
    elemento.classList.add(tipo);

    // Separar el título del resto del mensaje.
    const lineas = mensaje.split("\n");
    const titulo = document.createElement("h3");

    titulo.textContent = lineas[0] || "Resultado";
    elemento.appendChild(titulo);

    // Crear las filas de resultados.
    for (let i = 1; i < lineas.length; i++) {
        const linea = lineas[i].trim();

        if (linea === "") {
            continue;
        }

        const separador = linea.indexOf(": ");

        if (separador !== -1) {
            // Fila con etiqueta y valor.
            const fila = document.createElement("div");
            const etiqueta = document.createElement("span");
            const valor = document.createElement("span");

            fila.classList.add("resultado-fila");
            etiqueta.classList.add("resultado-etiqueta");
            valor.classList.add("resultado-valor");

            etiqueta.textContent = linea.substring(0, separador);
            valor.textContent = linea.substring(separador + 2);

            fila.appendChild(etiqueta);
            fila.appendChild(valor);
            elemento.appendChild(fila);
        } else {
            // Mensaje final o veredicto.
            const parrafo = document.createElement("p");

            parrafo.classList.add("resultado-mensaje");
            parrafo.textContent = linea;

            elemento.appendChild(parrafo);
        }
    }
}

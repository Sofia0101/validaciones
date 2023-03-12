
// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur", (evento) => {
//     validarNacimiento(evento.target);
// })


export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
        
        if (input.validity.valid) {
            input.parentElement.classList.remove("input-container--invalid");
            input.parentElement.querySelector(".input-message-error").innerHTML = "";
        }
        else{
            input.parentElement.classList.add("input-container--invalid");
            input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
        }
}

// a partir de la funcion valida es en la que se basan todos los inputs. valida toma en cuenta todos los inputs porque le dijimos const inputs = document.querySelectorAll("input") en el archivo app.js donde lo importamos.

// Por eso en la const MensajesDeError cada input que pongamos va a hacer caso a la funcion valida: valueMissing y los demas mjes de error son parte del devtools y hacen referencia al input, además los tipo de inputs (nombre, email etc...) fueron instanciados en html cuando pusimos el data-tipo.

//  Por lo tanto cada input de la clase "input" (en los divs) en html va a tener relacion con los data-tipo que relacionemos en este archivo y con las funciones(puede ser que no lo pongamos en el objeto mjesdeerror pero se va a relacionar por la clase input, y va a suceder lo que declaramos en la funcion). Es un "enlace" de tipos de inputs. Aunque no pongamos el data-tipo direccion en el objeto de mensajesDeError, sigue teniendo relacion con los tipoDeErrores, por lo tanto como le dijimpos que sea required, va a saltar el error valueMissing y por lo que le pedimos enla funcion mostrarMensajeDeError, si no llenamos el campo (o cualquier otro tipo de error) va a saltar en la consola el tipo deinput (direccion) y el mje de error qu eestablecimos para valueMissing-.
// Otro ejemplo sobre relaciones, el máximo de edad del input birth, va a dejar que te registres siempre y cuando seas mayor a 18 años, por la funcion mayorDeEdad(). 

// En la consola del desarrollador siempre existe el mje de error(validity) "patternMismatch", que daba un mje por defecto. En el objeto mensajesdeerror solo le cambiamos el nombre a esos mjes, para perosnalizarlos. 

// Pero siempre va a haber realcion con los inputs de html por el data-tipo. Al llamar al data-tipo también llamamos al input y el input está condiicionado por la funcion valida. Por lo tanto si ponemos una fecha menor a 18 años el  datatipo naicmiento va a dar error porque está enlazado con el input de html y éste con la funcion valida.


const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];


const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },
    email: { 
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Mínimo 8 caracteres, máximo 11 caracteres, al menos una letra y un número"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números."
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Mínimo 10 caracteres, máximo 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Mínimo 10 caracteres, máximo 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Mínimo 10 caracteres, máximo 40 caracteres"
    }


}


const validadores = {
    nacimiento: input => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]) {
            console.log(tipoDeInput,error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })


    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date (input.value);
    let mensaje = ""
   if(!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad."
   }

     input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
         fecha.getUTCMonth(),
          fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;

}
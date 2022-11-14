export const validar = (input) => {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacío'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacío',
        typeMismatch: 'El correo no es válido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La dirección debe tener entre 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe tener entre 10 a 40 caracteres'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El estado debe tener entre 10 a 40 caracteres'
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

const mostrarMensajeDeError= (tipoDeInput, input) => {
    let mensaje = '';
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

const validarNacimiento = (input) => {
    const fechaCliente = new Date(input.value);
    let mensaje = '';

    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad.';
    }

    input.setCustomValidity(mensaje);
}

const mayorDeEdad = (fechaCliente) => {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fechaCliente.getUTCFullYear() + 18,
        fechaCliente.getUTCMonth(),
        fechaCliente.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
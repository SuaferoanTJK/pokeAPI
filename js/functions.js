let loginData = {
    email1: "",
    password: ""    
}

let contactData = {
    nomape: "",
    email2: "",
    address: "",
    distrito: "",
    telefono: ""
}

const storeValue = (input, form) => {
    const alertContainer = document.getElementById("alert_container");
    alertContainer.innerHTML = ''

    const regexValidation = {
        email1: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        nomape: /^[a-zA-Z0-9.-\s]{5,}$/,
        email2: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        address: /^[a-zA-Z0-9.-\s]{10,}$/,
        distrito: /^[a-zA-Z0-9.-\s]{5,}$/,
        telefono: /^[0-9]{9,}$/
    }[input.name]

    const errorMessageSelected = {
        email1: "Debe digitar un correo válido",
        password: "La contraseña debe tener como mínimo: 1 minúscula, 1 mayúscula, 1 dígito, 1 carácter especial y ser mínimo de 8 carácteres",
        nomape: "Debe ingresar su nombre completo",
        email2: "Debe digitar un correo válido",
        address: "Debe indicar la dirección de su domicilio",
        distrito: "Debe indicar el distrito en al que vive. No acepta números",
        telefono: "Solo puede ingresar números"
    }[input.name]
    
    let isValidInputData = true;
    isValidInputData = regexValidation.test(input.value)

    const errorMessage = document.querySelector(`#${input.name}`).nextElementSibling;
    if(isValidInputData){
        errorMessage.innerHTML = "";
        if(form === "login"){
            loginData = {...loginData, [input.name]: input.value};
        }
        if(form === "contacto"){
            contactData = {...contactData, [input.name]: input.value};
        }
    } else errorMessage.innerHTML = errorMessageSelected;
}

const login = () => {
    const alertContainer = document.getElementById("alert_container");
    if(loginData.email1 === "" || loginData.password === ""){
        alertContainer.innerHTML = '<div class="alert alert-warning mt-4" role="alert">No ha ingresado los datos para poder loguearse</div>'
    }

    sessionStorage.setItem('email1', loginData.email1)
    sessionStorage.setItem('password', loginData.password)

    const email1 = sessionStorage.getItem('email1')
    const password = sessionStorage.getItem('password')

    if(email1 && password) window.location.href = "pokemon.html"
}

const contact = () => {
    const alertContainer = document.getElementById("alert_container");
    if(contactData.email2 === "" || contactData.nomape === "" || contactData.address === "" || contactData.distrito === "" || contactData.telefono === ""){
        alertContainer.innerHTML = '<div class="alert alert-warning mt-4" role="alert">Debe llenar todos los campos</div>'
    }

    sessionStorage.setItem('nomape', contactData.nomape)
    sessionStorage.setItem('email2', contactData.email2)
    sessionStorage.setItem('address', contactData.address)
    sessionStorage.setItem('distrito', contactData.distrito)
    sessionStorage.setItem('telefono', contactData.telefono)

    const nomape = sessionStorage.getItem('nomape')
    const email2 = sessionStorage.getItem('email2')
    const address = sessionStorage.getItem('address')
    const distrito = sessionStorage.getItem('distrito')
    const telefono = sessionStorage.getItem('telefono')

    if(nomape && email2 && address && distrito && telefono) window.location.href = "index.html"
}

const isUserLogged = (page1) => {
    let isLogged = false;
    const email1 = sessionStorage.getItem('email1')
    const password = sessionStorage.getItem('password')
    const container1 = document.getElementById("navbarOption")

    let isContact = false;
    const nomape = sessionStorage.getItem('nomape')
    const email2 = sessionStorage.getItem('email2')
    const address = sessionStorage.getItem('address')
    const distrito = sessionStorage.getItem('distrito')
    const telefono = sessionStorage.getItem('telefono')
    const container2 = document.getElementById("dataFormContact")
    
    if(email1 && password) isLogged = true;

    if(!isLogged) {
        container1.innerHTML = `<a class='nav-link ${page1 === "login" ? "active" : ""}' href="login.html">Iniciar sesión</a>`
    } else {
        container1.innerHTML = `<div class="ms-2 d-flex align-items-center gap-1 usernameLogged"><p class="p-0 m-0">Hola, ${email1}</p><button class="ms-3 btn btn-info btn-sm" onclick="logout()">Cerrar sesión</button></div>`
    }
    
    if(nomape && email2 && address && distrito && telefono) isContact = true;

    if(!isContact){
        container2.innerHTML = ``   
    }
    else{
        container2.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Datos enviados mediante el formulario de contacto:</strong><br>
        Nombre: ${nomape}<br>
        Correo electrónico: ${email2}<br>
        Dirección: ${address} | Distrito: ${distrito}<br>
        Teléfono: ${telefono}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    }
}

const logout = () => {
    sessionStorage.clear();
    window.location.href = "login.html"
}

const abrirModal = (mensaje) => {
    let nombreArchivo = 'img/' + mensaje + '.jpg';
    document.getElementById('imagenModal').src = nombreArchivo;
    $('#miModal').modal('show');
}
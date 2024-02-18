let loginData = {
    email: "",
    password: ""    
}

let contactData = {
    nomape: "",
    email: "",
    address: "",
    distrito: "",
    telefono: ""
}

const storeValue = (input, form) => {
    const alertContainer = document.getElementById("alert_container");
    alertContainer.innerHTML = ''

    const regexValidation = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        nomape: /^[a-zA-Z0-9.-\s]{5,}$/,
        address: /^[a-zA-Z0-9.-\s]{10,}$/,
        distrito: /^[a-zA-Z0-9.-\s]{5,}$/,
        telefono: /^\d+$/
    }[input.name]

    const errorMessageSelected = {
        email: "Debe digitar un correo válido",
        password: "La contraseña debe tener como mínimo: 1 minúscula, 1 mayúscula, 1 dígito, 1 carácter especial y ser mínimo de 8 carácteres",
        nomape: "Debe ingresar su nombre completo",
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
    if(loginData.email === "" || loginData.password === ""){
        alertContainer.innerHTML = '<div class="alert alert-warning mt-4" role="alert">No ha ingresado los datos para poder loguearse</div>'
    }

    sessionStorage.setItem('email', loginData.email)
    sessionStorage.setItem('password', loginData.password)

    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')

    if(email && password) window.location.href = "pokemon.html"
}

const contact = () => {
    const alertContainer = document.getElementById("alert_container");
    if(contactData.email === "" || contactData.nomape === "" || contactData.address === "" || contactData.distrito === "" || contactData.telefono === ""){
        alertContainer.innerHTML = '<div class="alert alert-warning mt-4" role="alert">Debe llenar todos los campos</div>'
    }

    localStorage.setItem('nomape', contactData.nomape)
    localStorage.setItem('email', contactData.email)
    localStorage.setItem('address', contactData.address)
    localStorage.setItem('distrito', contactData.distrito)
    localStorage.setItem('telefono', contactData.telefono)

    const nomape = localStorage.getItem('nomape')
    const email = localStorage.getItem('email')
    const address = localStorage.getItem('address')
    const distrito = localStorage.getItem('distrito')
    const telefono = localStorage.getItem('telefono')

    const lsData = Object.values({ nomape, email, address, distrito, telefono })
    if(!lsData.includes("")) window.location.href = "index.html"
}

const loadData = (page) => {
    let isLogged = false;
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')
    const containerLogin = document.getElementById("navbarOption")   
    if(email && password) isLogged = true;

    if(!isLogged) {
        containerLogin.innerHTML = `<a class='nav-link ${page === "login" ? "active" : ""}' href="login.html">Iniciar sesión</a>`
    } else {
        containerLogin.innerHTML = `<div class="ms-2 d-flex align-items-center gap-1 usernameLogged"><p class="p-0 m-0">Hola, ${email}</p><button class="ms-3 btn btn-info btn-sm" onclick="logout()">Cerrar sesión</button></div>`
    }
    
    

    if(page === "home"){
        const containerContact = document.getElementById("dataFormContact")
        
        let isContact = false;
        const nomape = localStorage.getItem('nomape')
        const emailContact = localStorage.getItem('email')
        const address = localStorage.getItem('address')
        const distrito = localStorage.getItem('distrito')
        const telefono = localStorage.getItem('telefono')
        if(nomape && emailContact && address && distrito && telefono) isContact = true;

        if(!isContact){
            containerContact.innerHTML = ``   
        } else {
            containerContact.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Datos enviados mediante el formulario de contacto:</strong><br>
                Nombre: ${nomape}<br>
                Correo electrónico: ${emailContact}<br>
                Dirección: ${address} | Distrito: ${distrito}<br>
                Teléfono: ${telefono}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="localStorage.clear()"></button>
            </div>`
        }
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
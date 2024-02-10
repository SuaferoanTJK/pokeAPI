let loginData = {
    email: "",
    password: ""
}

const storeValue = (input, form) => {
    const alertContainer = document.getElementById("alert_container");
    alertContainer.innerHTML = ''

    const regexValidation = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }[input.name]

    const errorMessageSelected = {
        email: "Debe digitar un correo válido",
        password: "La contraseña debe tener como mínimo: 1 minúscula, 1 mayúscula, 1 dígito, 1 carácter especial y ser mínimo de 8 carácteres"
    }[input.name]
    
    let isValidInputData = true;
    isValidInputData = regexValidation.test(input.value)

    const errorMessage = document.querySelector(`#${input.name}`).nextElementSibling;   
    if(isValidInputData){
        errorMessage.innerHTML = "";
        if(form === "login"){
            loginData = {...loginData, [input.name]: input.value};
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

const logout = () => {
    sessionStorage.clear();
    window.location.href = "login.html"
}

const isUserLogged = (page) => {
    let isLogged = false;
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')
    const container = document.getElementById("navbarOption")

    if(email && password) isLogged = true;
    if(!isLogged) {
        container.innerHTML = `<a class='nav-link ${page === "login" ? "active" : ""}' href="login.html">Iniciar sesión</a>`
    } else {
        container.innerHTML = `<div class="ms-2 d-flex align-items-center gap-1 usernameLogged"><p class="p-0 m-0">Hola, ${email}</p><button class="ms-3 btn btn-info btn-sm" onclick="logout()">Cerrar sesión</button></div>`
    }
}

const abrirModal = (mensaje) => {
    let nombreArchivo = 'img/' + mensaje + '.jpg';
    document.getElementById('imagenModal').src = nombreArchivo;
    $('#miModal').modal('show');
}
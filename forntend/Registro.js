const API_URL = 'http://localhost:5000/api';

// Evento para registro de usuarios normales
const buttonRegister = document.getElementById('register');
buttonRegister.addEventListener('click', async function(event) {
    event.preventDefault();
    const idNombre = document.getElementById('nameRegister').value;
    const idEmail = document.getElementById('emailRegister').value;
    const idContra = document.getElementById('passwordRegister').value;
    const message = document.getElementById('messageRegister');

    if (!idNombre || !idEmail || !idContra) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNombre, idEmail, idContra })
    });

    const data = await response.json();
    message.innerHTML = data.message || 'Error al registrar usuario';
});

// Evento para registro de administradores
const buttonAdminRegister = document.getElementById('adminregister');
buttonAdminRegister.addEventListener('click', async function(event) {
    event.preventDefault();
    const idNombre = document.getElementById('nameRegister').value;
    const idEmail = document.getElementById('emailRegister').value;
    const idContra = document.getElementById('passwordRegister').value;
    const message = document.getElementById('messageRegister');

    if (!idNombre || !idEmail || !idContra) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const response = await fetch(`${API_URL}/register-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idNombre, idEmail, idContra })
    });

    const data = await response.json();
    message.innerHTML = data.message || 'Error al registrar administrador';

});

// Evento para inicio de sesión
const buttonLogin = document.getElementById('login');
buttonLogin.addEventListener('click', async function(event) {
    event.preventDefault();
    const idEmail = document.getElementById('emailLogin').value;
    const idContra = document.getElementById('passwordLogin').value;
    const message = document.getElementById('messageLogin');

    if (!idEmail || !idContra) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEmail, idContra })
    });

    const data = await response.json();
    message.innerHTML = data.message || 'Error al iniciar sesión';

    if (data.message === 'Usuario no encontrado') {

        const response = await fetch(`${API_URL}/login-admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idEmail, idContra })
        });
    
        const data = await response.json();
        message.innerHTML = data.message || 'Error al iniciar sesión';

        if (data.message === 'Admin Inicio de sesión exitoso') {
            window.location.href = 'PaginaAdmin.html'; // Redirigir a la página de bienvenida
        }
    }

    if (data.message === 'User Inicio de sesión exitoso') {
        window.location.href = 'index.html'; // Redirigir a la página de bienvenida
    } 
    
});


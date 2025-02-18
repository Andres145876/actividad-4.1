const API_URL = 'http://localhost:5000/api';

// Evento para mostrar/ocultar tabla de usuarios
document.getElementById('toggleUsers').addEventListener('click', async function () {
    const table = document.getElementById('usersTable');
    if (table.style.display === 'none' || table.style.display === '') {
        await fetchUsers();
        table.style.display = 'table';
    } else {
        table.style.display = 'none';
    }
});

// Evento para mostrar/ocultar tabla de administradores
document.getElementById('toggleAdmins').addEventListener('click', async function () {
    const table = document.getElementById('adminsTable');
    if (table.style.display === 'none' || table.style.display === '') {
        await fetchAdmins();
        table.style.display = 'table';
    } else {
        table.style.display = 'none';
    }
});

// Obtener y mostrar usuarios
async function fetchUsers() {
    const response = await fetch(`${API_URL}/ver-usuarios`);
    const users = await response.json();
    const table = document.getElementById('usersTable');
    table.innerHTML = `<tr><th>Nombre</th><th>Email</th><th>Acciones</th></tr>`; // Limpiar tabla

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.idNombre}</td>
            <td>${user.idEmail}</td>
            <td><button onclick="deleteUser('${user._id}')">Eliminar</button></td>
        `;
        table.appendChild(row);
    });
}

// Obtener y mostrar administradores
async function fetchAdmins() {
    const response = await fetch(`${API_URL}/ver-admins`);
    const admins = await response.json();
    const table = document.getElementById('adminsTable');
    table.innerHTML = `<tr><th>Nombre</th><th>Email</th></tr>`; // Limpiar tabla

    admins.forEach(admin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${admin.idNombre}</td>
            <td>${admin.idEmail}</td>
        `;
        table.appendChild(row);
    });
}

// Función para eliminar un usuario
async function deleteUser(userId) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
        try {
            const response = await fetch(`${API_URL}/eliminar-usuario/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            } else {
                const data = await response.json();
                alert(data.message);
                fetchUsers(); // Recargar la lista de usuarios después de eliminar
            }
        } catch (error) {
            alert('Error de red: ' + error.message);
        }
    }
}

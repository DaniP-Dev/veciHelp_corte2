document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay un usuario logueado en localStorage
    // const user = JSON.parse(localStorage.getItem('loggedInUser'));
    // if (!user) {
    //     // Si no hay usuario logueado, redirigir a la página de login
    //     window.location.href = '../html/login.html';
    //     return;
    // }

    // Función para cerrar sesión
    window.cerrarSesion = () => {
        localStorage.removeItem('loggedInUser');
        alert('Sesión cerrada');
        window.location.href = '../html/login.html';
    };

    // URL del JSON en jsonbin.io
    const url = 'https://api.jsonbin.io/v3/b/67b7ce73ad19ca34f80bf4c0/latest';
    const updateUrl = 'https://api.jsonbin.io/v3/b/67b7ce73ad19ca34f80bf4c0';
    const masterKey = '$2a$10$8HR0zGu23DsNJ2GtZGOy5uONK47ZmdqXtdyTUOn8PlxSSX12TCSC2';

    let usuarioGlobal; // Variable para almacenar el usuario globalmente

    // Función para cargar los datos del JSON
    const cargarDatos = () => {
        axios.get(url, {
            headers: {
                'X-Master-Key': masterKey
            }
        })
            .then(response => {
                const usuario = response.data.record.usuarios[0];
                usuarioGlobal = usuario;
                // Actualizamos el nombre del usuario en el header
                document.getElementById('nombreUser').textContent = usuario.nombre;
                console.log('Datos del usuario:', usuario);
                mostrarDatosPersonales(usuario);
                mostrarServicios(usuario);
                mostrarHistorial(usuario);
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    };

    // Función para mostrar los datos personales
    const mostrarDatosPersonales = (usuario) => {
        const tablaDatosPersonales = document.querySelector('.tablas table:nth-of-type(1) tbody');
        tablaDatosPersonales.innerHTML = ''; // Limpia la tabla antes de agregar filas
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.direccion}</td>
            <td><button onclick="editarDatosPersonales()">Editar</button></td>
        `;
        tablaDatosPersonales.appendChild(fila);
    };

    // Función para mostrar los servicios ofrecidos
    const mostrarServicios = (usuario) => {
        const tablaServicios = document.querySelector('.tablas table:nth-of-type(2) tbody');
        tablaServicios.innerHTML = ''; // Limpia la tabla antes de agregar filas
        usuario.servicios.forEach((servicio, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${servicio.servicio}</td>
                <td>${servicio.descripcion}</td>
                <td>$${servicio.precio}</td>
                <td>
                    <button onclick="editarFilaServicio(${index})">Editar</button>
                    <button onclick="eliminarFilaServicio(${index})">Eliminar</button>
                </td>
            `;
            tablaServicios.appendChild(fila);
        });
    };

    // Función para mostrar el historial
    const mostrarHistorial = (usuario) => {
        const tablaHistorial = document.querySelector('.tablas table:nth-of-type(3) tbody');
        tablaHistorial.innerHTML = ''; // Limpia la tabla antes de agregar filas
        usuario.historial.forEach(historial => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${historial.fecha}</td>
                <td>${historial.servicio}</td>
                <td>${historial.proveedor}</td>
            `;
            tablaHistorial.appendChild(fila);
        });
    };

    // Función para editar los datos personales
    window.editarDatosPersonales = () => {
        const nuevoNombre = prompt('Editar Nombre:', usuarioGlobal.nombre);
        const nuevoCorreo = prompt('Editar Correo:', usuarioGlobal.correo);
        const nuevoTelefono = prompt('Editar Teléfono:', usuarioGlobal.telefono);
        const nuevaDireccion = prompt('Editar Dirección/Conjunto:', usuarioGlobal.direccion);

        if (nuevoNombre && nuevoCorreo && nuevoTelefono && nuevaDireccion) {
            usuarioGlobal.nombre = nuevoNombre;
            usuarioGlobal.correo = nuevoCorreo;
            usuarioGlobal.telefono = nuevoTelefono;
            usuarioGlobal.direccion = nuevaDireccion;
            actualizarDatos();
            mostrarDatosPersonales(usuarioGlobal);
        }
    };

    // Función para editar una fila de servicio
    window.editarFilaServicio = (index) => {
        const servicio = usuarioGlobal.servicios[index];
        const nuevoServicio = prompt('Editar Servicio:', servicio.servicio);
        const nuevaDescripcion = prompt('Editar Descripción:', servicio.descripcion);
        const nuevoPrecio = prompt('Editar Precio:', servicio.precio);

        if (nuevoServicio && nuevaDescripcion && nuevoPrecio) {
            usuarioGlobal.servicios[index] = {
                servicio: nuevoServicio,
                descripcion: nuevaDescripcion,
                precio: parseFloat(nuevoPrecio)
            };
            actualizarDatos();
            mostrarServicios(usuarioGlobal);
        }
    };

    // Función para eliminar una fila de servicio
    window.eliminarFilaServicio = (index) => {
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            usuarioGlobal.servicios.splice(index, 1);
            actualizarDatos();
            mostrarServicios(usuarioGlobal);
        }
    };

    // Función para agregar un nuevo servicio
    window.crearFila = () => {
        const nuevoServicio = prompt('Nuevo Servicio:');
        const nuevaDescripcion = prompt('Nueva Descripción:');
        const nuevoPrecio = prompt('Nuevo Precio:');

        if (nuevoServicio && nuevaDescripcion && nuevoPrecio) {
            usuarioGlobal.servicios.push({
                servicio: nuevoServicio,
                descripcion: nuevaDescripcion,
                precio: parseFloat(nuevoPrecio)
            });
            actualizarDatos();
            mostrarServicios(usuarioGlobal);
        }
    };

    // Función para actualizar los datos en jsonbin.io
    const actualizarDatos = () => {
        axios.put(updateUrl, { usuarios: [usuarioGlobal] }, {
            headers: {
                'X-Master-Key': masterKey,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Datos actualizados:', response.data);
            })
            .catch(error => console.error('Error al actualizar los datos:', error));
    };

    // Cargar los datos al cargar la página
    cargarDatos();
});
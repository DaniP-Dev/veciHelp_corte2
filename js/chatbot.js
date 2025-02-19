const botonChatbot = () => {
    const chatbotComponente = document.getElementById('chatbotComponente');
    if (chatbotComponente.style.display === 'none' || chatbotComponente.style.display === '') {
        const iframe = document.createElement('iframe');
        iframe.src = '../html/chatbot.html';
        iframe.style.width = '60%';
        iframe.style.height = '600px';
        iframe.frameBorder = '0'; // Eliminar el borde del iframe
        iframe.style.position = 'fixed'; // Posición fija
        iframe.style.bottom = '60px'; // Ajustar la posición desde abajo a 60px
        iframe.style.right = '80px'; // Ajustar la posición desde la derecha
        iframe.style.transition = 'transform 0.3s ease-in-out'; // Añadir transición
        iframe.style.transform = 'translateY(100%)'; // Inicialmente fuera de la vista

        // Media query para dispositivos móviles
        if (window.matchMedia("(max-width: 768px)").matches) {
            iframe.style.width = '70%';
            iframe.style.height = '600px';
            iframe.style.bottom = '20px';
            iframe.style.right = '5%';
            iframe.style.position = 'fixed'; // Posición fija
            iframe.style.bottom = '60px'; // Ajustar la posición desde abajo a 60px
            iframe.style.right = '80px'; // Ajustar la posición desde la derecha
        }

        chatbotComponente.innerHTML = ''; // Limpiar el contenido del div
        chatbotComponente.appendChild(iframe); // Agregar el iframe al div
        chatbotComponente.style.display = 'block'; // Mostrar el div

        // Forzar reflujo para que la transición funcione
        setTimeout(() => {
            iframe.style.transform = 'translateY(0)';
        }, 0);
    } else {
        const iframe = chatbotComponente.querySelector('iframe');
        iframe.style.transform = 'translateY(100%)'; // Mover fuera de la vista
        setTimeout(() => {
            chatbotComponente.style.display = 'none';
        }, 300); // Esperar a que termine la transición antes de ocultar el div
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botonEnviar').addEventListener('click', () => {
        const entradaUsuario = document.getElementById('entradaUsuario').value;
        if (entradaUsuario.trim() === "") return;

        // Mostrar el mensaje del usuario en el chat
        mostrarMensaje('Usuario', entradaUsuario);

        // Enviar el mensaje al servidor de FastAPI usando axios
        axios.post('http://127.0.0.1:3000/send_message', {
            message: entradaUsuario
        })
            .then(response => {
                // Mostrar la respuesta del bot en el chat
                if (response.data && response.data.length > 0) {
                    response.data.forEach(res => {
                        mostrarMensaje('Bot', res.text);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensaje('Bot', 'Hubo un error al enviar el mensaje.');
            });

        // Limpiar el campo de entrada
        document.getElementById('entradaUsuario').value = '';
    });
});

const mostrarMensaje = (remitente, mensaje) => {
    const divChat = document.getElementById('chat');
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje');
    nuevoMensaje.innerHTML = `<strong>${remitente}:</strong> ${mensaje}`;
    divChat.appendChild(nuevoMensaje);
    divChat.scrollTop = divChat.scrollHeight;
};

function enviarMensaje() {
    console.log("enviarMensaje function called");
    const entradaUsuario = document.getElementById('entradaUsuario').value;
    console.log("User input:", entradaUsuario);
    
    if (entradaUsuario.trim() === "") {
        console.log("Empty input, returning");
        return;
    }

    // Assuming there's a function to send the message to the server
    sendMessageToServer(entradaUsuario)
        .then(response => {
            console.log("Server response:", response);
            // Process the response and update the chat
        })
        .catch(error => {
            console.error("Error sending message to server:", error);
        });
}

// Example function to simulate sending a message to the server
function sendMessageToServer(message) {
    console.log("sendMessageToServer called with message:", message);
    return new Promise((resolve, reject) => {
        // Simulate server response
        setTimeout(() => {
            resolve("Server received: " + message);
        }, 1000);
    });
}
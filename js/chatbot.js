const botonChatbot = () => {
    const chatbotComponente = document.getElementById('chatbotComponente');
    if (chatbotComponente.style.display === 'none' || chatbotComponente.style.display === '') {
        const iframe = document.createElement('iframe');
        iframe.src = '../html/chatbot.html';
        iframe.style.width = '50%';
        iframe.style.height = '500px';
        iframe.frameBorder = '0'; // Eliminar el borde del iframe
        iframe.style.position = 'fixed'; // Posición fija
        iframe.style.bottom = '60px'; // Ajustar la posición desde abajo a 60px
        iframe.style.right = '80px'; // Ajustar la posición desde la derecha
        iframe.style.transition = 'transform 0.3s ease-in-out'; // Añadir transición
        iframe.style.transform = 'translateY(100%)'; // Inicialmente fuera de la vista

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

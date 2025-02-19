const botonChatbot = () => {
    const chatbotComponente = document.getElementById('chatbotComponente');
    if (chatbotComponente.style.display === 'none') {
        const iframe = document.createElement('iframe');
        iframe.src = 'html/chatbot.html';
        iframe.style.width = '50%';
        iframe.style.height = '500px';
        iframe.frameBorder = '0'; // Eliminar el borde del iframe
        chatbotComponente.innerHTML = ''; // Limpiar el contenido del div
        chatbotComponente.appendChild(iframe); // Agregar el iframe al div
        chatbotComponente.style.display = 'block'; // Mostrar el div
    } else {
        chatbotComponente.style.display = 'none';
    }
};

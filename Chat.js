const messageInpt = document.getElementById ("MessageInpt")
const BtnMessage = document.getElementById ("BtnMessage")
const BtnLocation = document.getElementById ("BtnLocation")
const chatContainer = document.getElementById ("chat-container")

const socket = new WebSocket('wss://echo.websocket.org/');

socket.addEventListener('open', (event) => {
    console.log('Соединение установлено');
});

socket.addEventListener('message', (event) => {
    const message = event.data;
    if (!message.startsWith("Моя геолокация: Широта")) {
        appendMessage('Получено: ' + message);
    }
});

socket.addEventListener('close', (event) => {
    console.log('Соединение закрыто');
    appendMessage('Соединение закрыто.');
});

socket.addEventListener('error', (event) => {
    console.error('Ошибка:', event);
    appendMessage('Ошибка при подключении.'); 
});

BtnMessage.addEventListener('click', () => {
    const message = messageInpt.value;
    if (message) {
        socket.send(message);
        appendMessage('Отправлено: ' + message);
        messageInpt.value = '';
    }
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; 
}

BtnLocation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const openStreetMapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
                socket.send(openStreetMapLink);
                appendMessage(`<a href="${openStreetMapLink}" target="_blank">Моя гео-локация</a>`);
            },
            (error) => {
                let errorMessage = "Не удалось получить геолокацию.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Доступ к геолокации запрещен.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Информация о местоположении недоступна.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Превышено время ожидания получения геолокации.";
                        break;
                }
                console.error("Ошибка получения геолокации:", error);
                appendMessage(errorMessage);
            }
        );
    } else {
        appendMessage("Геолокация не поддерживается в вашем браузере.");
    }
});
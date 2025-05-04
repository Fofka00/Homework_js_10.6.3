const BtnSize = document.getElementById("BtnSize")

BtnSize.addEventListener('click', () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    alert(`Размеры экрана:\nШирина: ${screenWidth}px\nВысота: ${screenHeight}px`);
});
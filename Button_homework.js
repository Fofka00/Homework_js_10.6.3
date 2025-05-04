const currentSvg = document.getElementById("currentSvg");
const btn = document.querySelector(".btn");

let currentIcon = 1;

btn.addEventListener('click', () => {
    currentIcon = (currentIcon === 1) ? 2 : 1;

    let newSrc;
    if (currentIcon === 1) {
        newSrc = '/Homework/Img/arrow-down-left-circle.svg';
    } else {
        newSrc = '/Homework/Img/arrow-down-left-circle-fill.svg';
    }

    currentSvg.src = newSrc;
});




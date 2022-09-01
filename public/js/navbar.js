const navToggle = document.querySelector('.navToggle');
const nav = document.querySelector('.nav');


navToggle.addEventListener('click', () => {
    nav.classList.toggle('navVisible');
})
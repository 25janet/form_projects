const wrapper = document.querySelector('.container');
const registerlink = document.querySelector('.register-link');
const loginlink = document.querySelector('.login-link');
registerlink.onclick = () => {
    wrapper.classList.add('active');
}
loginlink.onclick = () => {
    wrapper.classList.remove('active');
}
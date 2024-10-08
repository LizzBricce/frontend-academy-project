import { getData } from "./utils.js";
// import {login} from "./login.js";

const renderUserList = (userList) => {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = userList.length === 0
        ? '<p>No users found.</p>'
        : '<ul>' + userList.map(({ name, email }) => `<li>${name} - ${email}</li>`).join('') + '</ul>';
};

document.querySelector('.btn-submit').addEventListener('click', async (event) => {
    event.preventDefault();

    const user = {
        id: null,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        characteristics: null,
        training: null,
    };

    try {
        const data = await getData('/user/add', 'POST', user);

        showMessage(`User criado`);
        // const body = { email: user.email, password: user.password };
        // data = await getData("/login", 'POST', body);

        // if (!data.errorMessage) {
        //     localStorage.setItem("user", JSON.stringify(data));
        // }

        // const userList = await getData('/user/list', 'GET');
        // renderUserList(userList);
    } catch (error) {

        showError(`Error`);
    }
});

const showMessage = (message) => {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
};

const showError = (error) => {
    const errorDiv = document.querySelector('.error');
    errorDiv.textContent = error;
    errorDiv.classList.remove('hidden');
};

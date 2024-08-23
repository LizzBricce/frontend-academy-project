import { getData } from "../utils.js";

const renderUserList = (userList) => {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = userList.length === 0
        ? '<p>No users found.</p>'
        : '<ul>' + userList.map(({ name, email }) => `<li>${name} - ${email}</li>`).join('') + '</ul>';
};

document.querySelector('.button-submit').addEventListener('click', async (event) => {
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
        document.getElementById('resultMessage').innerText = `User created: ${data}`;

        // Atualizar a lista de usuários
        const userList = await getData('/user/list', 'GET');
        renderUserList(userList);
    } catch (error) {
        document.getElementById('resultMessage').innerText = `Error: ${error.message}`;
    }
});

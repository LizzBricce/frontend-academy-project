import { getData } from 'js/getData.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await getData('/user_list', 'GET');
        const userListElement = document.getElementById('userList');

        users.forEach(({ name, email }) => {
            const userItem = document.createElement('li');
            userItem.textContent = `${name} (${email})`;
            userListElement.appendChild(userItem);
        });
    } catch (error) {
        document.getElementById('resultMessage').innerText = `Error: ${error.message}`;
    }
});

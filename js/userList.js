import { getData } from '../js/utils.js';

async function delete_user() {


    window.event.preventDefault();

    const userInfos = JSON.parse(localStorage.getItem('user'));

    const user = {
        ...userInfos
    };

    try {
        const data = await getData(`/delete/${user.id}`, 'POST');

        // TODO: remove from localStorage
        // localStorage.setItem("user", JSON.stringify(updatedUser));

        // showMessage(Characteristics created: ${data});
    } catch (error) {
        // showError(Error: ${error.message});
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const messageDiv = document.querySelector('.message');
    const errorDiv = document.querySelector('.error');

    try {
        const users = await getData('/user/list', 'GET');
        const userTableBody = document.getElementById('userTableBody');

        if (!userTableBody) {
            throw new Error('Element with ID "userTableBody" not found.');
        }

        if (users.length === 0) {
            messageDiv.textContent = 'No users found.';
            messageDiv.classList.remove('hidden');
        } else {
            users.forEach(({ id, name, email }) => {
                const row = document.createElement('tr');
                row.onclick = async () => {


                    window.event.preventDefault();

                    const userInfos = JSON.parse(localStorage.getItem('user'));

                    const user = {
                        ...userInfos
                    };

                    try {
                        const data = await getData(`/delete/${user.id}`, 'POST');

                       
                        // localStorage.setItem("user", JSON.stringify(updatedUser));

                        // showMessage(Characteristics created: ${data});
                    } catch (error) {
                        // showError(Error: ${error.message});
                    }
                
            }
                row.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    
                `;
            // <form action="/delete" method="post">
            // <button type="submit" name="action" value="edit_user">Edit</button>
            userTableBody.appendChild(row);
        });
        }
    } catch (error) {
    errorDiv.textContent = `Error: ${error.message}`;
    errorDiv.classList.remove('hidden');
    console.error(`Error: ${error.message}`);
}
});

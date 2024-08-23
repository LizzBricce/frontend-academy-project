// js/userList.js

import { getData } from './getData.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const users = await getData('/user_list', 'GET');
        const userTableBody = document.getElementById('userTableBody');

        if (!userTableBody) {
            throw new Error('Element with ID "userTableBody" not found.');
        }

        users.forEach(({ id, name, email }) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>
                    <form action="/manage_users" method="post">
                        <input type="hidden" name="id" value="${id}"/>
                        <button type="submit" name="action" value="delete_user">Delete</button>
                        <button type="submit" name="action" value="edit_user">Edit</button>
                    </form>
                </td>
            `;

            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Optionally display error message to the user
    }
});

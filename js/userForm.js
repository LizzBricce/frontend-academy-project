import { getData } from "./utils.js";

const renderUserList = (userList) => {
    const userListDiv = document.getElementById('userList');
		
		if(userListDiv !== null){
	    userListDiv.innerHTML = userList.length === 0
  	      ? '<p>No users found.</p>'
    	    : '<ul>' + userList.map(({ name, email }) => `<li>${name} - ${email}</li>`).join('') + '</ul>';
		}else
			console.log(`Element not found`);
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

        showMessage(`User created: ${data}`);


        const userList = await getData('/user/list', 'GET');
        renderUserList(userList);
    } catch (error) {

        showError(`Error: ${error.message}`);
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

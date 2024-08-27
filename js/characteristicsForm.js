import { getData } from "./js/utils.js";

document.querySelector('.button-submit').addEventListener('click', async (event) => {
    event.preventDefault();

    const userInfos = JSON.parse(localStorage.getItem('user'));

    const characteristics = {
        weight: parseFloat(document.querySelector('#weight').value),
        height: parseFloat(document.querySelector('#height').value),
        gender: document.querySelector('#gender').value,
        age: parseInt(document.querySelector('#age').value, 10),
        physicalGoal: document.querySelector('#physicalGoal').value
    };

    const user = {
        ...userInfos,
        characteristics
    };

    try {
        const data = await getData('/characteristics/add', 'POST', user);
        const updatedUser = await getData(`/user/profile/${user.id}`, 'GET');
        
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        showMessage(`Characteristics created: ${data}`);
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


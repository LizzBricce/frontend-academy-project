import { getData } from "./utils.js";
import {updateProfile, fetchUserData} from "./userProfile.js";

document.querySelector(".btn-enviar").addEventListener("click", async () => {
    let user = JSON.parse(localStorage.getItem("user"));

    try {
        const data = await getData("/api/generate_training", "POST", user);
        const updatedUser = await getData(`/user/profile/${user.id}`, 'GET');
        
        localStorage.setItem("user", JSON.stringify(updatedUser));

        
        showMessage(`Treino gerado com sucesso`);
        user = await fetchUserData();
        
        updateProfile(user);
    } catch (error) {
        
        showError(`Erro ao gerar treino: ${error.message}`);
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

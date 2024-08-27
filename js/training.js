import { getData } from "./js/utils.js";

document.querySelector(".btn-enviar").addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const data = await getData("/api/generate_training", "POST", user);
        const updatedUser = await getData(`/user/profile/${user.id}`, 'GET');
        
        localStorage.setItem("user", JSON.stringify(updatedUser));

        
        showMessage(`Treino gerado com sucesso: ${JSON.stringify(data)}`);
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

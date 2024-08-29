import { getData } from "./utils.js";

const login = async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const body = { email, password };
    const data = await getData("/login", 'POST', body);

    if (data.errorMessage) {
        showErrors(data.errorMessage);
    } else {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "./userProfile.html";
    }
};





const showErrors = (error) => {
    const errorDiv = document.querySelector(".error");
    errorDiv.textContent = error;
    errorDiv.classList.remove("hidden");
};

const showMessage = (message) => {
    const messageDiv = document.querySelector(".message");
    messageDiv.textContent = message;
    messageDiv.classList.remove("hidden");
};
export {login}

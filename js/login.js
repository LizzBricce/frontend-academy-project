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
        // window.location.href = "./user-profile.html";
    }
};

const showErrors = (error) => {
    document.querySelector(".error").textContent = error;
};


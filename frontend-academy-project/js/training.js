import { getData } from "../utils.js";

document.querySelector(".btn-enviar").addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await getData("/api/generate_training", "POST", user);
    const updatedUser = await getData(`/user/profile/${user.id}`, 'GET');
    
    localStorage.setItem("user", JSON.stringify(updatedUser));

    console.log(data);
});

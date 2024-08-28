import { getData } from "./utils.js";

async function fetchUserData() {
    const errorDiv = document.querySelector('.error');
    const messageDiv = document.querySelector('.message');

    const user = JSON.parse(localStorage.getItem("user"))
    
    try {
        const data = await getData(`/user/profile/${user.id}`, 'GET');
        
        messageDiv.textContent = 'Dados do usuário carregados com sucesso!';
        messageDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove('hidden');
        messageDiv.classList.add('hidden');
        return null;
    }
}

function setUserIcon(gender) {
    const userIcon = document.getElementById('user-icon');
    gender = gender ? gender.toUpperCase() : 'FEMININO';
    userIcon.src = `images/${gender}.png`;
}

function updateProfile(user) {
    const notLoggedIn = document.getElementById('not-logged-in');
    const profileInfo = document.getElementById('profile-info');
    const trainingSection = document.getElementById('training-section');

    if (user) {
        if (profileInfo) {
            profileInfo.classList.remove('hidden');
        }

        const userName = document.getElementById('user-name');
        if (userName) {
            userName.textContent = user.name;
        }

        const userEmail = document.getElementById('user-email');
        if (userEmail) {
            userEmail.textContent = user.email;
        }

        const userCharacteristics = document.getElementById('user-characteristics');
        const noPhysicalCharacteristics = document.getElementById('no-physical-characteristics');
        if (user.physicalProfile) {
            if (userCharacteristics) {
                userCharacteristics.classList.remove('hidden');
            }
            if (noPhysicalCharacteristics) {
                noPhysicalCharacteristics.classList.add('hidden');
            }

            setUserIcon(user.physicalProfile.gender);
            document.getElementById('user-weight').textContent = user.physicalProfile.weight;
            document.getElementById('user-height').textContent = user.physicalProfile.height;
            document.getElementById('user-gender').textContent = user.physicalProfile.gender;
            document.getElementById('user-age').textContent = user.physicalProfile.age;
            document.getElementById('user-physical-goal').textContent = user.physicalProfile.physicalGoal;
        } else {
            if (userCharacteristics) {
                userCharacteristics.classList.add('hidden');
            }
            if (noPhysicalCharacteristics) {
                noPhysicalCharacteristics.classList.remove('hidden');
            }
        }

        const trainingInfo = document.getElementById('training-info');
        const noTraining = document.getElementById('no-training');
        if (user.training) {
            if (trainingInfo) {
                trainingInfo.classList.remove('hidden');
            }
            if (noTraining) {
                noTraining.classList.add('hidden');
            }
            const trainingDescription = document.getElementById('training-description');
            if (trainingDescription) {
                trainingDescription.textContent = user.training.fullTraining;
            }
        } else {
            if (trainingInfo) {
                trainingInfo.classList.add('hidden');
            }
            if (noTraining) {
                noTraining.classList.remove('hidden');
            }
        }

        const errorDiv = document.querySelector('.error');
        const messageDiv = document.querySelector('.message');

        messageDiv.textContent = 'Perfil atualizado com sucesso!';
        messageDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');

        if (notLoggedIn) {
            notLoggedIn.classList.add('hidden');
        }
    } else {
        const errorDiv = document.querySelector('.error');
        const messageDiv = document.querySelector('.message');

        messageDiv.textContent = '';
        errorDiv.textContent = 'Usuário não está logado.';
        errorDiv.classList.remove('hidden');
        messageDiv.classList.add('hidden');

        if (profileInfo) {
            profileInfo.classList.add('hidden');
        }
        if (trainingSection) {
            trainingSection.classList.add('hidden');
        }
        if (notLoggedIn) {
            notLoggedIn.classList.remove('hidden');
        }
    }
}

async function init() {
    const user = await fetchUserData();
    console.log(user);
    updateProfile(user);
}

init();

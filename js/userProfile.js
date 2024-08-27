async function fetchUserData() {
    const errorDiv = document.querySelector('.error');
    const messageDiv = document.querySelector('.message');
    
    try {
        const response = await fetch('/api/user');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
        if (user.characteristics) {
            if (userCharacteristics) {
                userCharacteristics.classList.remove('hidden');
            }
            if (noPhysicalCharacteristics) {
                noPhysicalCharacteristics.classList.add('hidden');
            }

            setUserIcon(user.characteristics.gender);
            document.getElementById('user-weight').textContent = user.characteristics.weight;
            document.getElementById('user-height').textContent = user.characteristics.height;
            document.getElementById('user-gender').textContent = user.characteristics.gender;
            document.getElementById('user-age').textContent = user.characteristics.age;
            document.getElementById('user-physical-goal').textContent = user.characteristics.physicalGoal;
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
                trainingDescription.textContent = user.training.description;
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
    updateProfile(user);
}

init();

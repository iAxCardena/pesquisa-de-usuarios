// console.log("Katchaw");
let inputId = null;
let buttonId = null;

let userListId = null;
let statsListId = null;

let tabUsers = [];
let tabStatistics = [];
let filteredTabUsers = [];

function start() {
    fillDOM();
    fetchUsers();
    handleSearch();
}

function fillDOM() {
    inputId = document.getElementById('search-input');
    buttonId = document.getElementById('search-button');
    userListId = document.getElementById('tab-users');
    statsListId = document.getElementById('tab-stats');
}

async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    tabUsers = json.results.map(user => {
        const { gender, name, dob, picture } = user;

        return {
            gender,
            name: name.first + ' ' + name.last,
            age: dob.age,
            picture: picture.thumbnail
        };
    });
}

function handleSearch() {
    buttonId.addEventListener('click', () => {
        const inputValue = inputId.value.toLowerCase();
        
        filterUsers(inputValue);
        // console.log(inputValue);
    });

    inputId.addEventListener('keypress', () => {
        const {key} = event;
        const {value} = event.target;
        
        if(key === "Enter"){
            filterUsers(value);
        }
    });
}

function filterUsers(filterValue) {
    filteredTabUsers = tabUsers.filter(({name}) => {
        return name.toLowerCase().includes(filterValue);
    });

    renderUsers();
    renderStats();
}

function renderUsers(){
    userListId.innerHTML = ' ';
    let usersHTML = '<div>';

    filteredTabUsers.forEach(user => {
        const {name, age, picture, gender} = user;

        userListId.innerHTML = `<h2>${filteredTabUsers.length} usuarios(as) encontrados(as)</h2>`
        
        const userHTML = `
            <div class='user'>
                <div>
                    <img src="${picture}" alt="${name}">
                </div>
                <div>
                    <span>${name},</span>
                </div>
                <div>
                    <span>${age}</span>
                </div>
            </div>
        `;

        usersHTML += userHTML;
    });

    usersHTML += '</div>';
    userListId.innerHTML += usersHTML;
}

function renderStats() {
    let maleCount = 0;
    let femaleCount = 0;
    let sumAge = 0;
    let averageAge = 0;

    filteredTabUsers.forEach(user => {
        const{age, gender} = user;

        if(gender === 'male'){
            maleCount++;
        }else{
            femaleCount++;
        }

        sumAge += age;
        averageAge += age;
    });

    statsListId.innerHTML = '<h2>Estatísticas</h2>';
    let statsHTML = '<div>';

    const statHTML = `
            <div class='stats'>
                <div>
                    <p>Sexo masculino: ${maleCount}</p>
                </div>
                <div>
                    <p>Sexo feminino: ${femaleCount}</p>
                </div>
                <div>
                    <p>Soma das idades: ${sumAge}</p>
                </div>
                <div>
                    <p>Media das idades: ${(averageAge/filteredTabUsers.length).toFixed(2)}</p>
                </div>
            </div>
        `;

        statsHTML += statHTML;

    statsHTML += '</div>';
    statsListId.innerHTML += statsHTML;
}

start();
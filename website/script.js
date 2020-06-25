let container = document.querySelector("#tabelPlante");
let butonNou = document.querySelector("#afisarePlante");
let count = 0;
listeazaPlante()
async function listeazaPlante() {
    container.innerHTML = `<table id="tabelPlante">
        <tr>
            <th>Nume</th>
            <th>Plantare</th>
            <th>Culegere</th>
            <th>creion.jpg</th>
        </tr>
    </table>`;
    const response = await fetch('http://localhost:3000/plante');
    const listaPlante = await response.json();


    listaPlante.forEach(planta => {
        const temp = ` 
                <tr id="${planta.id}">
                    <td>${planta.nume}</td>
                    <td>${planta.plantat}</td>
                    <td>${planta.cules}</td>
                    <td>
                        <button class="deleteButton">Delete</button>
                    </td>
                </tr>`

        container.insertAdjacentHTML('beforeend', temp);
    });
    const trashArray = document.querySelectorAll(".deleteButton");
    console.log(trashArray);
    trashArray.forEach(trash => {
        trash.addEventListener("click", async function () {
            let iddel = trash.parentElement.parentElement.id;
            console.log("id este", trash.parentElement.parentElement.id);
            let URL = "http://localhost:3000/remove/" + iddel;
            console.log(URL);
            const newPlantlist = await deletePlant(URL);

        })
    });
    return false;
}
async function deletePlant(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    });
    listeazaPlante();
    return response.json();
}

butonNou.addEventListener("click", function () {
    listeazaPlante()
    count = count + 1;
    console.log(count);
    return false;
});

butonNou = document.querySelector("#adaugaPlante");

butonNou.addEventListener("click", async function () {
    const nume = document.querySelector("#subnume").value;
    const plantat = document.querySelector("#subplant").value;
    const cules = document.querySelector("#subcules").value;

    const newPlant = {
        nume: nume,
        plantat: plantat,
        cules: cules
    }

    const newPlantlist = await postData('http://localhost:3000/add', newPlant)

    listeazaPlante();
    return false;
})

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

butonNou = document.querySelector("#submitForm");

butonNou.addEventListener("click", async function(){
    let username= document.querySelector("#username").value;
    let email= document.querySelector("#email").value;
    let parola= document.querySelector("#parola").value;
    let adaugari=[];
    let temp = {
        "username": username,
        "email": email,
        "parola": parola,
        "adaugari": adaugari
    }
    await window.localStorage.setItem('user', username);
    closeForm();
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("greeting").innerText= "Bine ai venit " + window.localStorage.getItem('user');

    await postData('http://localhost:3000/login',temp);


    return false;
})

function openForm() {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("loginForm").style.flexDirection = "column";

    document.getElementById("loginButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "block";

}
function closeForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("cancelButton").style.display = "none";
}











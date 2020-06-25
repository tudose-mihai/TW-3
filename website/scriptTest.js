let container = document.querySelector("#tabelPlante");
let count = 0;

listeazaPlante();

async function listeazaPlante() {
    container.innerHTML = `<table id="tabelPlante">
        <tr>
            <th>Nume</th>
            <th>Plantare</th>
            <th>Culegere</th>
        </tr>
    </table>`;
    const response = await fetch('http://localhost:3000/plante')

    const listaPlante = await response.json();


    listaPlante.forEach(planta => {
        const temp = ` 
                <tr id="${planta.id}">
                    <td>${planta.nume}</td>
                    <td>${planta.plantat}</td>
                    <td>${planta.cules}</td>
                </tr>`

        container.insertAdjacentHTML('beforeend', temp);
    });
    if (window.localStorage.getItem('user'))
        document.getElementById("greeting").innerText = "Bine ai venit " + window.localStorage.getItem('user');

}

async function ascundePlante() {
    container.innerHTML = `<table id="tabelPlante">
        <tr>
            <th>Nume</th>
            <th>Plantare</th>
            <th>Culegere</th>
        </tr>
    </table>`;
    if (window.localStorage.getItem('user'))
        document.getElementById("greeting").innerText = "Bine ai venit " + window.localStorage.getItem('user');

}

let butonNou = document.querySelector("#afisarePlante");

butonNou.addEventListener("click", function () {
    listeazaPlante();
    count = count + 1;
    console.log(count);
});


butonNou = document.querySelector("#ascundePlante");

butonNou.addEventListener("click", function () {
    ascundePlante();
});


//https://stackoverflow.com/questions/3144711/find-the-time-left-in-a-settimeout/20745721
function timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}





document.querySelector("#usor").addEventListener("click", async function () {
    const response = await fetch('http://localhost:3000/plante')
    const listaPlante = await response.json();
    const randomElement = listaPlante[Math.floor(Math.random() * listaPlante.length)];
    document.querySelector("#numeJoc").innerText = randomElement.nume;
    let scor = 0;
    let timeoutID;
    timeoutID = window.setTimeout(window.alert, 10 * 1000, "Stop! Ai depasit timpul");

    console.log(randomElement.plantat);
    console.log(randomElement.cules);

    document.querySelector("#submitRas").addEventListener("click", function () {
        let plantRas = document.querySelector("#plantRas").value;
        let culesRas = document.querySelector("#culesRas").value;

        console.log(plantRas);
        console.log(culesRas);

        if (plantRas == randomElement.plantat)
            scor = scor + 0.5;
        if (culesRas == randomElement.cules)
            scor = scor + 0.5;
        console.log(scor);
        window.clearTimeout(timeoutID);
        window.alert("Ai reusit: "+scor);
    })


    return false;
})
document.querySelector("#mediu").addEventListener("click", async function () {
    const response = await fetch('http://localhost:3000/plante')
    const listaPlante = await response.json();
    const randomElement = listaPlante[Math.floor(Math.random() * listaPlante.length)];
    document.querySelector("#numeJoc").innerText = randomElement.nume;
    let scor = 0;
    let timeoutID;
    timeoutID = window.setTimeout(window.alert, 6 * 1000, "Stop! Ai depasit timpul");
    console.log(randomElement.plantat);
    console.log(randomElement.cules);

    document.querySelector("#submitRas").addEventListener("click", function () {
        let plantRas = document.querySelector("#plantRas").value;
        let culesRas = document.querySelector("#culesRas").value;

        console.log(plantRas);
        console.log(culesRas);

        if (plantRas == randomElement.plantat)
            scor = scor + 0.5;
        if (culesRas == randomElement.cules)
            scor = scor + 0.5;
        console.log(scor);
        window.clearTimeout(timeoutID);
        window.alert("Ai reusit: "+scor);
    })


    return false;
})
document.querySelector("#dificil").addEventListener("click", async function () {
    const response = await fetch('http://localhost:3000/plante')
    const listaPlante = await response.json();
    const randomElement = listaPlante[Math.floor(Math.random() * listaPlante.length)];
    document.querySelector("#numeJoc").innerText = randomElement.nume;
    let scor = 0;
    let timeoutID;
    timeoutID = window.setTimeout(window.alert, 4 * 1000, "Stop! Ai depasit timpul");
    console.log(randomElement.plantat);
    console.log(randomElement.cules);

    document.querySelector("#submitRas").addEventListener("click", function () {
        let plantRas = document.querySelector("#plantRas").value;
        let culesRas = document.querySelector("#culesRas").value;

        console.log(plantRas);
        console.log(culesRas);

        if (plantRas == randomElement.plantat)
            scor = scor + 0.5;
        if (culesRas == randomElement.cules)
            scor = scor + 0.5;
        console.log(scor);
        window.clearTimeout(timeoutID);
        window.alert("Ai reusit: "+scor);
    })


    return false;
})


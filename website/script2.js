let canvas = document.getElementById("calCanvas");
let ctx = canvas.getContext("2d");
window.onload = startup;
let destX = canvas.width;
let destY = canvas.height;
let dayH = 80;
let dayW = 80;
let offsetH = 30;
let offsetW = 20;
let months= ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie","August", "Septembrie", "Octombrie","Noiembrie","Decembrie"];
let currMonth = 6;
let drawn = false;
let mouseX, mouseY;
let zi=0;

let elements = [];

for(var i=0; i<12; i++) {
    elements[i] = [];
    for(var j=0; j<31; j++) {
        elements[i][j] = undefined;
    }
}
// elements[month][day]
for(let i = 0; i < 12; i++){
    for(let j = 0; j < 31; j++)
    elements[i][j]={
        x: 0,
        y: 0,
        color: "black",
        title: "titlul zilei",
        descr: "descriere zi"
    };
}

function startup() {
    document.getElementById("calCanvas").onmousemove = mouseMove;
    document.getElementById("calCanvas").onclick = changeMonth;
    document.getElementById("calCanvas").ondblclick = addEvent;

    let butonNou = document.querySelector("#adaugaEvent");
    butonNou.addEventListener("click", async function () {
        const titlu = document.querySelector("#titlu").value;
        const descr = document.querySelector("#descriere").value;
        let colorValue = document.querySelector('input[name = "color"]:checked').value;

        console.log(colorValue);
        elements[currMonth][zi].title=titlu;
        elements[currMonth][zi].descr=descr;
        elements[currMonth][zi].color=colorValue;

        const newElement = [zi,currMonth,elements[currMonth][zi]];
        console.log(newElement);

        const newElements = await postData('http://localhost:3000/addevent', newElement);

        elements = newElements;

        document.getElementById("calForm").style.display = "none";

        return false;
    });
    getElements();
    loop();
}

async function getElements(){
    console.log("will fetch");
    const response = await fetch('http://localhost:3000/elements');
    console.log(response);
    elements = await response.json();
    console.log(elements);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        // mode: "no-cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

function changeMonth(){
    if(mouseX > 720 && mouseX< 720 + 170)
        if(mouseY > 20 && mouseY < 20 + 60){
            currMonth = ((currMonth%12 +12-1)%12);
        }
    else if(mouseX > 720 && mouseX< 720 + 170)
            if(mouseY > 100 && mouseY < 100 + 60){
                currMonth= (currMonth+1)%12;
            }
    console.log(currMonth);
}

function addEvent(){
    elements[currMonth].forEach(checkDClick);
}

function checkDClick(element,index){
    if(mouseX > element.x && mouseX < element.x + dayW)
    {
        if(mouseY > element.y && mouseY < element.y + dayH)
        {
            console.log("dclick");
            document.getElementById("calForm").style.display = "flex";
            document.getElementById("calForm").style.flexDirection = "column";

            zi = index;
        }
    }
}



function mouseMove(evt) {
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}
function drawAll() {
    offsetH = 10;
    offsetW = 10;

    elements[currMonth].forEach(drawElements);
    elements[currMonth].forEach(checkMouseover);

    ctx.beginPath();
    ctx.rect(720, 20, 200, 60);
    ctx.stroke();
    ctx.font = "36px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(months[((currMonth%12 +12-1)%12)], 720 + 15, 20 + 40);

    ctx.beginPath();
    ctx.rect(720, 100, 200, 60);
    ctx.stroke();
    ctx.font = "36px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(months[(currMonth+1)%12], 720 + 15, 100 + 40);
}
function drawElements(element,index) {
    if(index%7 === 0 && index > 0)
    {
        offsetH += dayH/2 + 10;
        offsetW  = 10;
    }
    if(element.x > 0)
         posX = element.x;
    else
        posX = element.x + offsetW*2;
    if(element.y > 0)
        posY = element.y;
    else
        posY = element.y + offsetH*2;


    ctx.beginPath();
    ctx.strokeStyle = element.color;
    ctx.rect(posX, posY, dayH, dayW);
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.fillStyle = element.color;
    ctx.fillText(index + 1 , posX + 5, posY + 20);

    offsetW += dayW/2 + 10;

    if(element.x===0)
        element.x=posX;
    if(element.y===0)
        element.y=posY;

    if(element.color === "red"){
    }
    else if(element.color === "yellow"){
    }
    else if(element.color === "green"){
    }
    drawn = true;
}
function checkMouseover(element) {
    if(mouseX > element.x && mouseX < element.x + dayW)
    {
        if(mouseY > element.y && mouseY < element.y + dayH)
        {
            console.log("running");
            ctx.font = "16px Arial underlined";
            ctx.fillStyle = "white";
            ctx.fillText(element.title , mouseX + 5, mouseY + 20);
            ctx.font = "16px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(element.descr , mouseX + 5, mouseY + 40);

            const link = document.getElementById("measure");
            if(element.title.length > element.descr.length)
                link.textContent= element.title;
            else
                link.textContent= element.descr;
            var textWidth = document.getElementById("measure").offsetWidth;



            ctx.beginPath();
            ctx.rect(mouseX, mouseY, textWidth+10, 50);
            ctx.stroke();

        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
}

loop();
function loop() {
        draw();
        requestAnimationFrame(loop);
}


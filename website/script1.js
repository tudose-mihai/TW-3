let canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var elements = [];
window.onload = startup;

var ballRadius = 30;
var x = canvas.width / 2;
var y = 2 * ballRadius;
var dx = 0;
var dy = 0;
var speed = 0.02;
var destX = canvas.width;
var destY = canvas.height;
var counter = 0;
var position = 0;
var visit = 0;
var score = 0;
var gresit = false;
var timpGresit = 0;
var failed = false;
elements = [
    {
        x: -50,
        y: -50,
        radius: 5,
        color: "grey"
    }
    ,
    {
        x: -50,
        y: -50,
        radius: 5,
        color: "grey"
    },
    {
        x: -50,
        y: -50,
        radius: 5,
        color: "grey"
    }
];

function startup() {
    document.getElementById("gameCanvas").onmousemove = mouseMove;
    loop();
}

document.getElementById("gameCanvas").onclick = startMovement;


function mouseMove(evt) {
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function startMovement() {
    destX = mouseX - 20;
    destY = mouseY - 30;
    dy = (destY - y);
    dx = (destX - x);
    elements.forEach(checkPosition);
    function checkPosition(element, index){
        if(mouseX > element.x-element.radius && mouseX < element.x+element.radius)
            if(mouseY > element.y-element.radius && mouseY < element.y+element.radius)
            {
                if(score === 0)
                {
                    gresit = true;
                }
                else {
                    elements[index] = {
                        x: -50,
                        y: -50,
                        radius: 5,
                        color: "grey"
                    }
                    score -= 1;
                }
                dy = 0;
                dx = 0;
            }
    }
}

function drawAll() {
    // ctx.beginPath();
    // ctx.arc(x + 28, y + 31, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();

    var img = document.getElementById('plant');
    ctx.drawImage(img, x, y, 60, 60);

    elements.forEach(drawElements);

    ctx.font = "20px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("Scor:" + score, 512, 25);

    if(gresit === true)
    {
        ctx.fillStyle = "blue";
        ctx.fillText("Nu aveti voie", mouseX, mouseY);

        timpGresit += 1;
        if(timpGresit >= 200)
        {
            gresit = false;
            timpGresit = 0;
        }
    }
}

function drawElements(element) {
    // ctx.beginPath();
    // ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
    // ctx.fillStyle = element.color;
    // ctx.fill();
    // ctx.closePath();
    var img2;
    if(element.color === "red")
        {
            img2 = document.getElementById('bug');
            ctx.drawImage(img2, element.x - 20, element.y - 20, element.radius*2, element.radius*2);
        }
    else if(element.color === "green"){
        img2 = document.getElementById('sun');
        ctx.drawImage(img2, element.x - 20, element.y - 20, element.radius*2, element.radius*2);
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
    x += dx * speed;
    y += dy * speed;
    if ((dx < 0 && x < destX) || (dx > 0 && x > destX))
        dx = 0;
    if ((dy < 0 && y < destY) || (dy > 0 && y > destY))
        dy = 0;
    elements.forEach(checkColision);
}

function checkColision(element,index){
    if((x + 10 > element.x-element.radius && x + 10 < element.x+element.radius) || (x + 40 > element.x-element.radius && x + 40 < element.x+element.radius ))
        if((y + 10 > element.y-element.radius && y + 10 < element.y+element.radius)||(y + 40 > element.y-element.radius && y + 40 < element.y+element.radius))
        {
            // alert("collision!");

            if(element.color == "green")
            {
                score+=1;
                elements[index] = {
                    x: -50,
                    y: -50,
                    radius: 5,
                    color: "grey"
                }
            }
            else if(element.color === "red")
               {
                    failed = true;
               }
        }
}

function drawRandom() {
        visit += 1;
        if(visit<5 && visit%2===0)
        {
            if (Math.random() > 0.6) {
            elements[position] = {
                x: Math.random() * 600,
                y: Math.random() * 600,
                radius: 15,
                color: "red"
            }
            console.log("added bad");
        } else {
            elements[position] = {
                x: Math.random() * 600,
                y: Math.random() * 600,
                radius: 20,
                color: "green"
            }
            console.log("added good");
        }
        position = (position + 1) % 3;
        }
        else{
            if(visit%5===0)
            {
                if (Math.random() > 0.6) {
                    elements[0] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 15,
                        color: "red"
                    }
                    console.log("added bad");
                } else {
                    elements[0] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 20,
                        color: "green"
                    }
                    console.log("added good");
                }
            }
            else if(visit%5===2)
            {
                if (Math.random() > 0.6) {
                    elements[1] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 15,
                        color: "red"
                    }
                    console.log("added bad");
                } else {
                    elements[1] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 20,
                        color: "green"
                    }
                    console.log("added good");
                }
            }
            else if(visit%5===4)
            {
                if (Math.random() > 0.8) {
                    elements[2] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 15,
                        color: "red"
                    }
                    console.log("added bad");
                } else {
                    elements[2] = {
                        x: Math.random() * 600,
                        y: Math.random() * 600,
                        radius: 20,
                        color: "green"
                    }
                    console.log("added good");
                }
            }
        }
}

loop();

function loop() {
    if(failed == true)
    {
        alert("Scor final: " + score);
        canvas.style.visibility="hidden";
    }
    else {
        counter += 1;
        if (counter >= 100) {
            counter = 0;
            drawRandom();
        }
        draw();

        requestAnimationFrame(loop);
    }
}


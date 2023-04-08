function randomNumber(){
    return Math.floor(Math.random()*4)+1;
}

function showScore(sc){
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = sc.toString();
}

function endGame(){
    let temp = clickList[pointer].toString();
    clickList = [];
    let ele = document.getElementById("score");
    ele.innerHTML = ele.innerHTML+" (try again!)";
    let b = document.getElementById(temp);
    b.style.backgroundColor = "white";
}

async function showOrder(){
    showTime = true;
    for(let i=0;i<clickList.length;i++){
        let b = document.getElementById(clickList[i].toString());
        let prevColor = b.style.backgroundColor;
        await new Promise(r => setTimeout(r, 250));
        b.style.backgroundColor = "green";
        await new Promise(r => setTimeout(r, 500));
        b.style.backgroundColor = prevColor;
        await new Promise(r => setTimeout(r, 250));
    }
    showTime = false;
}

let clickList=[];
clickList.push(randomNumber());
let pointer = 0;
let showTime = false;
showOrder();
showScore(pointer);

let btns = document.querySelectorAll(".button");

for(let i=0;i<btns.length;i++){
    btns[i].addEventListener("click", function() {
        if(clickList.length<=0 || showTime){
            return null;
        }
        if(clickList[pointer]==Number(this.innerHTML)){
            pointer += 1;
            if(pointer>=clickList.length){
                showScore(pointer);
                showOrder();
                pointer=0;
                clickList.push(randomNumber());
            }
        }
        else{
            endGame();
        }
    });
}
let globalColor = "black";
let rainbow = true;
let globalNum = 16;

let onFunction = function(event){
    let targetElement = event.target || event.srcElement;
    globalColor = ranColor();
    targetElement.style.backgroundColor = globalColor;
}

/*let offFunction = function(event){
    let targetElement = event.target || event.srcElement;
    targetElement.style.backgroundColor = "white";
}*/

function init(container, size){
    let i = 0;
    let j = 0;

    let squares = document.getElementsByClassName("square");
    while(squares[0]){
        squares[0].parentNode.removeChild(squares[0]);
    }

    for(i = 0; i < globalNum; i++){
        for(j = 0; j < globalNum; j++){
            let newDiv = document.createElement('div');
            newDiv.classList.add("square");
            newDiv.style.border = "1px solid black";
            container.appendChild(newDiv);
        }
    }
}

function addListeners(divs){
    let tempdivs = document.getElementsByClassName("square");
    for(let i=0; i < tempdivs.length; i++){
        tempdivs[i].addEventListener('mouseover', onFunction);
        //tempdivs[i].addEventListener('mouseout', offFunction);
    }
}

function ranColor(){
    if(rainbow){
        let r = Math.floor(Math.random() * (255));
        let g = Math.floor(Math.random() * (255));
        let b = Math.floor(Math.random() * (255));
        let color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    }else{
        return "black";
    }
}

function run(){
    const container = document.querySelector('#container');
    container.style.margin = "auto";

    const divs = document.getElementsByClassName("square");

    init(container, globalNum);
    addListeners(divs);

    const reset = document.querySelector('#reset');
    reset.addEventListener('click', function() {
        for(let i=0; i < divs.length;i++){
            divs[i].style.backgroundColor = "white";
        }
    });

    const changeGrid = document.querySelector('#change');
    changeGrid.addEventListener('click', function(){
        let newNum = prompt("Enter a new grid size (0-50): ", "16");
        while(newNum < 1 || newNum > 51){
            newNum = prompt("The grid size range should be 1-50! Enter a new grid size: ", "16");
        }
        globalNum = parseInt(newNum);
        container.style.gridTemplateColumns = 'repeat(' + globalNum + ', 1fr)';
        globalColor = ranColor();
        init(container, globalNum);
        addListeners();
    });

    const colorBtn = document.querySelector('#color');
    colorBtn.addEventListener('click', function(){
        if(colorBtn.textContent == "Black"){
            colorBtn.textContent = "Rainbow";
            rainbow = false;
        }else if(colorBtn.textContent == "Rainbow"){
            colorBtn.textContent = "Black";
            rainbow = true;
        }
        globalColor = ranColor();
    });

}

run();
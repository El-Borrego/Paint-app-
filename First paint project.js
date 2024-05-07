const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth * .9; //+ (window.innerWidth * .8);
canvas.height = window.innerHeight * .8;

alert("There is a pretty cool easter egg on this page somewhere")
/*---------------------Size canvas and stuff here----------------*/
//canvas.width = window.innerWidth
//canvas.height = window.innerHeight - something... or... maybe try in 
    //in css using the viewport sizing

context.clearRect(0, 0, canvas.width, canvas.height)
let isDrawing = false;
let startingColor = "black";
let startingSize = 5;
let strokes = [];
index = -1;
let colorPicker = document.getElementById("color-picker");

/*
  document.getElementById("color-buttons-container").addEventListener("clik",function(){
     = element.style.backgroundColor.value;
  })
*/

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);

function start(event){
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, 
                 event.clientY - canvas.offsetTop);
  event.preventDefault()
}

function draw(event){
  if(isDrawing){
    context.lineTo(event.clientX - canvas.offsetLeft, 
                   event.clientY - canvas.offsetTop);
    context.strokeStyle = startingColor;
    context.lineWidth = startingSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault()
}

function stop(event){
  if(isDrawing){
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  event.preventDefault()
  if(event.type != "mouseout"){
  strokes.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1
    console.log(strokes)
  }
}

function clearScreen(){
  context.clearRect(0,0,canvas.width,canvas.height)
}

function pixelSize(){
  startingSize = document.getElementById("pixels").value
}

function changeColor(element){
  startingColor = element.style.backgroundColor;
  /*-------Can't figure out how to get this to work...------------*/
  /*-------colorPicker.setAttribute("value",changeColor)------*/
  /*--------------Cant figure it out... maybe later down the road..
                  or.. I'll just have to "create my own" and implement
                  it instead and make it happen there...-----------*/
}

function secretColor(element){
  startingColor = element.style.color;
}

function undo(){
  if(index <= 0){
    clearScreen();
  }
  else{
    index -= 1;
    strokes.pop();
    context.putImageData(strokes[index],0,0);
  }
}
/*-----------------------Also... fix the layout stuffs... all the centering and sizing and shit---------------------*/
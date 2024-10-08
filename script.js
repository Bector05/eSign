const brushColor = document.getElementById("brush-colour");
const size = document.getElementById("brush-size");
const backgroundColor = document.getElementById("bgc");
const myCanvas = document.getElementById("myCanvas");
const clear = document.getElementById("clear");
const save = document.getElementById("save");
const rtr = document.getElementById("rtr");

const cntx = myCanvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function setCanvasSize() {
  const canvasStyle = getComputedStyle(myCanvas);
  const canvasWidth = parseInt(canvasStyle.width);
  const canvasHeight = parseInt(canvasStyle.height);
  myCanvas.width = canvasWidth;
  myCanvas.height = canvasHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);
brushColor.addEventListener('change', (e) => {
  cntx.strokeStyle = e.target.value;
});

myCanvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX * (myCanvas.width / myCanvas.clientWidth); // Adjust for canvas scaling
  lastY = e.offsetY * (myCanvas.height / myCanvas.clientHeight);
});


myCanvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const offsetX = e.offsetX * (myCanvas.width / myCanvas.clientWidth);
    const offsetY = e.offsetY * (myCanvas.height / myCanvas.clientHeight);

    cntx.beginPath();
    cntx.moveTo(lastX, lastY);
    cntx.lineTo(offsetX, offsetY);
    cntx.stroke();

    lastX = offsetX;
    lastY = offsetY;
  }
});

myCanvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

backgroundColor.addEventListener('change', (e) => {
  cntx.fillStyle = e.target.value;
  cntx.fillRect(0, 0, myCanvas.width, myCanvas.height);
});

size.addEventListener('change', (e) => {
  cntx.lineWidth = e.target.value;
});

clear.addEventListener('click', () => {
  cntx.clearRect(0, 0, myCanvas.width, myCanvas.height);
});

save.addEventListener('click', () => {
  const imgData = myCanvas.toDataURL();
  localStorage.setItem('eSign-canvas', imgData);

  let link = document.createElement('a');
  link.download = 'eSign.png';
  link.href = imgData;
  link.click();
});


rtr.addEventListener('click', () => {
  let savedData = localStorage.getItem('eSign-canvas');
  
  if (savedData) {
    let img = new Image();
    img.src = savedData;
    img.onload = () => {
      cntx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      cntx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
    };
  }
});

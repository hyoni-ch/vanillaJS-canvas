const lineWidth = document.querySelector("#line-width");
const colorBox = document.querySelectorAll(".color-box");
const eraser = document.querySelector("#eraser");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

const draw = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (isDrawing) {
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const drawTrue = () => {
  isDrawing = true;
};

const drawFalse = () => {
  isDrawing = false;
};

const changeColor = (e) => {
  ctx.strokeStyle = e.target.id;
};

const changeLineWidth = (e) => {
  ctx.lineWidth = e.target.value;
};

const eraserAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

canvas.addEventListener("mousedown", drawTrue);
canvas.addEventListener("mouseup", drawFalse);
canvas.addEventListener("mouseout", drawFalse);
canvas.addEventListener("mousemove", draw);
lineWidth.addEventListener("change", changeLineWidth);
colorBox.forEach((color) => {
  color.addEventListener("click", changeColor);
});
eraser.addEventListener("click", eraserAll);

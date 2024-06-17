const lineWidth = document.querySelector("#line-width");
const colorBox = document.querySelectorAll(".color-box");
const screenClearBtn = document.querySelector("#screen-clear-btn");
const redoBtn = document.querySelector("#redo-btn");
const memoryClearBtn = document.querySelector("#memory-clear-btn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const data = [];

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

const screenClear = () => {
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
screenClearBtn.addEventListener("click", screenClear);
redoBtn.addEventListener("click", () => {});

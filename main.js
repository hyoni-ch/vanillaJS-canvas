const colorBox = document.querySelectorAll(".color-box");
const eraser = document.querySelector("#eraser");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

ctx.lineWidth = 5;
ctx.lineCap = "round";

const draw = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (isDrawing) {
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }
  ctx.moveTo(x, y);
};

const changeColor = (e) => {
  ctx.strokeStyle = e.target.id;
  ctx.beginPath();
};

canvas.addEventListener("mousedown", () => {
  isDrawing = true;
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});
canvas.addEventListener("mousemove", draw);

colorBox.forEach((color) => {
  color.addEventListener("click", changeColor);
});

eraser.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

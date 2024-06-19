const lineWidth = document.querySelector("#line-width");
const colorBox = document.querySelectorAll(".color-box");
const screenClearBtn = document.querySelector("#screen-clear-btn");
const undoBtn = document.querySelector("#undo-btn");
const redoBtn = document.querySelector("#redo-btn");
const returnBtn = document.querySelector("#return-btn");
const memoryClearBtn = document.querySelector("#memory-clear-btn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const colorset = ["black", "pink", "red", "green", "blue"];
const colorButtons = document.querySelectorAll(".color-box");
colorButtons.forEach((button, index) => {
  button.style.backgroundColor = colorset[index];
});

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

const drawFalse = () => {
  isDrawing = false;
};

const changeColor = (e) => {
  ctx.strokeStyle = e.target.style.backgroundColor;
};

const changeLineWidth = (e) => {
  ctx.lineWidth = e.target.value;
};

const screenClear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

////////////////////////////////////////////////

// 1. canvas에 그릴 때마다 path를 배열로 저장 (stack)
// 2. 배열에 있는 걸 하나씩 pop
// --> X!!! pop 하면 넣어놓은 path가 삭제돼서 redo가 안됨!!!
// 3. 나타내기? 그리기? stroke?

let data = [];

const push = () => {
  // canvas의 그림을 data에 저장 -> canvas.??
  // canvas.toDataURL() : 매개변수 에 지정된 형식의 이미지 표현이 포함된 데이터 URL을 type 반환합니다.
  data.push(canvas.toDataURL());
  console.log(data);
};
const drawTrue = () => {
  isDrawing = true;
};

const memoryClear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  data = [];
};

returnBtn.addEventListener("click", () => {
  if (data.length === 0) return;
  let canvasImage = new Image();
  canvasImage.src = data[data.length - 1];
  console.log(canvasImage.src);
  canvasImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImage, 0, 0);
  };
});

// undoBtn.addEventListener("click", () => {
//   if (data.length === 0) return;
//   let canvasImage = new Image();
//   // console.log(data.pop());
//   canvasImage.src = data.pop();
//   // canvasImage.src = data[step];
//   canvasImage.onload = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(canvasImage, 0, 0);
//   };
// });

// redoBtn.addEventListener("click", () => {
//   let canvasImage = new Image();
//   canvasImage.src = data[step];
//   canvasImage.onload = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(canvasImage, 0, 0);
//   };
// });

///////////////////////////////////////////////

canvas.addEventListener("mousedown", () => {
  drawTrue();
  // path 하나 그릴 때마다 push
  // push();
});
canvas.addEventListener("mouseup", drawFalse);
canvas.addEventListener("mouseout", drawFalse);
canvas.addEventListener("mousemove", draw);
lineWidth.addEventListener("change", changeLineWidth);
colorBox.forEach((color) => {
  color.addEventListener("click", changeColor);
});
screenClearBtn.addEventListener("click", () => {
  push();
  screenClear();
});
memoryClearBtn.addEventListener("click", memoryClear);

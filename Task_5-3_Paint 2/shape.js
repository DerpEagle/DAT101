"use strict";
import { TPoint } from "lib2d";
import { newShapeType } from "./paint.mjs";
import { EShapeType } from "./menu.js";

// 🖼️ Access the paint canvas and drawing context, move this to your new JavaScript file.
const cvsPaint = document.getElementById("cvsPaint");
const ctxPaint = cvsPaint.getContext("2d");

let mousePos = new TPoint();
let shape = null;
let shapes = [];

const paintObjectListOption =
  '<div id="divPaintObject" class="paintObject">Shape-1</div>"';
const paintObjectList = document.getElementById("paintObjectList");

let shapeNo = 0;
let selectedHtmlShape = null;

class TShape {
  #name;
  constructor(aX, aY, aName) {
    this.posStart = new TPoint(aX, aY);
    this.posEnd = null;
    this.lineWidht = newShapeType.StrokeSize;
    this.strokeColor = newShapeType.StrokeColor;
    this.fillColor = newShapeType.FillColor;
    this.#name = aName;
    this.htmlID = `shape-${shapeNo++}`;
  }

  setEndPos(aX, aY) {
    this.posEnd = new TPoint(aX, aY);
    const div = document.createElement("div");
    div.name = "paint-shape-obj";
    div.classList.add("paintObject");
    div.id = this.htmlID;
    div.onclick = selectShape;
    div.appendChild(document.createTextNode(this.#name));
    paintObjectList.appendChild(div);
  }

  draw() {
    ctxPaint.lineWidth = this.lineWidht;
    ctxPaint.strokeStyle = this.strokeColor;
    ctxPaint.fillStyle = this.fillColor;
  } //Polymorphic
} // End of TShape

export class TLineShape extends TShape {
  constructor(aX, aY) {
    super(aX, aY, "Line");
  }

  draw() {
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    if (this.posEnd) {
      ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
    } else {
      ctxPaint.lineTo(mousePos.x, mousePos.y);
    }
    ctxPaint.stroke();
  }
} // End of TLineShape

export class TCircleShape extends TShape {
  constructor(aX, aY) {
    super(aX, aY, "Circle");
  }

  draw() {
    super.draw();
    const end = this.posEnd ?? mousePos;
    const radius = Math.hypot(end.x - this.posStart.x, end.y - this.posStart.y);
    ctxPaint.beginPath();

    ctxPaint.arc(this.posStart.x, this.posStart.y, radius, 0, Math.PI * 2);
    ctxPaint.stroke();
    ctxPaint.fill();
  }
} // End of TCircleShape

export class TEllipseShape extends TShape {
  constructor(aX, aY) {
    super(aX, aY, "Ellipse");
  }

  draw() {
    super.draw();
    const end = this.posEnd ?? mousePos;
    const radiusX = Math.abs(end.x - this.posStart.x);
    const radiusY = Math.abs(end.y - this.posStart.y);
    ctxPaint.beginPath();
    ctxPaint.ellipse(
      this.posStart.x,
      this.posStart.y,
      radiusX,
      radiusY,
      0,
      0,
      Math.PI * 2,
    );
    ctxPaint.stroke();
    ctxPaint.fill();
  }
} // End of TEllipseShape

export class TRectangleShape extends TShape {
  constructor(aX, aY) {
    super(aX, aY, "Rectangle");
  }

  draw() {
    super.draw();
    const end = this.posEnd ?? mousePos;
    ctxPaint.beginPath();
    ctxPaint.rect(
      this.posStart.x,
      this.posStart.y,
      end.x - this.posStart.x,
      end.y - this.posStart.y,
    );
    ctxPaint.stroke();
    ctxPaint.fill();
  }
} // End of TRectangleShape

export class TPenShape extends TShape {
  #points = [];

  constructor(aX, aY) {
    super(aX, aY, "Pen");
    this.#points = [];
  }
  addPos(aX, aY) {
    const pos = new TPoint(aX, aY);
    this.#points.push(pos);
  }

  draw() {
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    for (let i = 0; i < this.#points.length; i++) {
      const pos = this.#points[i];
      ctxPaint.lineTo(pos.x, pos.y);
    }
    if (this.posEnd) {
      ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
    }
    ctxPaint.stroke();
  }
} // End of TPenShape

export class TPolygonShape extends TShape {
  #points;

  constructor(aX, aY) {
    super(aX, aY, "Polygon");
    this.#points = [];
    this.snap = false;
  }
  addPos(aX, aY) {
    const pos = new TPoint(aX, aY);
    this.#points.push(pos);
  }

  draw() {
    super.draw();
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    for (let i = 0; i < this.#points.length; i++) {
      const pos = this.#points[i];
      ctxPaint.lineTo(pos.x, pos.y);
    }

    if (this.posEnd) {
      ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
      ctxPaint.fill();
    } else {
      ctxPaint.lineTo(mousePos.x, mousePos.y);
    }
    ctxPaint.stroke();
  }
} // End of TPolygonShape

function updateMousePos(aEvent) {
  const rect = cvsPaint.getBoundingClientRect();
  mousePos.x = Math.round(aEvent.clientX - rect.left);
  mousePos.y = Math.round(aEvent.clientY - rect.top);

  if (shape !== null) {
    if (newShapeType.ShapeType === EShapeType.Pen) {
      shape.addPos(mousePos.x, mousePos.y);
    } else if (newShapeType.ShapeType === EShapeType.Polygon) {
      if (shape.posEnd === null) {
        const dy = shape.posStart.y - mousePos.y;
        const dx = shape.posStart.x - mousePos.x;

        const hyp = Math.hypot(dx, dy);
        if (hyp <= 10) {
          mousePos.x = shape.posStart.x;
          mousePos.y = shape.posStart.y;
          shape.snap = true;
        } else {
          shape.snap = false;
        }
      }
    }
  }
} // End of function

function mouseDown(aEvent) {
  updateMousePos(aEvent);
  if (shape === null) {
    switch (newShapeType.ShapeType) {
      case EShapeType.Line:
        shape = new TLineShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Circle:
        shape = new TCircleShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Oval:
        shape = new TEllipseShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Rectangle:
        shape = new TRectangleShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Pen:
        shape = new TPenShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Polygon:
        shape = new TPolygonShape(mousePos.x, mousePos.y);
        break;
    }
  } else {
    if (newShapeType.ShapeType === EShapeType.Polygon) {
      if (shape.snap) {
        shape.setEndPos(mousePos.x, mousePos.y);
        shapes.push(shape);
        shape = null;
      } else {
        shape.addPos(mousePos.x, mousePos.y);
      }
    }

    shape.addPos(mousePos.x, mousePos.y);
  }
  // Test hvis vi lager ny polygon. hvis true, add mouse pos
} // Mouse down end of function

function mouseMove(aEvent) {
  updateMousePos(aEvent);
  if (shape !== null && newShapeType.ShapeType == EShapeType.Pen) {
    shape.addPos(mousePos.x, mousePos.y);
  }
} //End of function

function mouseUp(aEvent) {
  updateMousePos(aEvent);
  if (shape) {
    if (newShapeType.ShapeType !== EShapeType.Polygon) {
      shape.setEndPos(mousePos.x, mousePos.y);
      shapes.push(shape);
      shape = null;
    } else {
      shape.addPos(mousePos.x, mousePos.y);
    }
  }
} //Mouse up End of function

function drawCanvas() {
  ctxPaint.clearRect(0, 0, cvsPaint.width, cvsPaint.height);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
  }
  if (shape) {
    shape.draw();
  }
  requestAnimationFrame(drawCanvas);
} // Draw Canvas End of function

export function newDrawing() {
  paintObjectList.innerHTML = "";
  shapes = [];
}

export function deleteShape() {
  let index = -1;
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    if (shape.htmlID === selectedHtmlShape.id) {
      index = i;
      break; //this breaks the for-loop
    }
  }
  if (index >= 0) {
    shapes.splice(index, 1);
    paintObjectList.removeChild(selectedHtmlShape);
    selectedHtmlShape = null;
  }
}

export function moveUp() {
  let index = -1;
  let shape = null;
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].htmlID === selectedHtmlShape.id) {
      shape = shapes[i];
      index = i;
      break;
    }
  }
  if (index >= 0 && index < shapes.length - 1) {
    shapes.splice(index, 1);
    shapes.splice(index + 1, 0, shape);
    const prev = selectedHtmlShape.previousElementSibling;
    if (prev) paintObjectList.insertBefore(selectedHtmlShape, prev);
  }
}

export function moveDown() {
  let index = -1;
  let shape = null;
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].htmlID === selectedHtmlShape.id) {
      shape = shapes[i];
      index = i;
      break;
    }
  }
  if (index > 0) {
    shapes.splice(index, 1);
    shapes.splice(index - 1, 0, shape);
    const next = selectedHtmlShape.nextElementSibling;
    if (next) paintObjectList.insertBefore(next, selectedHtmlShape);
  }
}

function selectShape(aEvent) {
  console.log(aEvent.target.id);
  if (selectedHtmlShape) {
    selectedHtmlShape.classList.remove("selected");
  }
  selectedHtmlShape = aEvent.target;
  selectedHtmlShape.classList.add("selected");
}

cvsPaint.addEventListener("mousedown", mouseDown);
cvsPaint.addEventListener("mouseup", mouseUp);
cvsPaint.addEventListener("mousemove", mouseMove);
drawCanvas();

// Str + shift + b
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var square = {
    w: width / 8,
    h: height / 8,
};
var pieces = [];
var drawBoard = function () {
    for (var i = 0; i < 8; ++i) {
        for (var j = 0; j < 8; ++j) {
            if ((i + j) % 2 == 0) {
                drawRect(j * square.h, i * square.w, "#EEEEEE");
                addPiece(j * square.h, i * square.w, "#EEEEEE");
            }
            else {
                drawRect(j * square.h, i * square.w, "black");
                addPiece(j * square.h, i * square.w, "black");
            }
        }
    }
};
// function that takes x and y and draws a rectangle on the canvas
var drawRect = function (x, y, color) {
    if (color === void 0) { color = "white"; }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, square.w, square.h);
};
var addPiece = function (x, y, color) {
    var piece = {
        role: "",
        x: x,
        y: y,
        color: color,
        value: 0,
    };
    if (y === square.h || y === square.h * 6) {
        piece.role = "pawn";
        piece.value = 1;
    }
    else if ((x === 0 && y === 0) ||
        (x === square.w * 7 && y === 0) ||
        (x === 0 && y === square.h * 7) ||
        (x === square.w * 7 && y === square.h * 7)) {
        piece.role = "rook";
        piece.value = 5;
    }
    else if ((x === square.w * 1 && y === 0) ||
        (x === square.w * 6 && y === 0) ||
        (x === square.w * 1 && y === square.h * 7) ||
        (x === square.w * 6 && y === square.h * 7)) {
        piece.role = "knight";
        piece.value = 3;
    }
    else if ((x === square.w * 2 && y === 0) ||
        (x === square.w * 5 && y === 0) ||
        (x === square.w * 2 && y === square.h * 7) ||
        (x === square.w * 5 && y === square.h * 7)) {
        piece.role = "bishop";
        piece.value = 3;
    }
    else if ((x === square.w * 3 && y === 0) ||
        (x === square.w * 3 && y === square.h * 7)) {
        piece.role = "queen";
        piece.value = 9;
    }
    else if ((x === square.w * 4 && y === 0) ||
        (x === square.w * 4 && y === square.h * 7)) {
        piece.role = "king";
        piece.value = 100;
    }
    else {
        return;
    }
    pieces.push(piece);
};
drawBoard();

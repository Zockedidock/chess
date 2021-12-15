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
var first_run = true;
var drawBoard = function () {
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if ((y + x) % 2 == 0) {
                drawRect(x * square.h, y * square.w, "#EEEEEE");
                if (first_run)
                    addPiece(x, y, "#EEEEEE");
            }
            else {
                drawRect(x * square.h, y * square.w, "black");
                if (first_run)
                    addPiece(x, y, "black");
            }
        }
    }
    first_run = false;
};
// function that takes x and y and draws a rectangle on the canvas
var drawRect = function (x, y, color) {
    if (color === void 0) { color = "white"; }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, square.w, square.h);
};
var addPiece = function (x, y, color) {
    var piece = {
        role: "Empty",
        x: x,
        y: y,
        color: color == "black" ? "black" : "white",
        value: -1,
        img: null,
    };
    if (y === 1 || y === 6) {
        piece.role = "pawn";
        piece.value = 1;
        piece.img = new Image();
    }
    else if ((x === 0 && y === 0) ||
        (x === 7 && y === 0) ||
        (x === 0 && y === 7) ||
        (x === 7 && y === 7)) {
        piece.role = "rook";
        piece.value = 5;
        piece.img = new Image();
    }
    else if ((x === 1 && y === 0) ||
        (x === 6 && y === 0) ||
        (x === 1 && y === 7) ||
        (x === 6 && y === 7)) {
        piece.role = "knight";
        piece.value = 3;
        piece.img = new Image();
    }
    else if ((x === 2 && y === 0) ||
        (x === 5 && y === 0) ||
        (x === 2 && y === 7) ||
        (x === 5 && y === 7)) {
        piece.role = "bishop";
        piece.value = 3;
        piece.img = new Image();
    }
    else if ((x === 3 && y === 0) || (x === 3 && y === 7)) {
        piece.role = "queen";
        piece.value = 9;
        piece.img = new Image();
    }
    else if ((x === 4 && y === 0) || (x === 4 && y === 7)) {
        piece.role = "king";
        piece.value = 100;
        piece.img = new Image();
    }
    pieces.push(piece);
};
var drawPieces = function () {
    var _loop_1 = function (piece) {
        if (piece.role !== "Empty") {
            piece.img.src = "./".concat(piece.color, "/").concat(piece.role, ".png");
            piece.img.onload = function () {
                return ctx.drawImage(piece.img, piece.x * square.w, piece.y * square.h, square.w, square.h);
            };
        }
    };
    for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
        var piece = pieces_1[_i];
        _loop_1(piece);
    }
};
drawBoard();
drawPieces();
document.getElementById("mp").addEventListener("click", function () {
    pieces[10].y += 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPieces();
});

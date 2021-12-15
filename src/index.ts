// Str + shift + b

interface Square {
    w: number
    h: number
}

interface Piece {
    role: string
    x: number
    y: number
    color: string
    value: number
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
let width = canvas.width
let height = canvas.height
let square: Square = {
    w: width / 8,
    h: height / 8,
}
var pieces: Piece[] = []

const drawBoard = () => {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if ((i + j) % 2 == 0) {
                drawRect(j * square.h, i * square.w, "#EEEEEE")
                addPiece(j * square.h, i * square.w, "#EEEEEE")
            } else {
                drawRect(j * square.h, i * square.w, "black")
                addPiece(j * square.h, i * square.w, "black")
            }
        }
    }
}
// function that takes x and y and draws a rectangle on the canvas
const drawRect = (x: number, y: number, color: string = "white") => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, square.w, square.h)
}

const addPiece = (x: number, y: number, color: string) => {
    let piece: Piece = {
        role: "",
        x: x,
        y: y,
        color: color,
        value: 0,
    }
    if (y === square.h || y === square.h * 6) {
        piece.role = "pawn"
        piece.value = 1
    } else if (
        (x === 0 && y === 0) ||
        (x === square.w * 7 && y === 0) ||
        (x === 0 && y === square.h * 7) ||
        (x === square.w * 7 && y === square.h * 7)
    ) {
        piece.role = "rook"
        piece.value = 5
    } else if (
        (x === square.w * 1 && y === 0) ||
        (x === square.w * 6 && y === 0) ||
        (x === square.w * 1 && y === square.h * 7) ||
        (x === square.w * 6 && y === square.h * 7)
    ) {
        piece.role = "knight"
        piece.value = 3
    } else if (
        (x === square.w * 2 && y === 0) ||
        (x === square.w * 5 && y === 0) ||
        (x === square.w * 2 && y === square.h * 7) ||
        (x === square.w * 5 && y === square.h * 7)
    ) {
        piece.role = "bishop"
        piece.value = 3
    } else if (
        (x === square.w * 3 && y === 0) ||
        (x === square.w * 3 && y === square.h * 7)
    ) {
        piece.role = "queen"
        piece.value = 9
    } else if (
        (x === square.w * 4 && y === 0) ||
        (x === square.w * 4 && y === square.h * 7)
    ) {
        piece.role = "king"
        piece.value = 100
    } else {
        return
    }
    pieces.push(piece)
}
drawBoard()

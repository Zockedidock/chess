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
    img: HTMLImageElement
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
let width = canvas.width
let height = canvas.height
let square: Square = {
    w: width / 8,
    h: height / 8,
}
var pieces: Piece[] = []
var first_run = true

const drawBoard = (): void => {
    for (let y = 0; y < 8; ++y) {
        for (let x = 0; x < 8; ++x) {
            if ((y + x) % 2 == 0) {
                drawRect(x * square.h, y * square.w, "#EEEEEE")
                if (first_run) addPiece(x, y, "#EEEEEE")
            } else {
                drawRect(x * square.h, y * square.w, "black")
                if (first_run) addPiece(x, y, "black")
            }
        }
    }
    first_run = false
}
// function that takes x and y and draws a rectangle on the canvas
const drawRect = (x: number, y: number, color: string = "white"): void => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, square.w, square.h)
}

const addPiece = (x: number, y: number, color: string): void => {
    let piece: Piece = {
        role: "Empty",
        x: x,
        y: y,
        color: color == "black" ? "black" : "white",
        value: -1,
        img: null,
    }
    if (y === 1 || y === 6) {
        piece.role = "pawn"
        piece.value = 1
        piece.img = new Image()
    } else if (
        (x === 0 && y === 0) ||
        (x === 7 && y === 0) ||
        (x === 0 && y === 7) ||
        (x === 7 && y === 7)
    ) {
        piece.role = "rook"
        piece.value = 5
        piece.img = new Image()
    } else if (
        (x === 1 && y === 0) ||
        (x === 6 && y === 0) ||
        (x === 1 && y === 7) ||
        (x === 6 && y === 7)
    ) {
        piece.role = "knight"
        piece.value = 3
        piece.img = new Image()
    } else if (
        (x === 2 && y === 0) ||
        (x === 5 && y === 0) ||
        (x === 2 && y === 7) ||
        (x === 5 && y === 7)
    ) {
        piece.role = "bishop"
        piece.value = 3
        piece.img = new Image()
    } else if ((x === 3 && y === 0) || (x === 3 && y === 7)) {
        piece.role = "queen"
        piece.value = 9
        piece.img = new Image()
    } else if ((x === 4 && y === 0) || (x === 4 && y === 7)) {
        piece.role = "king"
        piece.value = 100
        piece.img = new Image()
    }
    pieces.push(piece)
}

const drawPieces = (): void => {
    for (let piece of pieces) {
        if (piece.role !== "Empty") {
            piece.img.src = `./${piece.color}/${piece.role}.png`
            piece.img.onload = () =>
                ctx.drawImage(
                    piece.img,
                    piece.x * square.w,
                    piece.y * square.h,
                    square.w,
                    square.h
                )
        }
    }
}

drawBoard()
drawPieces()

document.getElementById("mp").addEventListener("click", () => {
    pieces[10].y += 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBoard()
    drawPieces()
})

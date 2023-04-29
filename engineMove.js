// import * as checkMove from './checkMove.js';
// import { whitePawn } from './checkMove.js';

let selectedPiece = false;
let selectedPieceX = 0;
let selectedPieceY = 0;

let moves = [];
let board = [];

let turn = "white";
document.getElementById("turn").innerHTML = (turn == "white") ? "Turn: White" : "Turn: Black";

let pieces = {
    'r': 'black-rook',
    'n': 'black-knight',
    'b': 'black-bishop',
    'q': 'black-queen',
    'k': 'black-king',
    'p': 'black-pawn',
    'R': 'white-rook',
    'N': 'white-knight',
    'B': 'white-bishop',
    'Q': 'white-queen',
    'K': 'white-king',
    'P': 'white-pawn',
    };

let pieceTable = {

};

function createPieceTable(){
    document.querySelectorAll('.cell').forEach(cell => {
        let pieceClass = cell.classList.value.split(' ').pop();
        let pieceColour = cell.classList.contains('white') ? 'white' : 'black';
        let hashColour = cell.classList.contains('white') ? 'w' : 'b';
    
        if (pieceClass !== 'empty') {
        let pieceKey = pieceClass.split('-').pop();
    
        pieceTable[pieceColour + "-" + pieceKey] = hashColour.toLowerCase() + pieceKey.replace(/^./, str => str.toUpperCase()).charAt(0);
        }
    });
}

function boardToArray() {
    let board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    document.querySelectorAll(".cell").forEach((cell) => {
        let row = parseInt(cell.getAttribute("row"));
        let col = parseInt(cell.getAttribute("col"));
        let pieceClass = cell.classList.value.split(" ").pop();
        if (pieceClass !== "empty") {
            if (pieceClass == "white" || pieceClass == "black"){
                board[row][col] = "-";
            } else {
                board[row][col] = pieceTable[pieceClass];
            }
        } else {
            board[row][col] = "-";
        }
    });

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === undefined) {
            board[rowIndex][colIndex] = "-";
            }
        });
    });

    return board;
}

function movePiece(event) {
    createPieceTable();
    console.log(pieceTable);
    document.getElementById("turn").innerHTML = (turn == "white") ? "Turn: White" : "Turn: Black";
    const currentCell = event.target;
    const currentRow = currentCell.parentElement;
    const currentCol = Array.from(currentRow.children).indexOf(currentCell);
    const currentRowNum = Array.from(currentRow.parentElement.children).indexOf(currentRow);
  
    if (selectedPiece == false) {

        let previousCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
        let pieceClassList = previousCell.classList;
        let piece = pieceClassList.contains("piece") ? pieceClassList.item(pieceClassList.length - 1) : null;

        if (piece != null) {
            
            board = boardToArray();

            if (piece == "white-pawn") {
                moves = whitePawn(currentRowNum, currentCol, board, []);
            } else if (piece == "black-pawn") {
                moves = blackPawn(currentRowNum, currentCol, board, []);
            }

            // Check if selected piece belongs to the current turn
            if ((piece.includes("white") && turn == "white") || (piece.includes("black") && turn == "black")) {
                selectedPiece = true;
                selectedPieceX = currentCol;
                selectedPieceY = currentRowNum;
                return;
            } else {
                console.log("Invalid piece selection!");
                return;
            }
        } else {
            console.log("No piece found in selected cell!");
            return;
        }

    // console.log(`Selected piece at (${selectedPieceY},${selectedPieceX})`);
    } else {
        let nextCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
        let previousCell = document.querySelector(`.cell[row="${selectedPieceY}"][col="${selectedPieceX}"]`);
        let pieceClassList = previousCell.classList;
        let piece = pieceClassList.contains("piece") ? pieceClassList.item(pieceClassList.length - 1) : null;
        
        // Check if move is valid
        let validMove = false;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i][0] === currentRowNum && moves[i][1] === currentCol) {
                validMove = true;
                break;
            }
        }

        console.log(validMove, moves, currentRowNum, currentCol);
        
        if (validMove && piece !== null) {
            nextCell.classList.remove('piece'); 
            nextCell.classList.remove(...Object.values(pieces));
            nextCell.classList.add("piece", piece);
            previousCell.classList.remove("piece");

            // Reset selectedPiece variables
            selectedPiece = false;
            selectedPieceX = 0;
            selectedPieceY = 0;
            turn = (turn == "white") ? "black" : "white";
            document.getElementById("turn").innerHTML = (turn == "white") ? "Turn: White" : "Turn: Black";
        } else {
            console.log("Invalid move or no piece found in selected cell!");
            selectedPiece = false;
            selectedPieceX = 0;
            selectedPieceY = 0;
        }

        boardToArray();
        board = console.log(board);
    }
}
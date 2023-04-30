// import * as checkMove from './checkMove.js';
// import { whitePawn } from './checkMove.js';

let selectedPiece = false;
let selectedPieceX = 0;
let selectedPieceY = 0;

let moves = [];
let board = [];

let turn;
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
    let temp_board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    let row = 0;
    let col = 0;

    document.querySelectorAll('.cell').forEach(cell => {
        let piece = (cell.classList.value.split(' ').pop());
        // console.log(piece)
        if (piece != "empty") {
            if (piece == "white" || piece == "black") {
                temp_board[row % 8][col] = "-";
            } else {
                temp_board[row % 8][col] = pieceTable[piece];
            }
        }
        col += 1;
        if (col % 8 == 0) {
            row += 1;
            col = 0;
        }
    })

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === undefined) {
                temp_board[rowIndex][colIndex] = "-";
            }
        });
    });

    console.log(temp_board)
    board = temp_board;
}

function highlightActivePiece(moves) {
    moves.forEach(move => {
        let cell = document.querySelector(`.cell[row="${move[0]}"][col="${move[1]}"]`);
        if (cell.classList.contains("piece")){
            cell.classList.add("valid_conquer");
        } else {
            cell.classList.add("valid");
        }
    });
}

function clearHighlights() {
    document.querySelectorAll('.cell.valid, .cell.valid_conquer').forEach(cell => {
      cell.classList.remove('valid');
      cell.classList.remove('valid_conquer');
    });
    
    const activeCell = document.querySelector('.cell.active');
    if (activeCell) {
      activeCell.classList.remove('active');
    }
  }

function movePiece(event) {
    createPieceTable();
    console.log(pieceTable);
    document.getElementById("turn").innerHTML = (turn == "white") ? "Turn: White" : "Turn: Black";
    const currentCell = event.target;
    const currentRow = currentCell.parentElement;
    const currentCol = Array.from(currentRow.children).indexOf(currentCell);
    const currentRowNum = Array.from(currentRow.parentElement.children).indexOf(currentRow);

    if (selectedPiece == false && currentCell.classList.contains("piece") == true) {

        let previousCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
        let pieceClassList = previousCell.classList;
        let piece = pieceClassList.contains("piece") ? pieceClassList.item(pieceClassList.length - 1) : null;

        if (piece != null && piece.includes(turn)) {
            
            boardToArray();
            console.log(piece);
            if (piece == "white-pawn" || piece == "black-pawn") {
                moves = (turn == "white") ? whitePawn(currentRowNum, currentCol, board, []) : blackPawn(currentRowNum, currentCol, board, []);
            } else if (piece == "white-rook" || piece == "black-rook") {
                moves = rookMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-knight" || piece == "black-knight") {
                moves = knightMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-bishop" || piece == "black-bishop") {
                moves = bishopMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-queen" || piece == "black-queen") {
                moves = queenMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-king" || piece == "black-king") {
                moves = kingMoves(currentRowNum, currentCol, board, []);
            }

            console.log(moves, "FFFF")

            // remove all valid cells
            clearHighlights();

            // Highlight possible moves
            highlightActivePiece(moves);

            let activeCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
            activeCell.classList.add("active");

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
            console.log(turn+"'s turn");
            return;
        }

    // console.log(`Selected piece at (${selectedPieceY},${selectedPieceX})`);
    } else {

        let nextCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
        let piece = (nextCell.classList.length > 3) ? nextCell.classList[3] : null;

        if (nextCell.classList.length > 3 && piece.includes(turn)) {

            clearHighlights();

            let activeCell = document.querySelector(`.cell[row="${currentRowNum}"][col="${currentCol}"]`);
            activeCell.classList.add("active");

            if (piece == "white-pawn" || piece == "black-pawn") {
                moves = (turn == "white") ? whitePawn(currentRowNum, currentCol, board, []) : blackPawn(currentRowNum, currentCol, board, []);
            } else if (piece == "white-rook" || piece == "black-rook") {
                moves = rookMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-knight" || piece == "black-knight") {
                moves = knightMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-bishop" || piece == "black-bishop") {
                moves = bishopMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-queen" || piece == "black-queen") {
                moves = queenMoves(currentRowNum, currentCol, board, []);
            } else if (piece == "white-king" || piece == "black-king") {
                moves = kingMoves(currentRowNum, currentCol, board, []);
            }

            // Highlight possible moves
            highlightActivePiece(moves);

            selectedPiece = true;
            selectedPieceX = currentCol;
            selectedPieceY = currentRowNum;

        } else {

            let previousCell = document.querySelector(`.cell[row="${selectedPieceY}"][col="${selectedPieceX}"]`);
            let activePiece = (previousCell.classList.length > 3) ? previousCell.classList[3] : null;
            // let currentPiece = (nextCell.classList.length > 3) ? nextCell.classList[3] : null;
            
            console.log(nextCell)

            // Check if move is valid
            let validMove = false;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i][0] === currentRowNum && moves[i][1] === currentCol) {
                    validMove = true;
                    break;
                }
            }

            if (validMove) {
                // console.log(nextCell, currentRowNum, currentCol, piece)

                clearHighlights();

                console.log(previousCell)

                previousCell.classList.remove("piece");
                previousCell.classList.add("empty");
                nextCell.classList.remove('piece'); 
                nextCell.classList.remove(...Object.values(pieces));

                nextCell.classList.add("piece", activePiece);

                // Reset selectedPiece variables
                selectedPiece = false;
                selectedPieceX = 0;
                selectedPieceY = 0;
                turn = (turn == "white") ? "black" : "white";
                document.getElementById("turn").innerHTML = (turn == "white") ? "Turn: White" : "Turn: Black";

                boardToArray();
                // console.log(board);

            } else {
                console.log("Invalid move or no piece found in selected cell!");
                selectedPiece = false;
                selectedPieceX = 0;
                selectedPieceY = 0;

                clearHighlights(); 

            }
        }
    }
}
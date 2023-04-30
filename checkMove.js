function whitePawn(row, col, board, moves) {

    const possiblePosition = moves;
    enemy = (turn == "white") ? "b" : "w";

    if (board[row - 1][col] == "-") {
        possiblePosition.push([row - 1, col]);
        if (row == 6 && board[row - 2][col] == "-") {
            possiblePosition.push([row - 2, col]);
        }
    }

    if (row - 1 >= 0 && col - 1 >= 0) {
        if (board[row - 1][col - 1] != "-" && board[row - 1][col - 1].includes(enemy)) {
            possiblePosition.push([row - 1, col - 1]);
        }
    }

    if (row - 1 >= 0 && col + 1 < 8) {
        if (board[row - 1][col + 1] != "-" && board[row - 1][col + 1].includes(enemy)) {
            possiblePosition.push([row - 1, col + 1]);
        }
    }

    return possiblePosition;
}

function blackPawn(row, col, board, moves) {

    const possiblePosition = moves;
    enemy = (turn == "white") ? "b" : "w";

    if (board[row + 1][col] == "-") {
        possiblePosition.push([row + 1, col]);
        if (row == 1 && board[row + 2][col] == "-") {
            possiblePosition.push([row + 2, col]);
        }
    }

    if (row + 1 < 8 && col + 1 < 8) {
        if (board[row + 1][col + 1] != "-" && board[row + 1][col + 1].includes("w")) {
            possiblePosition.push([row + 1, col + 1]);
        }
    }

    if (row + 1 < 8 && col - 1 >= 0) {
        if (board[row + 1][col - 1] != "-" && board[row + 1][col - 1].includes("w")) {
            possiblePosition.push([row + 1, col - 1]);
        }
    }

    return possiblePosition;
}

// rook
function rookMoves(row, col, board, moves) {
    const possiblePosition = moves;
    console.log(row, col);
    directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    enemy = (turn == "white") ? "b" : "w";

    directions.forEach(direction => {
        console.log(direction);
        outerloop:
        for (let i = 1; i < 8; i++) {

            endRow = row + direction[0] * i;
            endCol = col + direction[1] * i;

            if (endRow >= 0 && endRow <= 7 && endCol >= 0 && endCol <= 7) {
                endPiece = board[endRow][endCol];
                console.log(endPiece)
                if (endPiece == "-") {
                    possiblePosition.push([endRow, endCol]);
                } else if (endPiece.includes(enemy)) {
                    possiblePosition.push([endRow, endCol]);
                    break outerloop;
                } else {
                    break outerloop;
                }
            }
        }
    });

    return possiblePosition;
}

// knight
function knightMoves(row, col, board, moves) {
    const possiblePosition = moves;

    // directions = ((-2, -1), (-2, 1), (2, -1), (2, 1), (-1, 2), (1, 2), (-1, -2), (1, -2))
    directions = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [2, -1], [2, 1], [1, -2], [1, 2]];
    enemy = (turn == "white") ? "b" : "w"; 

    directions.forEach(direction => {
        endRow = row + direction[0];
        endCol = col + direction[1];

        if (endRow >= 0 && endRow <= 7 && endCol >= 0 && endCol <= 7) {
            endPiece = board[endRow][endCol];
            if (endPiece == "-" || endPiece.includes(enemy)) {
                possiblePosition.push([endRow, endCol]);
            }
        }
    });

    return possiblePosition;
}

// bishop
function bishopMoves(row, col, board, moves) {
    const possiblePosition = moves;

    directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    enemy = (turn == "white") ? "b" : "w";

    directions.forEach(direction => {

        for (let i = 1; i < 8; i++) {

            endRow = row + direction[0] * i;
            endCol = col + direction[1] * i;

            if (endRow >= 0 && endRow <= 7 && endCol >= 0 && endCol <= 7) {

                endPiece = board[endRow][endCol];

                if (endPiece == "-") {
                    possiblePosition.push([endRow, endCol]);
                } else if (endPiece.includes(enemy)) {
                    possiblePosition.push([endRow, endCol]);
                    break;
                } else {
                    break;
                }


            }

        }

    });

    return possiblePosition;
}

// queen
function queenMoves(row, col, board, moves) {
    let possiblePosition;

    let rook = rookMoves(row, col, board, []);
    let bishop = bishopMoves(row, col, board, []);

    possiblePosition = rook.concat(bishop);

    return possiblePosition;
}

// king
function kingMoves(row, col, board, moves) {
    const possiblePosition = moves;

    directions = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
    enemy = (turn == "white") ? "b" : "w";

    directions.forEach(direction => {
        endRow = row + direction[0];
        endCol = col + direction[1];

        if (endRow >= 0 && endRow <= 7 && endCol >= 0 && endCol <= 7) {
            endPiece = board[endRow][endCol];
            if (endPiece == "-" || endPiece.includes(enemy)) {
                possiblePosition.push([endRow, endCol]);
            }
        }
    });

    return possiblePosition;
}
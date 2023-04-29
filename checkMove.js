function whitePawn(row, col, board, moves) {
    const possiblePosition = moves;
    if (board[row - 1][col] == "-") {
        possiblePosition.push([row - 1, col]);
        if (row == 6 && board[row - 2][col] == "-") {
            possiblePosition.push([row - 2, col]);
        }
    }

    if (row - 1 >= 0 && col - 1 >= 0) {
        if (board[row - 1][col - 1] != "-" && board[row - 1][col - 1].includes("b")) {
            possiblePosition.push([row - 1, col - 1]);
        }
    }

    if (row - 1 >= 0 && col + 1 < 8) {
        if (board[row - 1][col + 1] != "-" && board[row - 1][col + 1].includes("b")) {
            possiblePosition.push([row - 1, col + 1]);
        }
    }
    console.log(possiblePosition);
    return possiblePosition;
}

function blackPawn(row, col, board, moves) {
    const possiblePosition = moves;
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
    console.log(possiblePosition);
    return possiblePosition;
}
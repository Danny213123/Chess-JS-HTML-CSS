function whitePawn(row, col, board, moves) {
    const possiblePosition = moves;
    if (board[row - 1][col] == "-") {
        possiblePosition.push([row - 1, col]);
        if (row == 6 && board[row - 2][col] == "-") {
            possiblePosition.push([row - 2, col]);
        }
    }
    if (board[row - 1][col - 1] != "-" && board[row - 1][col - 1].includes("black")) {
        possiblePosition.push([row - 1, col - 1]);
    }
    if (board[row - 1][col + 1] != "-" && board[row - 1][col + 1].includes("black")) {
        possiblePosition.push([row - 1, col + 1]);
    }
    console.log(possiblePosition);
    return possiblePosition;
}
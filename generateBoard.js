function generateBoard(fen) {

    const [boardPosition, activeColor, castlingAvailability, enPassantTargetSquare, halfmoveClock, fullmoveNumber] = fen.split(' ');

    // Convert board position component to board state
    const boardState = boardPosition.split('/').map(row => {
    let newRow = [];
    for (let i = 0; i < row.length; i++) {
        if (isNaN(row[i])) {
        newRow.push(row[i]);
        } else {
        for (let j = 0; j < parseInt(row[i]); j++) {
            newRow.push(null);
        }
        }
    }
    return newRow;
    });

    // Map FEN characters to piece classes and add to DOM
    const pieces = {
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

    const board = document.querySelector('.board');
    const cells = board.querySelectorAll('.cell');
    let cellIndex = 0;

    cells.forEach(cell => {
        cell.classList.remove('piece');
        cell.classList.remove(...Object.values(pieces));
    });

    for (let i = 0; i < boardState.length; i++) {
    for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] !== null) {
        const cell = cells[cellIndex];
        const pieceClass = pieces[boardState[i][j]];
        cell.classList.add('piece', pieceClass);
        }
        cellIndex++;
    }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    generateBoard(fen);
});
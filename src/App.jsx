import './App.css'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './logic/constants'
import confetti from 'canvas-confetti'

// Mantener la fila, mover columna

function App() {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)))

  const [winner, setWinner] = useState(null)

  const checkWinner = ({ boardToCheck, rowIndex }) => {
    console.clear()

    let colWithTurn

    for (let col = 6; col >= 0; col--) {
      if (boardToCheck[rowIndex][col - 1] === null || col === 0) {
        colWithTurn = col
        break
      }
    }

    const colToCheck = boardToCheck[rowIndex]
    const rowToCheck = []

    for (let i = 0; i <= 6; i++) {
      rowToCheck.push(boardToCheck[i][colWithTurn])
    }

    console.table({
      Col: colToCheck,
      Row: rowToCheck
    })
    console.table(boardToCheck)
    console.log('Col')
    console.table({
      original: colToCheck[colWithTurn],
      eval1: colToCheck[colWithTurn + 1],
      eval2: colToCheck[colWithTurn + 2],
      eval3: colToCheck[colWithTurn + 3]
    })
    console.log('Row')
    console.table({
      original: rowToCheck[rowIndex],
      eval1: rowToCheck[rowIndex + 1],
      eval2: rowToCheck[rowIndex + 2],
      eval3: rowToCheck[rowIndex + 3]
    })
    console.log('Dig right')
    // console.log((rowIndex < 6 && colWithTurn < 5) && `${rowIndex + 1} - ${colWithTurn + 1} - ${boardToCheck[rowIndex + 1][colWithTurn + 1]}`)
    // console.log(`${rowIndex} - ${colWithTurn}`)
    // console.table({
    //   original: boardToCheck[rowIndex][colWithTurn],
    //   eval1: (rowIndex < 6 && colWithTurn < 5) && boardToCheck[rowIndex + 1][colWithTurn + 1],
    //   eval2: (rowIndex < 5 && colWithTurn < 4) && boardToCheck[rowIndex + 2][colWithTurn + 2],
    //   eval3: (rowIndex < 4 && colWithTurn < 3) && boardToCheck[rowIndex + 3][colWithTurn + 3]
    // })

    if (
      rowToCheck[rowIndex] === rowToCheck[rowIndex + 1] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex + 2] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex + 3]
    ) return rowToCheck[rowIndex]

    if (
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 1] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 2] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 3]
    ) return rowToCheck[rowIndex]

    if (
      colToCheck[colWithTurn] === colToCheck[colWithTurn + 1] &&
      colToCheck[colWithTurn] === colToCheck[colWithTurn + 2] &&
      colToCheck[colWithTurn] === colToCheck[colWithTurn + 3]
    ) return colToCheck[colWithTurn]

    // Validation diag right to left

    if (
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex > 0 && colWithTurn < 5) && boardToCheck[rowIndex - 1][colWithTurn + 1]) &&
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex > 1 && colWithTurn < 4) && boardToCheck[rowIndex - 2][colWithTurn + 2]) &&
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex > 2 && colWithTurn < 3) && boardToCheck[rowIndex - 3][colWithTurn + 3])
    ) return boardToCheck[rowIndex][colWithTurn]

    if (
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex < 6 && colWithTurn < 5) && boardToCheck[rowIndex + 1][colWithTurn + 1]) &&
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex < 5 && colWithTurn < 4) && boardToCheck[rowIndex + 2][colWithTurn + 2]) &&
      boardToCheck[rowIndex][colWithTurn] === ((rowIndex < 4 && colWithTurn < 3) && boardToCheck[rowIndex + 3][colWithTurn + 3])
    ) return boardToCheck[rowIndex][colWithTurn]

    return null
  }

  const updateBoard = ({ rowIndex, colIndex }) => {
    if (board[rowIndex][colIndex] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board].map(row => [...row])
    let colIndexWithTurn

    for (let col = 5; col >= 0; col--) {
      if (newBoard[rowIndex][col] === null) {
        newBoard[rowIndex][col] = turn
        colIndexWithTurn = col
        break
      }
    }

    setBoard(newBoard)
    const newWinner = checkWinner({
      boardToCheck: newBoard,
      rowIndex,
      colIndex: colIndexWithTurn
    })

    console.log(newWinner)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } // else if (!newBoard.includes(null)) setWinner(false)
  }

  return (
    <>
      <main>
        <section>
          <h1>Conecta 4</h1>
          <div className='game'>
            {
              board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((cell, colIndex) => {
                    return (
                      <Square
                        key={`${rowIndex}-${colIndex}`}
                        index={colIndex}
                        updateBoard={() => updateBoard({ rowIndex })}
                      >
                        {cell}
                      </Square>
                    )
                  })}
                </div>
              ))
            }
          </div>
        </section>
        <section className='turn'>
          <button>Reset Game</button>
          <div>
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
          </div>
          {
            winner && <p style={{
              fontSize: '28px',
              fontWeight: 'bold'
            }}>{winner === false ? `Empate ${winner}` : `Gano ${winner}`}</p>
          }
        </section>
      </main>
    </>
  )
}

export default App

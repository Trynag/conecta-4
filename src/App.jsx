import './App.css'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './logic/constants'
import confetti from 'canvas-confetti'

// Mantener la fila, mover columna

function App () {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)))
  const [winner, setWinner] = useState(null)

  const checkWinner = ({ boardToCheck, rowIndex, colIndex }) => {
    console.clear()

    let colWithTurn
    let rowWithTurn

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

    // Validate column way

    console.log(colWithTurn, rowWithTurn, rowIndex)
    console.log('Col')
    console.table({
      original: colToCheck[colWithTurn],
      eval1: colToCheck[colWithTurn + 1],
      eval2: colToCheck[colWithTurn + 2],
      eval3: colToCheck[colWithTurn + 3]
    })
    console.log('')
    console.log('Row')
    console.table({
      original: rowToCheck[rowIndex],
      eval1: rowToCheck[rowIndex + 1],
      eval2: rowToCheck[rowIndex + 2],
      eval3: rowToCheck[rowIndex + 3]
    })

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

    return null
  }

  const updateBoard = ({ rowIndex, colIndex }) => {
    if (board[rowIndex][colIndex] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board].map(row => [...row])

    for (let colIndex = 5; colIndex >= 0; colIndex--) {
      if (newBoard[rowIndex][colIndex] === null) {
        newBoard[rowIndex][colIndex] = turn
        break
      }
    }

    setBoard(newBoard)
    const newWinner = checkWinner({
      boardToCheck: newBoard,
      rowIndex,
      colIndex
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
                        updateBoard={() => updateBoard({ rowIndex, colIndex })}
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

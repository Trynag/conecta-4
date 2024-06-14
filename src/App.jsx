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
    const cell = boardToCheck[rowIndex]

    // console.clear()

    for (let i = 1; i < 4; i++) {
      if (!cell[colIndex + i]) return
      else if (cell[colIndex] === cell[colIndex + i] && i === 3) return cell[colIndex]
      // console.table({
      //   original: cell[colIndex],
      //   validado: cell[colIndex + i],
      //   iterador: i
      // })
    }

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

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
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

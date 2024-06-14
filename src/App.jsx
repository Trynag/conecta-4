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
    const cellVertical = boardToCheck[rowIndex]
    const cellHorizontal = boardToCheck[colIndex]

    console.clear()
    console.log(cellVertical)


    if (
      cellVertical[colIndex] === cellVertical[colIndex + 1] &&
      cellVertical[colIndex] === cellVertical[colIndex + 2] &&
      cellVertical[colIndex] === cellVertical[colIndex + 3]
    ) return cellVertical[colIndex]

    else if (
      cellHorizontal[rowIndex] === cellHorizontal[rowIndex + 1] &&
      cellHorizontal[rowIndex] === cellHorizontal[rowIndex + 2] &&
      cellHorizontal[rowIndex] === cellHorizontal[rowIndex + 3]
    ) return cellHorizontal[rowIndex]

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

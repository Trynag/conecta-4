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

    for (let col = 6; col >= 0; col--) {
      if (boardToCheck[rowIndex][col - 1] === null || col === 0) {
        console.log(col)
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

    console.log(colWithTurn, rowIndex)
    console.log('Col')
    console.table({
      original: colToCheck[colIndex],
      eval1: colToCheck[colIndex + 1],
      eval2: colToCheck[colIndex + 2],
      eval3: colToCheck[colIndex + 3]
    })
    console.log('')
    console.log('Row')
    console.table({
      original: rowToCheck[rowIndex],
      eval1: rowToCheck[rowIndex - 1],
      eval2: rowToCheck[rowIndex - 2],
      eval3: rowToCheck[rowIndex - 3]
    })

    // if (
    //   rowToCheck[rowIndex] === rowToCheck[rowIndex + 1] &&
    //   rowToCheck[rowIndex] === rowToCheck[rowIndex + 2] &&
    //   rowToCheck[rowIndex] === rowToCheck[rowIndex + 3]
    // ) return rowToCheck[rowIndex]

    if (
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 1] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 2] &&
      rowToCheck[rowIndex] === rowToCheck[rowIndex - 3]
    ) return rowToCheck[rowIndex]

    if (
      colToCheck[colIndex] === colToCheck[colIndex + 1] &&
      colToCheck[colIndex] === colToCheck[colIndex + 2] &&
      colToCheck[colIndex] === colToCheck[colIndex + 3]
    ) return colToCheck[colIndex]

    // if (
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex][colIndex + 1] &&
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex][colIndex + 2] &&
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex][colIndex + 3]
    // ) return boardToCheck[rowIndex][colIndex]

    // Validate row way to Left-Right, last Right-left

    // console.log(rowIndex, (rowIndex - 1) < 0 || (rowIndex + 1) > 6)

    // if ((rowIndex - 1) < 0 || (rowIndex + 1) > 6) return null
    // else if (
    //   ((rowToCheck[rowIndex] === rowToCheck[rowIndex + 1]) || (rowToCheck[rowIndex] === rowToCheck[rowIndex - 1])) &&
    //   ((rowToCheck[rowIndex] === rowToCheck[rowIndex + 2]) || (rowToCheck[rowIndex] === rowToCheck[rowIndex - 2])) &&
    //   ((rowToCheck[rowIndex] === rowToCheck[rowIndex + 3]) || (rowToCheck[rowIndex] === rowToCheck[rowIndex - 3]))
    // ) return rowToCheck[rowIndex]

    // else if (
    //   ((boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex + 1][colWithTurn]) || boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex - 1][colWithTurn]) &&
    //   ((boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex + 2][colWithTurn]) || boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex - 2][colWithTurn]) &&
    //   ((boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex + 3][colWithTurn]) || boardToCheck[rowIndex][colWithTurn] === boardToCheck[rowIndex - 3][colWithTurn])
    // ) return boardToCheck[rowIndex][colWithTurn]
    // else if (

    // ) return

    // if (
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex + 1][colIndex] &&
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex + 2][colIndex] &&
    //   boardToCheck[rowIndex][colIndex] === boardToCheck[rowIndex + 3][colIndex]
    // ) return boardToCheck[rowIndex][colIndex]

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

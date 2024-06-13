import './App.css'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './logic/constants'

const CLASS_NAME_COLUMNS = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh'
]

function App () {
  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)))

  const updateBoard = ({ rowIndex, colIndex }) => {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newBoard = [...board].map(row => [...row])
    console.log(newBoard)

    console.log(rowIndex, colIndex)

    for (let rowIndex = 6; rowIndex >= 0; rowIndex--) {
      if (newBoard[rowIndex][colIndex] === null) {
        newBoard[rowIndex][colIndex] = turn
        break
      }
    }

    setBoard(newBoard)
  }

  return (
    <>
      <main>
        <section>
          <h1>Conecta 4</h1>
          <div className='game'>
          {board.map((row, rowIndex) => (
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
          ))}
          </div>
        </section>
        <section className='turn'>
          <button>Reset Game</button>
          <div>
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
          </div>
        </section>
      </main>
    </>
  )
}

export default App

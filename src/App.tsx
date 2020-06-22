import React, { useState, useEffect } from 'react';
import './App.scss';
import NumberDisplay from './Components/NumberPisplay/NumberDisplay';
import { generateCells } from './utils';
import Button from './Components/Button/Button';
import { Faces, Cell, CellState, CellValue } from './types';
import { worker } from 'cluster';
import {openMultipleCells}  from './utils/index';
const App: React.FC = () => {

  const [cells, setCells] = useState<Cell[][]>(generateCells())
  const [face, setFace] = useState<Faces>(Faces.smile)
  const [time, setTime] = useState<number>(0)
  const [live, setLive] = useState<boolean>(false)
  const [bombCounter, setBombCounter] = useState<number>(10)

  useEffect(() => {
  
      const handleMouseDown = () => {
        setFace(Faces.oh)
      }
      const handleMouseUp = () => {
        setFace(Faces.smile)
      }


    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)




    return ()=> {
      window.removeEventListener('mousedown',handleMouseDown)
      window.removeEventListener('mouseup',handleMouseUp)
    }
  }, [])



  useEffect(() => {
    if(live && time < 999) {
     let timer =  setInterval(()=> {
       setTime((time)=> time +1)
     }, 1000)
     return ()=> {
      clearInterval(timer)
    }
    }
  }, [live])



  const handleCellClick = (rowParam:number, colParam:number) => (): void => {
    if(!live) {
      setLive(true)
    }
    const currentCell = cells[rowParam][colParam]
    let newCells = cells.slice()

    if([CellState.flagged, CellState.visible].includes(currentCell.state)
      // currentCell.state == CellState.flagged || currentCell.state == CellState.visible
      ){
      return
    }

    if(currentCell.value == CellValue.bomb){
    }else if(currentCell.value == CellValue.none){
      newCells = openMultipleCells(newCells, rowParam, colParam)
      setCells(newCells)
    } else {
      newCells[rowParam][colParam].state = CellState.visible
      setCells(newCells)
    }

  }
  const handleCellContext = (rowParam:number, colParam:number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault()

    if(!live){
      return
    }


    const currentCells = cells.slice()
    const currentCell = cells[rowParam][colParam]
    if(currentCell.state == CellState.visible){
      return
    } else if(currentCell.state == CellState.open){
      currentCells[rowParam][colParam].state = CellState.flagged
      setCells(currentCells)
      setBombCounter(bombCounter - 1)
    } else if(currentCell.state == CellState.flagged){
      currentCells[rowParam][colParam].state = CellState.open
      setCells(currentCells)
      setBombCounter(bombCounter + 1)
    }

  }

  const handleFaceClick = ():void => {
    if(live){
      setLive(false)
      setTime(0)
      setCells(generateCells())
    }
  }

  const renderCells = ():React.ReactNode=> {
    return cells.map((row,rowIndex)=> row.map((cell, colIndex) => <Button
     key={`${rowIndex}-${colIndex}`}
     row={rowIndex}
     onClick={handleCellClick}
     col={colIndex}
     onContext={handleCellContext}
     state={cell.state}
     value={cell.value}
     />))
  }

  return (
    <div className="App">
      <div className="header">
        <NumberDisplay value={bombCounter}/>
        <div className="face" onClick={handleFaceClick}>
        <span role="img" aria-label='face'>
         {face}
          </span>
        </div>
        <NumberDisplay value={time}/>
      </div>
      <div className="body">
      {renderCells()}
      </div>
    </div>
  );
}

export default App;

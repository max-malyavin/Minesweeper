

import { CellValue, CellState, Cell } from "../types"

export const generateCells = (): Cell[][] => {
    let cells: Cell[][] = []



    for(let row = 0; row < 9; row++){
        cells.push([])
        for (let col = 0; col < 9; col++) {
            cells[row].push({
                value: CellValue.none,
                state: CellState.open
            })
        }
    }


    let bombsPlaced = 0
    while(bombsPlaced < 10){
       const randomRow = Math.floor(Math.random()* 9)
       const randomCol = Math.floor(Math.random() * 9)
       const currentCell = cells[randomRow][randomCol]
       if(currentCell.value !== CellValue.bomb){
        cells = cells.map((row,rowIndex) => row.map((cell,cellIndex)=> {
            if(randomRow == rowIndex && randomCol==cellIndex) {
                return {
                    ...cell,
                    value: CellValue.bomb
                }
            }
            return cell
        })
        );
        bombsPlaced++
       }
    }



    for(let rowIndex = 0; rowIndex < 9; rowIndex++){
        for(let colIndex = 0; colIndex < 9; colIndex++){
            const currentCell = cells[rowIndex][colIndex]
            if(currentCell.value == CellValue.bomb){
                continue
            }
            let numberOfBombs = 0
            const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex-1][colIndex - 1]: null
            const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null
            const topRightBomb = rowIndex> 0 && colIndex < 9 -1 ? cells[rowIndex - 1][colIndex +1]: null;
            const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex -1]:  null
            const rightBomb = colIndex < 9 - 1 ?cells[rowIndex][colIndex +1]: null
            const bottomLeftBomb = rowIndex < 9 - 1 && colIndex > 0 ? cells[rowIndex +1][colIndex-1]: null
            const bottobBomb = rowIndex < 9 -1 ? cells[rowIndex+1][colIndex]: null
            const bottomRightBomb = rowIndex < 9 -1&& colIndex < 9 -1 ? cells[rowIndex+1][colIndex+1]: null

            if(topLeftBomb?.value == CellValue.bomb){
                numberOfBombs++
            }

            if(topBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(topRightBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(leftBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(rightBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(bottomLeftBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(bottobBomb?.value == CellValue.bomb){
                numberOfBombs++
            }
            if(bottomRightBomb?.value == CellValue.bomb){
                numberOfBombs++
            }


            if(numberOfBombs > 0) {
                cells[rowIndex][colIndex] = {
                    ...currentCell,
                    value: numberOfBombs
                }
            }


        }
    }













    return cells
}


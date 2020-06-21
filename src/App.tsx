import React, { useState } from 'react';
import './App.scss';
import NumberDisplay from './Components/NumberPisplay/NumberDisplay';
import { generateCells } from './utils';
import Button from './Components/Button/Button';

const App: React.FC = () => {

  const [cells, setCells] = useState(generateCells())
  console.log(cells);
  const renderCells = ():React.ReactNode=> {
    return cells.map((row,rowIndex)=> row.map((cell, colIndex) => <Button
     key={`${rowIndex}-${colIndex}`}
     row={rowIndex}
     col={colIndex}
     state={cell.state}
     value={cell.value}
     />))
  }

  return (
    <div className="App">
      <div className="header">
        <NumberDisplay value={0}/>
        <div className="face">
        <span role="img" aria-label='face'>😎</span>
        </div>
        <NumberDisplay value={23}/>
      </div>
      <div className="body">
      {renderCells()}
      </div>
    </div>
  );
}

export default App;

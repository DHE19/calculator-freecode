import './App.css';
import React, { useState } from 'react';
import { evaluate } from "mathjs"


const nums = [{
    id:"one"
  },{
    id:'two'
  },{
    id:'three'
  },{
    id:'four'
  },{
    id:'five'
  },{
    id:'six'
  },{
    id:'seven'
  },{
    id:'eight'
  },{
    id:'nine'
  }
]




const bottomActions = [
  {
    id:'zero',
    signo:'0'
  },
  {
    id:'decimal',
    signo:'.'
  }
]

const topActions =[
  {
    id:'clear',
    signo:'AC'
  },
  {
    id:'divide',
    signo:'/'
  },
  {
    id:'multiply',
    signo:'*'
  }
]

const verticalActions =[
  {
    id:'subtract',
    signo:'-'
  },
  {
    id:'add',
    signo:'+'
  },
   {
    id:'equals',
    signo:'='
   }
]

let decimal = false;

const initialValue = '0';
//hay un operador antes de mi
 let operador = false;

 let negative = false;

   //toma fotografías cada cierto tiempo
  let photographia = '';
  //guarda el ultimo signo
  let operatorPhoto = '';
function App() {

  //muestra la operación completa basandose en operations
  const [text, setText] = useState(initialValue);


  const operations = ['+','*','-','/']

  const backup = (signo) =>{
      const op = operations.find(ope => ope === signo);
      if(op)
        photographia = text;

      console.log(photographia);
      
  }
  const handleClick = (signo) =>{

    

    switch(signo){
      case 'AC':
        //limpia el array y el texto
        setText(initialValue);
        decimal = false;
        negative = false;
        operador = false;
        photographia = '';
        break;
      case '=':
        //ejecuta la evalucion, pero primero hace un join de todo el texto
        setText(evaluate(text));
        break;
      case '.':
        if(!decimal)setText(i => `${i}${signo}`);
        decimal = true;
        break;
      default:
        if(isNaN(signo)){
        
        if(isNaN(signo) && !operador){ 
          //añadir el operador en el array
          setText(i => i === initialValue ? i : `${i} ${signo} `)
          decimal = false;
          operatorPhoto = signo;
          operador = true;
          backup(signo);
          //negative = false;
        }
          //true            *        !== -         -    
        if(operador && operatorPhoto !== '-' && signo === '-' && !negative){
          setText(i => i === initialValue ? i : `${i} ${signo} `);
          negative = true;
        }
        
        else if(operador && operatorPhoto !== '-' && signo !== operatorPhoto){
          photographia=`${photographia} ${signo} `
          console.log('backip',photographia)
          setText(photographia);
        }
      }
        else {
          setText(i => i === initialValue ? signo : `${i}${signo}` );
          operador = false;
        }
    }
  }

    return (
    <div className="App">
      <div className="calculator">
        <div className="display-container" id='display'>
          <p id='display'>{text}</p>
        </div>
        <div className="pads">
          <div className="pads-actions-top">
            {topActions.map(i => <button id={i.id} onClick={() => handleClick(i.signo)} className='padnum'>{i.signo}</button>)}
          </div>
          <div className="padsnumbers">
            {nums.map((i,n) => <button id={i.id} onClick={() => handleClick(`${n+1}`)} className='padnum'>{n+1}</button>)}
          </div>
          <div className="pads-actions-vertical">
            {verticalActions.map(i => <button id={i.id} onClick={() => handleClick(i.signo)} className='padnum'>{i.signo}</button>)}
          </div>
          <div className="pads-actions-bottom">
            {bottomActions.map(i => <button id={i.id} onClick={() => handleClick(i.signo)} className='padnum'>{i.signo}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


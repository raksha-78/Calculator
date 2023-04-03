import React,{useReducer} from 'react'
import ButtonDigit from './DigitButton'
import ButtonOperation from './ButtonOperaton'
import './style.css'

 export const ACTIONS={
    ADD_DIGIT:'add-digit',
    CHOOSE_OPERATION:'choose-operation',
    CLEAR:'clear',
    DELETE:'delete-digit',
    EVALUTATE:'evaluate'
}

function reducer( state,{type,payload}){

    switch(type){
        case ACTIONS.ADD_DIGIT:
            if(payload.digit ==="0" && state.currentOperand ==="0"){ return state
            }
            if(payload.digit ==="." && state.currentOperand.includes(".")){
                return state
            }
            return{...state,currentOperand:`${state.currentOperand||""}${payload.digit}`,} 

        case ACTIONS.CLEAR:
            return {currentOperand:0}
            default:
                return state
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand==null && state.previousOperand==null){
                return state
            }
            if(state.previousOperand==null){
                return{
                    ...state,
                    operation:payload.operation,
                    previousOperand:state.currentOperand,
                    currentOperand:null,
                }
            }
            return{
                ...state,
                previousOperand:evaluate(state),
                operation:payload.operation,
                currentOperand:null,
            }
        case ACTIONS.EVALUTATE:
            if(state.currentOperand==null||state.previousOperand==null||state.operation==null){
                return state
            }
            return{
                    ...state,
                    previousOperand:null,
                    currentOperand:evaluate(state),
                    operation:null
            }
        case ACTIONS.DELETE:
            if(state.overwrite){
                return{
                    ...state,
                    overwrite:false,
                    currentOperand:null
                }
            }
            if(state.currentOperand==null)
            {
                    return state
               
            }
            if(state.currentOperand.length===1)
            {
                return{...state,currentOperand:null}
            }
            return{
                ...state, currentOperand:state.currentOperand.slice(0,-1)
            }
                
        
    }
}
function evaluate({currentOperand,previousOperand,operation}){
    const current=parseFloat(currentOperand)
    const previous=parseFloat(previousOperand)
    if(isNaN(current||isNaN(previous))) return ""
    let calcutaion=""
    switch(operation){
        case "+":
            calcutaion=previous+current
            break
        case "-":
            calcutaion=previous-current
            break
        case "*":
            calcutaion=previous*current
            break
        case "/":
            calcutaion=previous/current
            break
    }
    return calcutaion.toString()
}

 const App = () => {
    const [{currentOperand=0,previousOperand=null,operation=null},dispatch]= useReducer(reducer,{})
    // dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit:1}})
  return (
    <div className="calculator-grid" >
        <div className="output">
            <div className="previous-operand">{ previousOperand}{operation}</div>
            <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two"  onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE})}>DEL</button>
        <ButtonOperation  operation="÷" dispatch={dispatch}/>
        <ButtonDigit digit="1" dispatch={dispatch}/>
        <ButtonDigit digit="2" dispatch={dispatch}/>
        <ButtonDigit digit="3" dispatch={dispatch}/>
        <ButtonOperation operation="*" dispatch={dispatch}/>
        <ButtonDigit digit="4" dispatch={dispatch}/>
        <ButtonDigit digit="5" dispatch={dispatch}/>
        <ButtonDigit digit="6" dispatch={dispatch}/>
        <ButtonOperation operation="+" dispatch={dispatch}/>
        <ButtonDigit digit="7" dispatch={dispatch}/>
        <ButtonDigit digit="8" dispatch={dispatch}/>
        <ButtonDigit digit="9" dispatch={dispatch}/>
        <ButtonOperation operation="-" dispatch={dispatch}/>
        <ButtonDigit digit="." dispatch={dispatch}/>
        <ButtonDigit digit="0" dispatch={dispatch}/>

        <button className="span-two"onClick={()=>dispatch({type:ACTIONS.EVALUTATE})}>=</button>
        
    </div>
  )
}

export default App
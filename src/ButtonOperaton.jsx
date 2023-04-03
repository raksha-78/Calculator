import {ACTIONS} from './App'
import React from 'react'
export default function ButtonOperation({dispatch,operation}){
    return(
        <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>
            {operation}
        </button>
    )
}
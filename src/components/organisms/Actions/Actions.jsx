import React from 'react'
import { AddButton } from '../'
import { Link } from 'react-router-dom'

function Actions({link, label}) {
  return (
    <div className="bg-slate-200 flex gap-3 p-2">
        <p>Acciones: </p>
        <AddButton>
            <Link to={`/${link}/crear`}>{label}</Link>
        </AddButton>
    </div>
    
  )
}

export default Actions
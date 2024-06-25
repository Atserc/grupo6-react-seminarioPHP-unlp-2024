import React from 'react'
import { AddButton } from '../'
import { Link } from 'react-router-dom'

function Actions({link, label}) {
  return (
    <div className="bg-slate-200 flex gap-3 p-2">
      <p>Acciones: </p>
      <Link to={`/${link}/crear`}>
        <AddButton>
          {label}
        </AddButton>
      </Link>
    </div>
    
  )
}

export default Actions
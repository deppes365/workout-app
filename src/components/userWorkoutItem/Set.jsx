import React from 'react'

function Set({key, setNum, reps, weight, showSets}) {
  return (
    <div key={key} className={`setContainer ${showSets ? 'active' : ""}`}>
        <h3>Set {setNum}</h3>
        <div className="set">
            <p>Reps: {reps}</p>
            <p>Weight: {weight}</p>
        </div>
    </div>
  )
}

export default Set
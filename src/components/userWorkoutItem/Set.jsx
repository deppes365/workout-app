import React from 'react'

function Set({showSets}) {
  return (
    <div className={`setContainer ${showSets ? 'active' : ""}`}>
        <h3>Set 1</h3>
        <div className="set">
            <p>Reps: 10</p>
            <p>Weight: 225 lbs</p>
        </div>
    </div>
  )
}

export default Set
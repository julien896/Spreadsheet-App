import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

const Table = (props) => {
  
  const [data,setData] = useState({});

  const handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, data)
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    setData({ data: modifiedData })
  }

  const updateCells = () => {
    data.forceUpdate()
  }
  const rows = []

  for (let y = 0; y < props.y + 1; y += 1) {
      const rowData = data[y] || {}
      rows.push(
        <Row
          handleChangedCell={handleChangedCell}
          updateCells={updateCells}
          key={y}
          y={y}
          x={props.x + 1}
          rowData={rowData}
        />,
      )
    }
    return (
      <div>
        {rows}
      </div>
    )
  
}

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Table;
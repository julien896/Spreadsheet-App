import React, { useCallback, useState, memo, useMemo } from "react";
import { Input, Header } from "./styles";
import PropTypes from "prop-types";

const Cell = ({
  rowIndex,
  columnIndex,
  columnName,
  setCellValue,
  computeCell,
  currentValue
}) => {
  const [edit, setEdit] = useState(false);

  const value = useMemo((e) => {
    if (edit) {
      return currentValue || "";
    }
    return computeCell({ row: rowIndex, column: columnName });
  }, [edit, currentValue, rowIndex, columnName, computeCell]);

  const handleChange = useCallback(
    e => {
      setCellValue({
        row: rowIndex,
        column: columnName,
        value: e.target.value
      });
    },
    [rowIndex, columnName, setCellValue]
  );

  if (columnIndex === 0 && rowIndex === 0) {
    return <Header />;
  }

  if (columnIndex === 0) {
    return <Header>{rowIndex}</Header>;
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>;
  }
  

  return (
    <Input
      onBlur={() => setEdit(false)}
      onFocus={() => setEdit(true)}
      value={value}
      type="text"
      onChange={handleChange}
    />
  );
};

Cell.propTypes = {
  columnIndex: PropTypes.number,
  columnName: PropTypes.any,
  computeCell: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  rowIndex: PropTypes.number,
  setCellValue: PropTypes.func
}

export default memo(Cell);

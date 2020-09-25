import React, { useState, useCallback, Fragment } from "react";
import Cell from "./Cell";
import { Sheet as StyledSheet } from "./styles";
import PropTypes from "prop-types";

const getColumnName = index =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [data, setData] = useState({});

  const setCellValue = useCallback(
    ({ row, column, value }) => {
      const newData = { ...data };

      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

  const computeCell = useCallback(
    ({ row, column }) => {
      const cellContent = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          // Este regex convierte = "A1+A2" a ["A1", "+", "A2"]
          const expression = cellContent.substr(1).split(/([+*-])/g);

          let substitutedExpression = "";

          expression.forEach(item => {
            if (/^[A-z][0-9]$/g.test(item || "")) {
              substitutedExpression += data[(item || "").toUpperCase()] || 0;
            } else {
              substitutedExpression += item;
            }
          });

          try {
            return eval(substitutedExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data]
  );

  return (
    <StyledSheet numberOfColumns={numberOfColumns}>
      {Array(numberOfRows)
        .fill()
        .map((m, i) => {
          return (
            <Fragment key={i}>
              {Array(numberOfColumns)
                .fill()
                .map((n, j) => {
                  const columnName = getColumnName(j);
                  return (
                    <Cell
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
  );
};

Sheet.propTypes = {
  numberOfColumns: PropTypes.number,
  numberOfRows: PropTypes.number
}

export default Sheet;

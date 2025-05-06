import React from 'react';
import styles from '../styles/styled-table.module.css';

/**
 * StyledTable component for rendering tables with consistent styling
 * This helps ensure proper table rendering regardless of markdown processing
 */
const StyledTable = ({ headers, rows }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StyledTable;

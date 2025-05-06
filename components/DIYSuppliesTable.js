import React from 'react';
import styles from '../styles/styled-table.module.css';

/**
 * DIYSuppliesTable component specifically for the DIY party supplies reference
 * This ensures consistent rendering of the supplies table across different devices
 */
const DIYSuppliesTable = () => {
  const headers = ['Supply', 'Estimated Cost', 'Versatility Rating', 'Where to Find Deals'];
  
  const rows = [
    ['Colored paper and cardstock', '$8-15 for multi-pack', '★★★★★', 'Craft stores, dollar stores'],
    ['Scissors and craft knife', '$10-25', '★★★★★', 'Office supply stores'],
    ['Glue (stick, hot glue gun, and liquid)', '$10-20 total', '★★★★★', 'Craft stores, hardware stores'],
    ['String, twine, or fishing line', '$3-8 per roll', '★★★★☆', 'Dollar stores, craft stores'],
    ['Tape (regular, washi, and double-sided)', '$5-15 total', '★★★★★', 'Office supply stores'],
    ['Basic craft paint and brushes', '$15-25 for starter set', '★★★★☆', 'Craft stores, art supply stores'],
    ['Mason jars and glass bottles', '$0 (reused) to $15', '★★★★★', 'Thrift stores, grocery stores'],
    ['Balloons in various sizes', '$3-10 for multi-pack', '★★★★☆', 'Party stores, dollar stores'],
    ['Tissue paper in multiple colors', '$2-5 for multi-pack', '★★★★★', 'Dollar stores, gift shops'],
    ['Battery-operated string lights', '$8-20 per strand', '★★★★★', 'Home stores, online retailers']
  ];

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

export default DIYSuppliesTable;

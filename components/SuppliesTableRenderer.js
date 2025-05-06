import React from 'react';
import styles from '../styles/styled-table.module.css';

/**
 * SuppliesTableRenderer component
 * A specialized component to render the DIY supplies table with proper styling
 * This can be included directly in the article content
 */
const SuppliesTableRenderer = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Supply</th>
            <th>Estimated Cost</th>
            <th>Versatility Rating</th>
            <th>Where to Find Deals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Colored paper and cardstock</td>
            <td>$8-15 for multi-pack</td>
            <td>★★★★★</td>
            <td>Craft stores, dollar stores</td>
          </tr>
          <tr>
            <td>Scissors and craft knife</td>
            <td>$10-25</td>
            <td>★★★★★</td>
            <td>Office supply stores</td>
          </tr>
          <tr>
            <td>Glue (stick, hot glue gun, and liquid)</td>
            <td>$10-20 total</td>
            <td>★★★★★</td>
            <td>Craft stores, hardware stores</td>
          </tr>
          <tr>
            <td>String, twine, or fishing line</td>
            <td>$3-8 per roll</td>
            <td>★★★★☆</td>
            <td>Dollar stores, craft stores</td>
          </tr>
          <tr>
            <td>Tape (regular, washi, and double-sided)</td>
            <td>$5-15 total</td>
            <td>★★★★★</td>
            <td>Office supply stores</td>
          </tr>
          <tr>
            <td>Basic craft paint and brushes</td>
            <td>$15-25 for starter set</td>
            <td>★★★★☆</td>
            <td>Craft stores, art supply stores</td>
          </tr>
          <tr>
            <td>Mason jars and glass bottles</td>
            <td>$0 (reused) to $15</td>
            <td>★★★★★</td>
            <td>Thrift stores, grocery stores</td>
          </tr>
          <tr>
            <td>Balloons in various sizes</td>
            <td>$3-10 for multi-pack</td>
            <td>★★★★☆</td>
            <td>Party stores, dollar stores</td>
          </tr>
          <tr>
            <td>Tissue paper in multiple colors</td>
            <td>$2-5 for multi-pack</td>
            <td>★★★★★</td>
            <td>Dollar stores, gift shops</td>
          </tr>
          <tr>
            <td>Battery-operated string lights</td>
            <td>$8-20 per strand</td>
            <td>★★★★★</td>
            <td>Home stores, online retailers</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SuppliesTableRenderer;

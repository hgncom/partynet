import React, { useState, useEffect } from 'react';
import styles from '../../styles/tools/budget-calculator.module.css';

/**
 * Interactive Party Budget Calculator
 * Helps users plan their party budget with customizable categories
 */
const BudgetCalculator = ({ initialBudget = 1000 }) => {
  // Budget categories with default values
  const defaultCategories = [
    { id: 'venue', name: 'Venue', percentage: 30, amount: 0, editable: true },
    { id: 'food', name: 'Food & Drinks', percentage: 25, amount: 0, editable: true },
    { id: 'decorations', name: 'Decorations', percentage: 15, amount: 0, editable: true },
    { id: 'entertainment', name: 'Entertainment', percentage: 10, amount: 0, editable: true },
    { id: 'invitations', name: 'Invitations', percentage: 5, amount: 0, editable: true },
    { id: 'favors', name: 'Party Favors', percentage: 5, amount: 0, editable: true },
    { id: 'misc', name: 'Miscellaneous', percentage: 10, amount: 0, editable: true }
  ];

  // State
  const [totalBudget, setTotalBudget] = useState(initialBudget);
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryPercentage, setNewCategoryPercentage] = useState(5);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [remainingPercentage, setRemainingPercentage] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Calculate amounts based on percentages and update remaining percentage
  useEffect(() => {
    const updatedCategories = categories.map(category => ({
      ...category,
      amount: (totalBudget * category.percentage) / 100
    }));
    
    setCategories(updatedCategories);
    
    const totalPercentage = categories.reduce((sum, category) => sum + category.percentage, 0);
    setRemainingPercentage(100 - totalPercentage);
  }, [totalBudget, categories]);

  // Handle budget input change
  const handleBudgetChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTotalBudget(value);
  };

  // Handle category percentage change
  const handlePercentageChange = (id, value) => {
    const percentage = Math.min(Math.max(parseInt(value) || 0, 0), 100);
    
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, percentage } : category
    );
    
    setCategories(updatedCategories);
  };

  // Handle category amount change
  const handleAmountChange = (id, value) => {
    const amount = parseFloat(value) || 0;
    const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
    
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, amount, percentage } : category
    );
    
    setCategories(updatedCategories);
  };

  // Add new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim() || newCategoryPercentage <= 0) return;
    
    const newCategory = {
      id: `category-${Date.now()}`,
      name: newCategoryName,
      percentage: newCategoryPercentage,
      amount: (totalBudget * newCategoryPercentage) / 100,
      editable: true
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryPercentage(5);
    setShowAddCategory(false);
  };

  // Remove category
  const handleRemoveCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Reset to defaults
  const handleReset = () => {
    setCategories(defaultCategories);
    setTotalBudget(initialBudget);
    setShowResults(false);
  };

  // Calculate budget
  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className={styles.budgetCalculator}>
      <h2 className={styles.toolTitle}>Party Budget Calculator</h2>
      <p className={styles.toolDescription}>
        Plan your party budget by allocating percentages to different categories.
        Adjust the values to fit your specific needs.
      </p>
      
      <div className={styles.budgetInput}>
        <label htmlFor="totalBudget" className={styles.label}>
          Total Budget ($):
        </label>
        <input
          id="totalBudget"
          type="number"
          min="0"
          step="50"
          value={totalBudget}
          onChange={handleBudgetChange}
          className={styles.input}
        />
      </div>
      
      <div className={styles.categoriesContainer}>
        <h3 className={styles.sectionTitle}>Budget Categories</h3>
        
        <div className={styles.categoriesHeader}>
          <span className={styles.categoryName}>Category</span>
          <span className={styles.categoryPercentage}>Percentage (%)</span>
          <span className={styles.categoryAmount}>Amount ($)</span>
          <span className={styles.categoryActions}>Actions</span>
        </div>
        
        {categories.map(category => (
          <div key={category.id} className={styles.categoryRow}>
            <span className={styles.categoryName}>{category.name}</span>
            
            <div className={styles.categoryPercentage}>
              <input
                type="number"
                min="0"
                max="100"
                value={category.percentage}
                onChange={(e) => handlePercentageChange(category.id, e.target.value)}
                className={styles.percentageInput}
              />
              <span className={styles.percentSign}>%</span>
            </div>
            
            <div className={styles.categoryAmount}>
              <span className={styles.currencySign}>$</span>
              <input
                type="number"
                min="0"
                value={category.amount.toFixed(2)}
                onChange={(e) => handleAmountChange(category.id, e.target.value)}
                className={styles.amountInput}
              />
            </div>
            
            <div className={styles.categoryActions}>
              {category.editable && (
                <button
                  onClick={() => handleRemoveCategory(category.id)}
                  className={styles.removeButton}
                  aria-label={`Remove ${category.name}`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
        
        <div className={styles.remainingBudget}>
          <span>Remaining: {remainingPercentage.toFixed(2)}%</span>
          <span>${(totalBudget * remainingPercentage / 100).toFixed(2)}</span>
        </div>
      </div>
      
      {showAddCategory ? (
        <div className={styles.addCategoryForm}>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.input}
          />
          <div className={styles.percentageInputWrapper}>
            <input
              type="number"
              min="1"
              max="100"
              value={newCategoryPercentage}
              onChange={(e) => setNewCategoryPercentage(parseInt(e.target.value) || 0)}
              className={styles.input}
            />
            <span className={styles.percentSign}>%</span>
          </div>
          <div className={styles.addCategoryActions}>
            <button onClick={handleAddCategory} className={styles.addButton}>
              Add
            </button>
            <button onClick={() => setShowAddCategory(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddCategory(true)}
          className={styles.addCategoryButton}
        >
          + Add Category
        </button>
      )}
      
      <div className={styles.actionButtons}>
        <button onClick={handleCalculate} className={styles.calculateButton}>
          Calculate Budget
        </button>
        <button onClick={handleReset} className={styles.resetButton}>
          Reset to Defaults
        </button>
      </div>
      
      {showResults && (
        <div className={styles.resultsContainer}>
          <h3 className={styles.resultsTitle}>Your Party Budget Breakdown</h3>
          
          <div className={styles.chartContainer}>
            <div className={styles.pieChart}>
              {categories.map((category, index) => {
                const startPercent = categories
                  .slice(0, index)
                  .reduce((sum, cat) => sum + cat.percentage, 0);
                const endPercent = startPercent + category.percentage;
                
                return (
                  <div
                    key={category.id}
                    className={styles.pieSlice}
                    style={{
                      '--start-percent': startPercent,
                      '--end-percent': endPercent,
                      '--color': `hsl(${(index * 60) % 360}, 70%, 60%)`
                    }}
                    title={`${category.name}: ${category.percentage}% ($${category.amount.toFixed(2)})`}
                  ></div>
                );
              })}
            </div>
            
            <div className={styles.chartLegend}>
              {categories.map((category, index) => (
                <div key={category.id} className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)` }}
                  ></span>
                  <span className={styles.legendText}>
                    {category.name}: ${category.amount.toFixed(2)} ({category.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.budgetSummary}>
            <p>
              <strong>Total Budget:</strong> ${totalBudget.toFixed(2)}
            </p>
            <p>
              <strong>Allocated:</strong> ${(totalBudget * (100 - remainingPercentage) / 100).toFixed(2)} ({(100 - remainingPercentage).toFixed(2)}%)
            </p>
            <p>
              <strong>Remaining:</strong> ${(totalBudget * remainingPercentage / 100).toFixed(2)} ({remainingPercentage.toFixed(2)}%)
            </p>
          </div>
          
          <div className={styles.budgetTips}>
            <h4>Budget Tips</h4>
            <ul>
              <li>Consider DIY decorations to save on costs</li>
              <li>Look for venue discounts during off-peak seasons</li>
              <li>For food, potluck style can reduce expenses significantly</li>
              <li>Digital invitations are eco-friendly and budget-friendly</li>
              <li>Plan ahead to take advantage of sales and promotions</li>
            </ul>
          </div>
          
          <button
            onClick={() => window.print()}
            className={styles.printButton}
          >
            Print Budget Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;

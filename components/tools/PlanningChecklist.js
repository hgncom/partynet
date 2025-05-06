import React, { useState, useEffect } from 'react';
import styles from '../../styles/tools/planning-checklist.module.css';

/**
 * Interactive Party Planning Checklist
 * Allows users to track their party planning progress with customizable tasks
 */
const PlanningChecklist = ({ partyType = 'general' }) => {
  // Default task categories and items
  const defaultCategories = {
    general: [
      {
        id: 'planning',
        name: 'Initial Planning',
        tasks: [
          { id: 'date', name: 'Set a date and time', completed: false },
          { id: 'guest-list', name: 'Create guest list', completed: false },
          { id: 'budget', name: 'Establish budget', completed: false },
          { id: 'theme', name: 'Choose a theme', completed: false },
          { id: 'venue', name: 'Select and book venue', completed: false }
        ]
      },
      {
        id: 'invitations',
        name: 'Invitations',
        tasks: [
          { id: 'design', name: 'Design/order invitations', completed: false },
          { id: 'send', name: 'Send invitations (4 weeks before)', completed: false },
          { id: 'track', name: 'Track RSVPs', completed: false },
          { id: 'reminder', name: 'Send reminder (1 week before)', completed: false }
        ]
      },
      {
        id: 'food',
        name: 'Food & Drinks',
        tasks: [
          { id: 'menu', name: 'Plan menu', completed: false },
          { id: 'caterer', name: 'Book caterer or plan DIY food', completed: false },
          { id: 'cake', name: 'Order cake/desserts', completed: false },
          { id: 'drinks', name: 'Plan drinks and quantities', completed: false },
          { id: 'rentals', name: 'Rent/buy serving equipment if needed', completed: false }
        ]
      },
      {
        id: 'decor',
        name: 'Decorations & Setup',
        tasks: [
          { id: 'decor-list', name: 'Create decoration list', completed: false },
          { id: 'purchase', name: 'Purchase/make decorations', completed: false },
          { id: 'flowers', name: 'Order flowers if needed', completed: false },
          { id: 'layout', name: 'Plan venue layout and seating', completed: false },
          { id: 'music', name: 'Create playlist or book entertainment', completed: false }
        ]
      },
      {
        id: 'week-of',
        name: 'Week of Party',
        tasks: [
          { id: 'confirm', name: 'Confirm all vendors and deliveries', completed: false },
          { id: 'shop', name: 'Shop for last-minute items', completed: false },
          { id: 'clean', name: 'Clean venue/home', completed: false },
          { id: 'prep-food', name: 'Prepare any food that can be made ahead', completed: false }
        ]
      },
      {
        id: 'day-of',
        name: 'Day of Party',
        tasks: [
          { id: 'setup', name: 'Set up decorations', completed: false },
          { id: 'food-setup', name: 'Set up food and drink stations', completed: false },
          { id: 'music', name: 'Test sound system/music', completed: false },
          { id: 'welcome', name: 'Welcome guests and enjoy!', completed: false }
        ]
      },
      {
        id: 'after',
        name: 'After Party',
        tasks: [
          { id: 'cleanup', name: 'Clean up venue', completed: false },
          { id: 'thank-you', name: 'Send thank you notes', completed: false },
          { id: 'photos', name: 'Share photos with guests', completed: false },
          { id: 'review', name: 'Review vendors if applicable', completed: false }
        ]
      }
    ],
    birthday: [
      {
        id: 'planning',
        name: 'Initial Planning',
        tasks: [
          { id: 'date', name: 'Set a date and time', completed: false },
          { id: 'guest-list', name: 'Create guest list', completed: false },
          { id: 'budget', name: 'Establish budget', completed: false },
          { id: 'theme', name: 'Choose a birthday theme', completed: false },
          { id: 'venue', name: 'Select and book venue', completed: false }
        ]
      },
      {
        id: 'invitations',
        name: 'Invitations',
        tasks: [
          { id: 'design', name: 'Design/order birthday invitations', completed: false },
          { id: 'send', name: 'Send invitations (3-4 weeks before)', completed: false },
          { id: 'track', name: 'Track RSVPs', completed: false },
          { id: 'reminder', name: 'Send reminder (1 week before)', completed: false }
        ]
      },
      {
        id: 'food',
        name: 'Food & Cake',
        tasks: [
          { id: 'menu', name: 'Plan party menu', completed: false },
          { id: 'cake', name: 'Order birthday cake', completed: false },
          { id: 'drinks', name: 'Plan drinks for all ages', completed: false },
          { id: 'special', name: 'Plan for dietary restrictions', completed: false },
          { id: 'candles', name: 'Buy birthday candles', completed: false }
        ]
      },
      {
        id: 'activities',
        name: 'Entertainment & Activities',
        tasks: [
          { id: 'games', name: 'Plan party games/activities', completed: false },
          { id: 'prizes', name: 'Buy prizes for games if needed', completed: false },
          { id: 'music', name: 'Create birthday playlist', completed: false },
          { id: 'entertainment', name: 'Book entertainment if needed', completed: false }
        ]
      },
      {
        id: 'decor',
        name: 'Decorations',
        tasks: [
          { id: 'decor-list', name: 'Create decoration list', completed: false },
          { id: 'purchase', name: 'Purchase birthday decorations', completed: false },
          { id: 'balloons', name: 'Order/buy balloons', completed: false },
          { id: 'banner', name: 'Get birthday banner', completed: false },
          { id: 'table', name: 'Plan table decorations', completed: false }
        ]
      },
      {
        id: 'gifts',
        name: 'Gifts & Favors',
        tasks: [
          { id: 'gift', name: 'Buy gift for birthday person', completed: false },
          { id: 'favors', name: 'Prepare party favors', completed: false },
          { id: 'wrapping', name: 'Get gift wrapping supplies', completed: false },
          { id: 'cards', name: 'Buy birthday card', completed: false }
        ]
      },
      {
        id: 'day-of',
        name: 'Day of Party',
        tasks: [
          { id: 'setup', name: 'Set up decorations', completed: false },
          { id: 'food-setup', name: 'Set up food and cake table', completed: false },
          { id: 'music', name: 'Test sound system/music', completed: false },
          { id: 'photos', name: 'Charge camera/phone for photos', completed: false },
          { id: 'welcome', name: 'Welcome guests and have fun!', completed: false }
        ]
      }
    ],
    wedding: [
      {
        id: 'planning',
        name: '6-12 Months Before',
        tasks: [
          { id: 'date', name: 'Set wedding date', completed: false },
          { id: 'budget', name: 'Establish wedding budget', completed: false },
          { id: 'guest-list', name: 'Create guest list', completed: false },
          { id: 'venue', name: 'Book ceremony and reception venues', completed: false },
          { id: 'vendors', name: 'Research and book key vendors', completed: false },
          { id: 'attire', name: 'Shop for wedding attire', completed: false }
        ]
      },
      {
        id: 'invitations',
        name: '4-6 Months Before',
        tasks: [
          { id: 'save-date', name: 'Send save-the-dates', completed: false },
          { id: 'invitations', name: 'Order invitations', completed: false },
          { id: 'registry', name: 'Create wedding registry', completed: false },
          { id: 'accommodations', name: 'Block hotel rooms for guests', completed: false },
          { id: 'menu', name: 'Plan menu and cake', completed: false }
        ]
      },
      {
        id: '2-3-months',
        name: '2-3 Months Before',
        tasks: [
          { id: 'send-invites', name: 'Send wedding invitations', completed: false },
          { id: 'attire-fittings', name: 'Schedule dress fittings', completed: false },
          { id: 'vows', name: 'Write vows if applicable', completed: false },
          { id: 'music', name: 'Select ceremony and reception music', completed: false },
          { id: 'favors', name: 'Order wedding favors', completed: false }
        ]
      },
      {
        id: '1-month',
        name: '1 Month Before',
        tasks: [
          { id: 'rsvp', name: 'Track RSVPs and follow up', completed: false },
          { id: 'timeline', name: 'Create wedding day timeline', completed: false },
          { id: 'licenses', name: 'Apply for marriage license', completed: false },
          { id: 'final-count', name: 'Give final guest count to vendors', completed: false },
          { id: 'seating', name: 'Create seating chart', completed: false }
        ]
      },
      {
        id: 'week-of',
        name: 'Week of Wedding',
        tasks: [
          { id: 'confirm', name: 'Confirm all details with vendors', completed: false },
          { id: 'welcome', name: 'Prepare welcome bags for guests', completed: false },
          { id: 'pack', name: 'Pack for honeymoon', completed: false },
          { id: 'beauty', name: 'Final beauty appointments', completed: false },
          { id: 'rehearsal', name: 'Attend rehearsal dinner', completed: false }
        ]
      },
      {
        id: 'day-of',
        name: 'Wedding Day',
        tasks: [
          { id: 'eat', name: 'Eat breakfast', completed: false },
          { id: 'relax', name: 'Take moments to relax', completed: false },
          { id: 'photos', name: 'Take photos', completed: false },
          { id: 'enjoy', name: 'Enjoy your special day!', completed: false }
        ]
      },
      {
        id: 'after',
        name: 'After Wedding',
        tasks: [
          { id: 'return', name: 'Return any rented items', completed: false },
          { id: 'thank-you', name: 'Send thank you notes', completed: false },
          { id: 'name-change', name: 'Handle name change if applicable', completed: false },
          { id: 'photos', name: 'Receive and share wedding photos', completed: false }
        ]
      }
    ]
  };

  // State
  const [categories, setCategories] = useState([]);
  const [selectedPartyType, setSelectedPartyType] = useState(partyType);
  const [newTaskText, setNewTaskText] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [progress, setProgress] = useState(0);
  const [daysUntilParty, setDaysUntilParty] = useState(30);
  const [partyDate, setPartyDate] = useState('');
  const [partyName, setPartyName] = useState('My Party');

  // Initialize categories based on party type
  useEffect(() => {
    if (defaultCategories[selectedPartyType]) {
      setCategories(JSON.parse(JSON.stringify(defaultCategories[selectedPartyType])));
    } else {
      setCategories(JSON.parse(JSON.stringify(defaultCategories.general)));
    }
  }, [selectedPartyType]);

  // Calculate progress
  useEffect(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    categories.forEach(category => {
      totalTasks += category.tasks.length;
      completedTasks += category.tasks.filter(task => task.completed).length;
    });
    
    const calculatedProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setProgress(calculatedProgress);
  }, [categories]);

  // Calculate days until party when date changes
  useEffect(() => {
    if (partyDate) {
      const today = new Date();
      const party = new Date(partyDate);
      const diffTime = party - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilParty(diffDays > 0 ? diffDays : 0);
    }
  }, [partyDate]);

  // Handle party type change
  const handlePartyTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedPartyType(newType);
  };

  // Toggle task completion
  const toggleTask = (categoryId, taskId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const updatedTasks = category.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...category, tasks: updatedTasks };
      }
      return category;
    });
    
    setCategories(updatedCategories);
  };

  // Add new task to category
  const addTask = (categoryId) => {
    if (!newTaskText.trim()) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const newTask = {
          id: `task-${Date.now()}`,
          name: newTaskText,
          completed: false
        };
        return { ...category, tasks: [...category.tasks, newTask] };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setNewTaskText('');
  };

  // Remove task
  const removeTask = (categoryId, taskId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          tasks: category.tasks.filter(task => task.id !== taskId)
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
  };

  // Add new category
  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory = {
      id: `category-${Date.now()}`,
      name: newCategoryName,
      tasks: []
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowAddCategory(false);
  };

  // Remove category
  const removeCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (defaultCategories[selectedPartyType]) {
      setCategories(JSON.parse(JSON.stringify(defaultCategories[selectedPartyType])));
    } else {
      setCategories(JSON.parse(JSON.stringify(defaultCategories.general)));
    }
  };

  // Save checklist to localStorage
  const saveChecklist = () => {
    const checklistData = {
      partyName,
      partyDate,
      partyType: selectedPartyType,
      categories,
      lastSaved: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('partyChecklist', JSON.stringify(checklistData));
      alert('Checklist saved successfully!');
    } catch (error) {
      console.error('Error saving checklist:', error);
      alert('Failed to save checklist. Please try again.');
    }
  };

  // Load checklist from localStorage
  const loadChecklist = () => {
    try {
      const savedData = localStorage.getItem('partyChecklist');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPartyName(parsedData.partyName || 'My Party');
        setPartyDate(parsedData.partyDate || '');
        setSelectedPartyType(parsedData.partyType || 'general');
        setCategories(parsedData.categories || []);
        alert(`Loaded checklist last saved on ${new Date(parsedData.lastSaved).toLocaleString()}`);
      } else {
        alert('No saved checklist found.');
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
      alert('Failed to load checklist. Please try again.');
    }
  };

  return (
    <div className={styles.planningChecklist}>
      <h2 className={styles.toolTitle}>Party Planning Checklist</h2>
      <p className={styles.toolDescription}>
        Stay organized with this interactive checklist. Track your progress and customize tasks for your event.
      </p>
      
      <div className={styles.partyDetails}>
        <div className={styles.detailsRow}>
          <div className={styles.detailField}>
            <label htmlFor="partyName" className={styles.label}>
              Party Name:
            </label>
            <input
              id="partyName"
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              className={styles.input}
              placeholder="My Party"
            />
          </div>
          
          <div className={styles.detailField}>
            <label htmlFor="partyDate" className={styles.label}>
              Party Date:
            </label>
            <input
              id="partyDate"
              type="date"
              value={partyDate}
              onChange={(e) => setPartyDate(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.detailField}>
            <label htmlFor="partyType" className={styles.label}>
              Party Type:
            </label>
            <select
              id="partyType"
              value={selectedPartyType}
              onChange={handlePartyTypeChange}
              className={styles.select}
            >
              <option value="general">General Party</option>
              <option value="birthday">Birthday Party</option>
              <option value="wedding">Wedding</option>
            </select>
          </div>
        </div>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressInfo}>
            <div className={styles.progressPercentage}>{progress}% Complete</div>
            {partyDate && (
              <div className={styles.daysRemaining}>
                {daysUntilParty} {daysUntilParty === 1 ? 'day' : 'days'} until the party
              </div>
            )}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className={styles.checklistContainer}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <button
                onClick={() => removeCategory(category.id)}
                className={styles.removeButton}
                aria-label={`Remove ${category.name} category`}
              >
                ✕
              </button>
            </div>
            
            <ul className={styles.taskList}>
              {category.tasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <div className={styles.taskCheckbox}>
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleTask(category.id, task.id)}
                      className={styles.checkbox}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`${styles.taskLabel} ${task.completed ? styles.completed : ''}`}
                    >
                      {task.name}
                    </label>
                  </div>
                  <button
                    onClick={() => removeTask(category.id, task.id)}
                    className={styles.removeTaskButton}
                    aria-label={`Remove ${task.name} task`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            
            <div className={styles.addTaskForm}>
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className={styles.addTaskInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTask(category.id);
                  }
                }}
              />
              <button
                onClick={() => addTask(category.id)}
                className={styles.addTaskButton}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showAddCategory ? (
        <div className={styles.addCategoryForm}>
          <input
            type="text"
            placeholder="New category name..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.addCategoryInput}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addCategory();
              }
            }}
          />
          <div className={styles.addCategoryActions}>
            <button onClick={addCategory} className={styles.addButton}>
              Add Category
            </button>
            <button
              onClick={() => setShowAddCategory(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddCategory(true)}
          className={styles.addCategoryButton}
        >
          + Add New Category
        </button>
      )}
      
      <div className={styles.actionButtons}>
        <button onClick={saveChecklist} className={styles.saveButton}>
          Save Checklist
        </button>
        <button onClick={loadChecklist} className={styles.loadButton}>
          Load Saved Checklist
        </button>
        <button onClick={resetToDefaults} className={styles.resetButton}>
          Reset to Defaults
        </button>
        <button
          onClick={() => window.print()}
          className={styles.printButton}
        >
          Print Checklist
        </button>
      </div>
      
      <div className={styles.planningTips}>
        <h3 className={styles.tipsTitle}>Planning Tips</h3>
        <ul className={styles.tipsList}>
          <li>Start planning early - at least 6-8 weeks before for most parties</li>
          <li>Send invitations 3-4 weeks in advance</li>
          <li>Confirm all bookings and reservations 1 week before</li>
          <li>Delegate tasks to friends and family when possible</li>
          <li>Create a day-of timeline to stay organized</li>
          <li>Have a backup plan for outdoor events</li>
        </ul>
      </div>
    </div>
  );
};

export default PlanningChecklist;

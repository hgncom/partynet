import React, { useState, useEffect } from 'react';
import styles from '../../styles/tools/guest-list-manager.module.css';

/**
 * Guest List Manager Tool
 * Helps users organize party attendees, track RSVPs, and manage guest information
 */
const GuestListManager = () => {
  // State for guest list and form inputs
  const [guests, setGuests] = useState([]);
  const [eventName, setEventName] = useState('My Event');
  const [eventDate, setEventDate] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(100);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    group: 'friends',
    rsvpStatus: 'pending',
    plusOnes: 0,
    dietaryRestrictions: '',
    notes: '',
    isEditing: false
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    declined: 0,
    totalAttendees: 0
  });

  // Calculate stats whenever guest list changes
  useEffect(() => {
    const confirmed = guests.filter(guest => guest.rsvpStatus === 'confirmed');
    const pending = guests.filter(guest => guest.rsvpStatus === 'pending');
    const declined = guests.filter(guest => guest.rsvpStatus === 'declined');
    
    const totalAttendees = confirmed.reduce((sum, guest) => sum + 1 + parseInt(guest.plusOnes || 0), 0);
    
    setStats({
      total: guests.length,
      confirmed: confirmed.length,
      pending: pending.length,
      declined: declined.length,
      totalAttendees
    });
  }, [guests]);

  // Load saved guest list from localStorage on component mount
  useEffect(() => {
    const savedGuestList = localStorage.getItem('partyGuestList');
    if (savedGuestList) {
      try {
        const parsedData = JSON.parse(savedGuestList);
        setGuests(parsedData.guests || []);
        setEventName(parsedData.eventName || 'My Event');
        setEventDate(parsedData.eventDate || '');
        setMaxCapacity(parsedData.maxCapacity || 100);
      } catch (error) {
        console.error('Error loading guest list:', error);
      }
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add or update guest
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      alert('First name and last name are required.');
      return;
    }
    
    if (formData.isEditing) {
      // Update existing guest
      const updatedGuests = guests.map(guest => 
        guest.id === formData.id ? { ...formData, isEditing: false } : guest
      );
      setGuests(updatedGuests);
    } else {
      // Add new guest
      const newGuest = {
        ...formData,
        id: Date.now().toString(),
        isEditing: false
      };
      setGuests([...guests, newGuest]);
    }
    
    // Reset form
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      group: 'friends',
      rsvpStatus: 'pending',
      plusOnes: 0,
      dietaryRestrictions: '',
      notes: '',
      isEditing: false
    });
    
    // Save to localStorage
    saveGuestList([...guests, formData.isEditing ? null : { ...formData, id: Date.now().toString() }].filter(Boolean));
  };

  // Edit guest
  const handleEdit = (id) => {
    const guestToEdit = guests.find(guest => guest.id === id);
    if (guestToEdit) {
      setFormData({
        ...guestToEdit,
        isEditing: true
      });
    }
  };

  // Delete guest
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this guest?')) {
      const updatedGuests = guests.filter(guest => guest.id !== id);
      setGuests(updatedGuests);
      saveGuestList(updatedGuests);
    }
  };

  // Change RSVP status
  const handleRsvpChange = (id, status) => {
    const updatedGuests = guests.map(guest => 
      guest.id === id ? { ...guest, rsvpStatus: status } : guest
    );
    setGuests(updatedGuests);
    saveGuestList(updatedGuests);
  };

  // Save guest list to localStorage
  const saveGuestList = (guestList = guests) => {
    try {
      const dataToSave = {
        guests: guestList,
        eventName,
        eventDate,
        maxCapacity,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('partyGuestList', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving guest list:', error);
    }
  };

  // Export guest list as CSV
  const exportToCsv = () => {
    if (guests.length === 0) {
      alert('No guests to export.');
      return;
    }
    
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Group', 'RSVP Status', 'Plus Ones', 'Dietary Restrictions', 'Notes'];
    const csvRows = [
      headers.join(','),
      ...guests.map(guest => [
        guest.firstName,
        guest.lastName,
        guest.email,
        guest.phone,
        guest.group,
        guest.rsvpStatus,
        guest.plusOnes,
        `"${guest.dietaryRestrictions.replace(/"/g, '""')}"`,
        `"${guest.notes.replace(/"/g, '""')}"`
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventName.replace(/\\s+/g, '-')}-guest-list.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter guests based on current filter and search term
  const filteredGuests = guests.filter(guest => {
    // Apply RSVP status filter
    if (filter !== 'all' && guest.rsvpStatus !== filter) {
      return false;
    }
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        guest.firstName.toLowerCase().includes(searchLower) ||
        guest.lastName.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower) ||
        guest.phone.includes(searchTerm) ||
        guest.group.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Sort guests
  const sortedGuests = [...filteredGuests].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Toggle sort direction
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };

  // Handle individual selection
  const handleSelectGuest = (id) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  // Bulk actions
  const handleBulkAction = (action) => {
    if (selectedGuests.length === 0) {
      alert('No guests selected.');
      return;
    }
    
    let updatedGuests = [...guests];
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to remove ${selectedGuests.length} guest(s)?`)) {
          updatedGuests = guests.filter(guest => !selectedGuests.includes(guest.id));
        }
        break;
      case 'confirm':
      case 'pending':
      case 'declined':
        updatedGuests = guests.map(guest => 
          selectedGuests.includes(guest.id) ? { ...guest, rsvpStatus: action } : guest
        );
        break;
      default:
        return;
    }
    
    setGuests(updatedGuests);
    setSelectedGuests([]);
    saveGuestList(updatedGuests);
  };

  // Reset guest list
  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear the entire guest list? This cannot be undone.')) {
      setGuests([]);
      setSelectedGuests([]);
      saveGuestList([]);
    }
  };

  return (
    <div className={styles.guestListManager}>
      <h2 className={styles.toolTitle}>Guest List Manager</h2>
      <p className={styles.toolDescription}>
        Keep track of your party guests, RSVPs, and manage attendance for your event.
      </p>
      
      {/* Event Details */}
      <div className={styles.eventDetails}>
        <div className={styles.detailsRow}>
          <div className={styles.detailField}>
            <label htmlFor="eventName" className={styles.label}>
              Event Name:
            </label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => {
                setEventName(e.target.value);
                saveGuestList();
              }}
              className={styles.input}
              placeholder="My Event"
            />
          </div>
          
          <div className={styles.detailField}>
            <label htmlFor="eventDate" className={styles.label}>
              Event Date:
            </label>
            <input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => {
                setEventDate(e.target.value);
                saveGuestList();
              }}
              className={styles.input}
            />
          </div>
          
          <div className={styles.detailField}>
            <label htmlFor="maxCapacity" className={styles.label}>
              Max Capacity:
            </label>
            <input
              id="maxCapacity"
              type="number"
              min="1"
              value={maxCapacity}
              onChange={(e) => {
                setMaxCapacity(parseInt(e.target.value) || 0);
                saveGuestList();
              }}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      
      {/* Stats Dashboard */}
      <div className={styles.statsDashboard}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total Guests</div>
        </div>
        <div className={`${styles.statCard} ${styles.confirmedCard}`}>
          <div className={styles.statValue}>{stats.confirmed}</div>
          <div className={styles.statLabel}>Confirmed</div>
        </div>
        <div className={`${styles.statCard} ${styles.pendingCard}`}>
          <div className={styles.statValue}>{stats.pending}</div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={`${styles.statCard} ${styles.declinedCard}`}>
          <div className={styles.statValue}>{stats.declined}</div>
          <div className={styles.statLabel}>Declined</div>
        </div>
        <div className={`${styles.statCard} ${styles.totalCard}`}>
          <div className={styles.statValue}>{stats.totalAttendees}</div>
          <div className={styles.statLabel}>Total Attending</div>
          <div className={styles.capacityIndicator}>
            <div className={styles.capacityLabel}>
              {Math.min(stats.totalAttendees, maxCapacity)}/{maxCapacity}
            </div>
            <div className={styles.capacityBar}>
              <div
                className={styles.capacityFill}
                style={{
                  width: `${Math.min((stats.totalAttendees / maxCapacity) * 100, 100)}%`,
                  backgroundColor: stats.totalAttendees > maxCapacity ? '#f44336' : '#4caf50'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Guest Form */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          {formData.isEditing ? 'Edit Guest' : 'Add New Guest'}
        </h3>
        <form onSubmit={handleSubmit} className={styles.guestForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name*
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name*
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="group" className={styles.label}>
                Group
              </label>
              <select
                id="group"
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="friends">Friends</option>
                <option value="family">Family</option>
                <option value="colleagues">Colleagues</option>
                <option value="neighbors">Neighbors</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="rsvpStatus" className={styles.label}>
                RSVP Status
              </label>
              <select
                id="rsvpStatus"
                name="rsvpStatus"
                value={formData.rsvpStatus}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="plusOnes" className={styles.label}>
                Plus Ones
              </label>
              <input
                id="plusOnes"
                name="plusOnes"
                type="number"
                min="0"
                value={formData.plusOnes}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="dietaryRestrictions" className={styles.label}>
                Dietary Restrictions
              </label>
              <input
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                type="text"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="e.g., vegetarian, gluten-free, allergies"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.label}>
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Additional information about this guest"
              ></textarea>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {formData.isEditing ? 'Update Guest' : 'Add Guest'}
            </button>
            {formData.isEditing && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setFormData({
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    group: 'friends',
                    rsvpStatus: 'pending',
                    plusOnes: 0,
                    dietaryRestrictions: '',
                    notes: '',
                    isEditing: false
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Guest List */}
      <div className={styles.guestListSection}>
        <h3 className={styles.sectionTitle}>Guest List</h3>
        
        <div className={styles.listControls}>
          <div className={styles.searchFilter}>
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Guests</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          
          <div className={styles.bulkActions}>
            <button
              onClick={() => handleBulkAction('confirm')}
              disabled={selectedGuests.length === 0}
              className={`${styles.bulkButton} ${styles.confirmButton}`}
            >
              Mark Confirmed
            </button>
            <button
              onClick={() => handleBulkAction('pending')}
              disabled={selectedGuests.length === 0}
              className={`${styles.bulkButton} ${styles.pendingButton}`}
            >
              Mark Pending
            </button>
            <button
              onClick={() => handleBulkAction('declined')}
              disabled={selectedGuests.length === 0}
              className={`${styles.bulkButton} ${styles.declineButton}`}
            >
              Mark Declined
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              disabled={selectedGuests.length === 0}
              className={`${styles.bulkButton} ${styles.deleteButton}`}
            >
              Delete Selected
            </button>
          </div>
        </div>
        
        {sortedGuests.length > 0 ? (
          <div className={styles.tableContainer}>
            <table className={styles.guestTable}>
              <thead>
                <tr>
                  <th className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                      onChange={handleSelectAll}
                      className={styles.checkbox}
                    />
                  </th>
                  <th onClick={() => handleSort('firstName')} className={styles.sortableHeader}>
                    Name
                    {sortBy === 'firstName' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('email')} className={styles.sortableHeader}>
                    Contact
                    {sortBy === 'email' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('group')} className={styles.sortableHeader}>
                    Group
                    {sortBy === 'group' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('rsvpStatus')} className={styles.sortableHeader}>
                    RSVP
                    {sortBy === 'rsvpStatus' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('plusOnes')} className={styles.sortableHeader}>
                    Plus Ones
                    {sortBy === 'plusOnes' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                  <th className={styles.actionsCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedGuests.map((guest) => (
                  <tr key={guest.id} className={styles.guestRow}>
                    <td className={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => handleSelectGuest(guest.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <div className={styles.guestName}>
                        {guest.firstName} {guest.lastName}
                      </div>
                      {guest.dietaryRestrictions && (
                        <div className={styles.dietaryTag}>
                          {guest.dietaryRestrictions}
                        </div>
                      )}
                    </td>
                    <td className={styles.contactCell}>
                      {guest.email && <div>{guest.email}</div>}
                      {guest.phone && <div>{guest.phone}</div>}
                    </td>
                    <td>{guest.group}</td>
                    <td>
                      <select
                        value={guest.rsvpStatus}
                        onChange={(e) => handleRsvpChange(guest.id, e.target.value)}
                        className={`${styles.rsvpSelect} ${styles[guest.rsvpStatus]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className={styles.plusOnesCell}>{guest.plusOnes}</td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => handleEdit(guest.id)}
                        className={styles.editButton}
                        aria-label="Edit guest"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(guest.id)}
                        className={styles.deleteButton}
                        aria-label="Delete guest"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No guests found. Add your first guest using the form above.</p>
          </div>
        )}
      </div>
      
      {/* Export and Actions */}
      <div className={styles.exportSection}>
        <div className={styles.exportActions}>
          <button onClick={exportToCsv} className={styles.exportButton}>
            Export to CSV
          </button>
          <button onClick={() => window.print()} className={styles.printButton}>
            Print Guest List
          </button>
          <button onClick={handleReset} className={styles.resetButton}>
            Clear All Guests
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestListManager;

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/tools-page.module.css';

// Dynamically import tool components with loading states
const BudgetCalculator = dynamic(
  () => import('../components/tools/BudgetCalculator'),
  {
    loading: () => <div className={styles.loading}>Loading Budget Calculator...</div>
  }
);

const PlanningChecklist = dynamic(
  () => import('../components/tools/PlanningChecklist'),
  {
    loading: () => <div className={styles.loading}>Loading Planning Checklist...</div>
  }
);

const GuestListManager = dynamic(
  () => import('../components/tools/GuestListManager'),
  {
    loading: () => <div className={styles.loading}>Loading Guest List Manager...</div>
  }
);

/**
 * Interactive Party Planning Tools Page
 * Showcases all the interactive tools available on Party.net
 */
const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState('budget');

  const tools = [
    {
      id: 'budget',
      name: 'Budget Calculator',
      description: 'Plan your party budget with our interactive calculator.',
      icon: '💰'
    },
    {
      id: 'checklist',
      name: 'Planning Checklist',
      description: 'Stay organized with our comprehensive party planning checklist.',
      icon: '✓'
    },
    {
      id: 'guestlist',
      name: 'Guest List Manager',
      description: 'Manage your guest list, track RSVPs, and organize seating.',
      icon: '👥'
    }
  ];

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'budget':
        return <BudgetCalculator />;
      case 'checklist':
        return <PlanningChecklist />;
      case 'guestlist':
        return <GuestListManager />;
      default:
        return <BudgetCalculator />;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Party Planning Tools | Party.net</title>
        <meta 
          name="description" 
          content="Free interactive party planning tools to help you organize your perfect event. Budget calculator, planning checklist, guest list manager and more." 
        />
        <meta 
          name="keywords" 
          content="party planning tools, event budget calculator, party checklist, guest list manager, party planning" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Party Planning Tools',
              description: 'Free interactive party planning tools to help you organize your perfect event.',
              url: 'https://party.net/tools',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Party Budget Calculator',
                    description: 'Plan your party budget with our interactive calculator.',
                    url: 'https://party.net/tools#budget'
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Party Planning Checklist',
                    description: 'Stay organized with our comprehensive party planning checklist.',
                    url: 'https://party.net/tools#checklist'
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Guest List Manager',
                    description: 'Manage your guest list, track RSVPs, and organize seating.',
                    url: 'https://party.net/tools#guestlist'
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <div className={styles.toolsPageContainer}>
        <div className={styles.toolsHeader}>
          <h1 className={styles.pageTitle}>Party Planning Tools</h1>
          <p className={styles.pageDescription}>
            Use our free interactive tools to plan your perfect party. From budgeting to guest management, we've got you covered.
          </p>
        </div>

        <div className={styles.toolsNavigation}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`${styles.toolTab} ${activeTool === tool.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTool(tool.id)}
              aria-selected={activeTool === tool.id}
              id={`tab-${tool.id}`}
              aria-controls={`panel-${tool.id}`}
            >
              <span className={styles.toolIcon}>{tool.icon}</span>
              <span className={styles.toolName}>{tool.name}</span>
              <p className={styles.toolDescription}>{tool.description}</p>
            </button>
          ))}
        </div>

        <div className={styles.toolContent} id={`panel-${activeTool}`} aria-labelledby={`tab-${activeTool}`}>
          {renderActiveTool()}
        </div>

        <div className={styles.toolsInfo}>
          <h2 className={styles.infoTitle}>Why Use Our Party Planning Tools?</h2>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⏱️</div>
              <h3>Save Time</h3>
              <p>Our tools streamline the planning process so you can focus on enjoying your event.</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>💸</div>
              <h3>Save Money</h3>
              <p>Budget effectively and avoid overspending with our planning calculators.</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>😌</div>
              <h3>Reduce Stress</h3>
              <p>Stay organized and on track with checklists and planning tools.</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🎯</div>
              <h3>Be Prepared</h3>
              <p>Anticipate needs and avoid last-minute surprises with comprehensive planning.</p>
            </div>
          </div>
          
          <div className={styles.testimonial}>
            <blockquote>
              "These planning tools saved my daughter's birthday party! The checklist made sure I didn't forget anything important, and the budget calculator kept me from overspending. Highly recommended!"
            </blockquote>
            <cite>— Sarah T., Party Planner</cite>
          </div>
        </div>
        
        <div className={styles.toolsCta}>
          <h2>Ready to start planning your perfect party?</h2>
          <p>Our interactive tools are completely free to use. No sign-up required!</p>
          <p>Bookmark this page to come back anytime during your planning process.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;

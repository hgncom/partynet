import React from 'react';
import Image from 'next/image';
import styles from './AuthorBio.module.css';

const authorData = {
  'Party Planning Expert': {
    name: 'Sarah Mitchell',
    role: 'Senior Event Planner & Content Director',
    credentials: 'Certified Event Planner (CEP), Master in Hospitality Management, International Live Events Association (ILEA) Member',
    bio: 'Sarah has planned over 500 events ranging from intimate gatherings to large-scale celebrations with budgets exceeding $1M. Her work has been featured in Event Planning Magazine and Modern Celebrations. Before joining Party.net, she served as lead coordinator for celebrity events at Platinum Events NYC.',
    image: '/images/author-sarah.jpg',
    expertise: ['Birthday Celebrations', 'Wedding Planning', 'Corporate Events', 'Holiday Gatherings'],
    publications: ['The Art of Celebration (HarperCollins, 2023)', 'Modern Party Planning Quarterly (Contributing Editor)'],
    awards: ['Event Planner of the Year 2022 - NYC Events Association', 'Top 40 Under 40 Event Professionals - Event Industry Council'],
    education: 'Master\'s in Hospitality Management, Cornell University; Bachelor\'s in Business Administration, NYU',
    socialProfiles: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahmitchell-events' },
      { platform: 'Instagram', url: 'https://instagram.com/sarahmitchell_events' }
    ]
  },
  'Wedding Planning Specialist': {
    name: 'Michael Rodriguez',
    role: 'Wedding Planning Director',
    credentials: 'Certified Wedding Planner (CWP), American Association of Certified Wedding Planners (AACWP) Board Member',
    bio: 'With over 15 years dedicated to wedding planning, Michael has orchestrated more than 300 weddings across various cultures and traditions. His approach combines timeless elegance with personalized touches that reflect each couple\'s unique story. Michael regularly speaks at wedding industry conferences and has trained over 50 wedding planners.',
    image: '/images/author-michael.jpg',
    expertise: ['Destination Weddings', 'Multicultural Ceremonies', 'Luxury Weddings', 'Elopements', 'LGBTQ+ Celebrations'],
    publications: ['The Modern Wedding Handbook (Penguin, 2024)', 'Wedding Planner Magazine (Monthly Columnist)'],
    awards: ['Wedding Planner of Excellence - Wedding Industry Professionals Association', 'Top Wedding Innovator - The Knot'],
    education: 'Bachelor\'s in Event Management, Florida International University; Certified Wedding Planner, The Bridal Society',
    socialProfiles: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/michaelrodriguez-weddings' },
      { platform: 'Pinterest', url: 'https://pinterest.com/michaelrodriguezweddings' }
    ]
  },
  'DIY Party Expert': {
    name: 'Emma Chen',
    role: 'Creative Director & Craft Specialist',
    credentials: 'Master Crafter Certification, Former Product Development Lead at Michaels Craft Stores',
    bio: 'Emma brings creativity to life through accessible DIY projects and party decorations. Her background in product development for major craft retailers gives her unique insight into materials, techniques, and cost-effective approaches. Emma\'s DIY party designs have been featured in Better Homes & Gardens, HGTV Magazine, and numerous popular craft blogs.',
    image: '/images/author-emma.jpg',
    expertise: ['DIY Decorations', 'Budget-Friendly Crafts', 'Upcycled Party Elements', 'Seasonal Crafting', 'Kid-Friendly Projects'],
    publications: ['Creative Celebrations: DIY Your Way to Amazing Parties (Chronicle Books, 2023)', 'Craft Monthly (Featured Designer)'],
    awards: ['Craft Influencer of the Year - Craft Industry Alliance', 'DIY Content Creator Award - Maker Faire'],
    education: 'BFA in Design, Rhode Island School of Design; Certificate in Sustainable Crafting, Eco-Craft Institute',
    socialProfiles: [
      { platform: 'Instagram', url: 'https://instagram.com/emmachen_creates' },
      { platform: 'YouTube', url: 'https://youtube.com/c/EmmaChenCreates' }
    ]
  },
  'Food & Beverage Specialist': {
    name: 'James Wilson',
    role: 'Culinary Director & Menu Planning Expert',
    credentials: 'Certified Executive Chef (CEC), Certified Culinary Administrator (CCA), Sommelier Level II Certification',
    bio: 'Chef James combines his restaurant background with event catering expertise to create memorable dining experiences for gatherings of all sizes. After training at the Culinary Institute of America and working in Michelin-starred restaurants, James now specializes in translating high-end culinary techniques into approachable party menus that impress guests while being practical for hosts.',
    image: '/images/author-james.jpg',
    expertise: ['Menu Planning', 'Food & Beverage Pairing', 'Dietary Accommodations', 'Cocktail Development', 'Dessert Stations'],
    publications: ['Celebrate with Flavor: Event Menus that Impress (Simon & Schuster, 2022)', 'Food & Wine (Contributing Writer)'],
    awards: ['James Beard Foundation - Rising Star Chef Nominee', 'International Association of Culinary Professionals - Menu Development Award'],
    education: 'Culinary Institute of America, Associate Degree in Culinary Arts; Cornell University, Food & Beverage Management Certificate',
    socialProfiles: [
      { platform: 'Instagram', url: 'https://instagram.com/chefjameswilson' },
      { platform: 'Twitter', url: 'https://twitter.com/chefjameswilson' }
    ]
  }
};

export default function AuthorBio({ authorName }) {
  const author = authorData[authorName] || authorData['Party Planning Expert'];
  
  return (
    <div className={`${styles.authorBio} author-bio`} itemScope itemType="https://schema.org/Person">
      <div className={styles.authorImageContainer}>
        {author.image && (
          <div className={styles.authorImage}>
            <Image 
              src={author.image} 
              alt={author.name} 
              width={100} 
              height={100}
              className={styles.roundedImage}
              itemProp="image"
            />
          </div>
        )}
      </div>
      <div className={styles.authorInfo}>
        <h3 className={styles.authorName} itemProp="name">{author.name}</h3>
        <p className={styles.authorRole} itemProp="jobTitle">{author.role}</p>
        <p className={styles.authorCredentials} itemProp="hasCredential">{author.credentials}</p>
        <p className={styles.authorBioText} itemProp="description">{author.bio}</p>
        
        {author.expertise && (
          <div className={styles.expertiseAreas}>
            <span className={styles.sectionLabel}>Areas of Expertise:</span>
            <ul className={styles.expertiseList}>
              {author.expertise.map((area, index) => (
                <li key={index} className={styles.expertiseItem} itemProp="knowsAbout">{area}</li>
              ))}
            </ul>
          </div>
        )}
        
        {author.education && (
          <div className={styles.educationSection}>
            <span className={styles.sectionLabel}>Education:</span>
            <p className={styles.educationText} itemProp="alumniOf">{author.education}</p>
          </div>
        )}
        
        {author.publications && (
          <div className={styles.publicationsSection}>
            <span className={styles.sectionLabel}>Publications:</span>
            <ul className={styles.publicationsList}>
              {author.publications.map((publication, index) => (
                <li key={index} className={styles.publicationItem} itemProp="workExample">{publication}</li>
              ))}
            </ul>
          </div>
        )}
        
        {author.awards && (
          <div className={styles.awardsSection}>
            <span className={styles.sectionLabel}>Awards & Recognition:</span>
            <ul className={styles.awardsList}>
              {author.awards.map((award, index) => (
                <li key={index} className={styles.awardItem} itemProp="award">{award}</li>
              ))}
            </ul>
          </div>
        )}
        
        {author.socialProfiles && (
          <div className={styles.socialSection}>
            <span className={styles.sectionLabel}>Connect:</span>
            <ul className={styles.socialList}>
              {author.socialProfiles.map((profile, index) => (
                <li key={index} className={styles.socialItem}>
                  <a 
                    href={profile.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    itemProp="sameAs"
                  >
                    {profile.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

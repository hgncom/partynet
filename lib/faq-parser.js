/**
 * Extracts FAQ items from HTML content
 * Looks for sections with an h2/h3 containing "FAQ" or "Frequently Asked Questions"
 * and parses the questions (h3/h4) and answers (p) that follow
 */
export function extractFAQs(htmlContent) {
  if (!htmlContent) return [];
  
  // Check if the content has a FAQ section
  const hasFAQSection = 
    htmlContent.includes('<h2>Frequently Asked Questions</h2>') || 
    htmlContent.includes('<h2>FAQ</h2>') ||
    htmlContent.includes('<h3>Frequently Asked Questions</h3>') ||
    htmlContent.includes('<h3>FAQ</h3>');
  
  if (!hasFAQSection) return [];
  
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find the FAQ section
  const faqHeading = 
    Array.from(tempDiv.querySelectorAll('h2')).find(h => 
      h.textContent.includes('Frequently Asked Questions') || h.textContent.includes('FAQ')
    ) ||
    Array.from(tempDiv.querySelectorAll('h3')).find(h => 
      h.textContent.includes('Frequently Asked Questions') || h.textContent.includes('FAQ')
    );
  
  if (!faqHeading) return [];
  
  // Get all elements after the FAQ heading
  let faqItems = [];
  let currentNode = faqHeading.nextElementSibling;
  let currentQuestion = null;
  let currentAnswer = '';
  
  // Process elements until we hit another major heading or the end
  while (currentNode && !['H1', 'H2'].includes(currentNode.tagName)) {
    // If we find a question (h3 or h4)
    if (['H3', 'H4'].includes(currentNode.tagName)) {
      // If we already have a question, save the previous Q&A pair
      if (currentQuestion) {
        faqItems.push({
          question: currentQuestion,
          answer: currentAnswer.trim()
        });
      }
      
      // Start a new Q&A pair
      currentQuestion = currentNode.textContent;
      currentAnswer = '';
    } 
    // If we're building an answer
    else if (currentQuestion && ['P', 'UL', 'OL'].includes(currentNode.tagName)) {
      currentAnswer += currentNode.outerHTML;
    }
    
    currentNode = currentNode.nextElementSibling;
  }
  
  // Add the last Q&A pair if there is one
  if (currentQuestion) {
    faqItems.push({
      question: currentQuestion,
      answer: currentAnswer.trim()
    });
  }
  
  return faqItems;
}

/**
 * Server-side compatible FAQ extraction
 * This version doesn't rely on DOM manipulation and works in Node.js
 */
export function extractFAQsServer(htmlContent) {
  if (!htmlContent) return [];
  
  // Check if the content has a FAQ section
  const hasFAQSection = 
    htmlContent.includes('<h2>Frequently Asked Questions</h2>') || 
    htmlContent.includes('<h2>FAQ</h2>') ||
    htmlContent.includes('<h3>Frequently Asked Questions</h3>') ||
    htmlContent.includes('<h3>FAQ</h3>');
  
  if (!hasFAQSection) return [];
  
  // Simple regex-based extraction (not as robust as DOM parsing but works server-side)
  const faqItems = [];
  
  // Find FAQ section
  const faqSectionMatch = htmlContent.match(/<h[23]>(?:Frequently Asked Questions|FAQ)<\/h[23]>([\s\S]*?)(?:<h[12]>|$)/i);
  
  if (!faqSectionMatch) return [];
  
  const faqSection = faqSectionMatch[1];
  
  // Extract questions and answers
  const questionMatches = faqSection.match(/<h[34]>(.*?)<\/h[34]>/g) || [];
  
  questionMatches.forEach((questionMatch, index) => {
    const question = questionMatch.replace(/<\/?h[34]>/g, '');
    
    // Get content between this question and the next one (or end of section)
    let answerMatch;
    if (index < questionMatches.length - 1) {
      const nextQuestionPos = faqSection.indexOf(questionMatches[index + 1], faqSection.indexOf(questionMatch) + questionMatch.length);
      answerMatch = faqSection.substring(
        faqSection.indexOf(questionMatch) + questionMatch.length,
        nextQuestionPos
      );
    } else {
      answerMatch = faqSection.substring(faqSection.indexOf(questionMatch) + questionMatch.length);
    }
    
    // Clean up the answer - remove any heading tags but keep paragraphs
    const answer = answerMatch.trim();
    
    faqItems.push({
      question,
      answer
    });
  });
  
  return faqItems;
}

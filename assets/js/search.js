document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Define static search data for basic functionality
  const searchData = [
    {
      title: "Introduction",
      url: "/index.html",
      content: "Welcome to the Ona API Platform! Here's how you can get started with onboarding and integrating our powerful API into your systems. You have the option of accessing Ona's capabilities via our On-Demand web app, or by embedding the API directly within your own technology stack."
    },
    {
      title: "API Endpoints",
      url: "/endpoints.html",
      content: "This guide details the APIs available in the Ona ecosystem, including their base URLs, endpoints, request parameters, and response structures. The API system dynamically routes requests to the appropriate regional endpoint based on a region query parameter, processed via CloudFront and Lambda@Edge."
    },
    {
      title: "Ona SDK",
      url: "/sdk.html",
      content: "This reference documents every object and method available in Ona's SDK for seamless integration with the Ona API Platform. Use our SDK to upload large historical datasets, retrieve pre-signed URLs for secure file uploads, and interact programmatically with Ona's APIs for energy forecasting, dispatching, and analysis."
    },
    {
      title: "Ona On-Demand",
      url: "/analyst.html",
      content: "Welcome to Ona On-Demand—your comprehensive web app for navigating complex energy policies and managing grid operations with ease. This guide will help you get started quickly, understand best practices for interacting with the app, and explore key features."
    }
  ];

  // Handle search input
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    // Clear results if query is empty
    if (!query) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    // Perform search
    const results = performSearch(query, searchData);
    
    // Display results
    if (results.length > 0) {
      let resultsHtml = '<ul>';
      results.forEach(result => {
        resultsHtml += `<li><a href="${result.url}">${result.title}</a>: ${result.preview}</li>`;
      });
      resultsHtml += '</ul>';
      searchResults.innerHTML = resultsHtml;
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
      searchResults.style.display = 'block';
    }
  });

  // Simple search function
  function performSearch(query, data) {
    const results = [];
    
    // Search through each page
    data.forEach(page => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();
      
      if (title.includes(query) || content.includes(query)) {
        // Find a relevant snippet from the content
        let previewIndex = content.indexOf(query);
        let preview = '...';
        
        if (previewIndex !== -1) {
          // Get a snippet around the query
          const start = Math.max(0, previewIndex - 40);
          const end = Math.min(content.length, previewIndex + query.length + 40);
          preview += content.substring(start, end) + '...';
        } else {
          // If query is not found in content, use the beginning
          preview += content.substring(0, 80) + '...';
        }
        
        results.push({
          title: page.title,
          url: page.url,
          preview: preview
        });
      }
    });
    
    return results;
  }

  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = 'none';
    }
  });
}); 
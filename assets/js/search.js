document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchData;

  // Fetch the search index
  fetch('/assets/js/search-data.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
    })
    .catch(error => {
      console.error('Error loading search data:', error);
    });

  // Handle search input
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    // Clear results if query is empty
    if (!query) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    if (!searchData) {
      searchResults.innerHTML = '<p>Search data is still loading...</p>';
      searchResults.style.display = 'block';
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
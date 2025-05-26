document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');

  // Debounce helper to limit how often filtering runs on input
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Filter recipes based on search query (case insensitive)
  function filterRecipes(query) {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Display filtered search results in dropdown
  function displayResults(results) {
    searchResultsDiv.innerHTML = '';
    if (results.length > 0) {
      results.forEach(result => {
        const link = document.createElement('a');
        link.href = result.href;
        link.textContent = result.title;
        link.style.display = 'block';     // full width clickable
        link.style.padding = '12px 15px'; // bigger tap area
        link.style.fontSize = '1.1em';    // easier to read on mobile
        link.style.borderBottom = '1px solid #ccc';
        link.style.touchAction = 'manipulation'; // smoother tap
        searchResultsDiv.appendChild(link);
      });
      searchResultsDiv.style.display = 'block';
    } else {
      const noResults = document.createElement('div');
      noResults.textContent = 'No recipes found.';
      noResults.classList.add('no-results'); // Use CSS class for styling
      searchResultsDiv.appendChild(noResults);
      searchResultsDiv.style.display = 'block';
    }
  }

  // Handle input changes with debounce for performance
  searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      searchResultsDiv.style.display = 'none';
    }
  }, 300));

  // On Enter key, redirect if exact match found
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      const match = recipes.find(recipe => recipe.title.toLowerCase() === query);
      if (match) {
        window.location.href = match.href;
      }
    }
  });

  // Hide search results when clicking outside the search container
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
      searchResultsDiv.style.display = 'none';
    }
  });

  // Make entire recipe cards clickable via data attribute
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-href');
      if (link) {
        window.location.href = link;
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');

  // Debounce to limit filtering frequency
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Filters recipes based on search query
  const filterRecipes = (query) =>
    recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

  // Clears and hides search results
  const clearResults = () => {
    searchResultsDiv.innerHTML = '';
    searchResultsDiv.classList.remove('visible');
  };

  // Renders the filtered search results
  const displayResults = (results) => {
    clearResults();
    if (results.length > 0) {
      results.forEach(({ title, href }) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = title;
        searchResultsDiv.appendChild(link);
      });
    } else {
      const noResult = document.createElement('div');
      noResult.textContent = 'No recipes found.';
      noResult.className = 'no-results';
      searchResultsDiv.appendChild(noResult);
    }
    searchResultsDiv.classList.add('visible');
  };

  // Handles input events
  const handleInput = debounce(() => {
    const query = searchInput.value.trim();
    if (query) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      clearResults();
    }
  }, 200);

  // Handles Enter key for direct navigation
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      const match = recipes.find(recipe => recipe.title.toLowerCase() === query);
      if (match) {
        window.location.href = match.href;
      }
    }
  };

  // Hides search results when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.search-container')) {
      clearResults();
    }
  };

  // Event listeners
  searchInput.addEventListener('input', handleInput);
  searchInput.addEventListener('keydown', handleEnterKey);
  document.addEventListener('click', handleClickOutside);
});
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

  // Function to filter recipes based on search query
  function filterRecipes(query) {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Function to display search results
  function displayResults(results) {
    searchResultsDiv.innerHTML = '';
    if (results.length > 0) {
      results.forEach(result => {
        const link = document.createElement('a');
        link.href = result.href;
        link.textContent = result.title;
        link.style.display = 'block'; // full width clickable
        link.style.padding = '12px 15px'; // bigger tap area
        link.style.fontSize = '1.1em';   // easier to read on mobile
        link.style.borderBottom = '1px solid #ccc';
        link.style.touchAction = 'manipulation'; // smoother tap
        searchResultsDiv.appendChild(link);
      });
      searchResultsDiv.style.display = 'block';
    } else {
      const noResults = document.createElement('div');
      noResults.textContent = 'No recipes found.';
      noResults.style.padding = '15px';
      noResults.style.fontSize = '1.1em';
      noResults.style.color = '#777';
      searchResultsDiv.appendChild(noResults);
      searchResultsDiv.style.display = 'block';
    }
  }

  // Debounced event listener for input changes (300ms delay)
  searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      searchResultsDiv.style.display = 'none';
    }
  }, 300));

  // Enter key: redirect if exact match
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      const match = recipes.find(recipe => recipe.title.toLowerCase() === query);
      if (match) {
        window.location.href = match.href;
      }
    }
  });

  // Hide search results when clicking/tapping outside the search container
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
      searchResultsDiv.style.display = 'none';
    }
  });

  // Make recipe cards clickable (if exists)
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-href');
      if (link) {
        window.location.href = link;
      }
    });
  });
});

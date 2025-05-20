document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');

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
        searchResultsDiv.appendChild(link);
      });
      searchResultsDiv.style.display = 'block';
    } else {
      const noResults = document.createElement('div');
      noResults.textContent = 'No recipes found.';
      noResults.style.padding = '10px';
      searchResultsDiv.appendChild(noResults);
      searchResultsDiv.style.display = 'block';
    }
  }

  // Input listener
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      searchResultsDiv.style.display = 'none';
    }
  });

  // ⌨️ Enter key: redirect to recipe if exact match
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      const match = recipes.find(recipe => recipe.title.toLowerCase() === query);
      if (match) {
        window.location.href = match.href;
      }
    }
  });

  // Click outside hides dropdown
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
      searchResultsDiv.style.display = 'none';
    }
  });
});

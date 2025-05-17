document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');
  const recipeCards = document.querySelectorAll('.recipe-card'); // Get all recipe cards on the page

  // Function to filter recipes based on search query
  function filterRecipes(query) {
    const results = [];
    recipeCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      if (title.includes(query)) {
        results.push({ title: card.dataset.title, href: card.dataset.href });
      }
    });
    return results;
  }

  // Function to display search results in the dropdown
  function displayResults(results) {
    searchResultsDiv.innerHTML = ''; // Clear previous results
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
      noResults.classList.add('no-results');
      noResults.textContent = 'No recipes found.';
      searchResultsDiv.appendChild(noResults);
      searchResultsDiv.style.display = 'block';
    }
  }

  // Event listener for input changes in the search bar
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      searchResultsDiv.style.display = 'none'; // Hide dropdown when input is empty
    }
  });

  // Close the dropdown when clicking outside the search bar
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
      searchResultsDiv.style.display = 'none';
    }
  });

  // Add event listener to recipe cards for redirection
  const allRecipeCards = document.querySelectorAll('.recipe-card');
  allRecipeCards.forEach(card => {
    card.addEventListener('click', () => {
      const href = card.dataset.href;
      if (href) {
        window.location.href = href;
      }
    });
  });
});
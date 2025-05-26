document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResultsDiv = document.getElementById("searchResults");

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function filterRecipes(query) {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  function clearResults() {
    searchResultsDiv.innerHTML = "";
    searchResultsDiv.style.display = "none";
  }

  function displayResults(results) {
    clearResults();
    if (results.length > 0) {
      results.forEach(({ title, href }) => {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = title;
        link.style.display = "block";
        link.style.padding = "12px 15px";
        link.style.fontSize = "1.1em";
        link.style.borderBottom = "1px solid #ccc";
        link.style.touchAction = "manipulation";
        searchResultsDiv.appendChild(link);
      });
    } else {
      const noResults = document.createElement("div");
      noResults.textContent = "No recipes found.";
      noResults.className = "no-results";
      searchResultsDiv.appendChild(noResults);
    }
    searchResultsDiv.style.display = "block";
  }

  const handleInput = debounce(() => {
    const query = searchInput.value.trim();
    if (query) {
      const results = filterRecipes(query);
      displayResults(results);
    } else {
      clearResults();
    }
  }, 300);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      const match = recipes.find(
        (recipe) => recipe.title.toLowerCase() === query
      );
      if (match) {
        window.location.href = match.href;
      }
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".search-container")) {
      clearResults();
    }
  };

  // Attach listeners
  searchInput.addEventListener("input", handleInput);
  searchInput.addEventListener("keydown", handleEnterKey);
  document.addEventListener("click", handleClickOutside);

  // Optional: Make recipe cards clickable if present
  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-href");
      if (link) {
        window.location.href = link;
      }
    });
  });
});

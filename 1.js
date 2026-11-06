const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const loadMoreButton = document.getElementById("load-more");
const searchButton = document.getElementById("search-button");

let currentPage = 1;
let currentSearch = "";

const ACCESS_KEY = "feebZCAgzRji0NVaQ8_OpP9VbwpyNlwFGrjmBqkfmjU";

const main = async (page) => {
  loadMoreButton.textContent = "Loading...";
  try {
    const response = await fetch(`https://api.unsplash.com/photos?page=${page}`, {
      headers: {
        Authorization: "Client-ID feebZCAgzRji0NVaQ8_OpP9VbwpyNlwFGrjmBqkfmjU",
      },
    });

    const result = await response.json();

    if (!Array.isArray(result)) {
      console.error("API Error:", result);
      return;
    }

    result.forEach((photo) => {
      const id = photo.id;
      const imageUrl = photo.urls.small;

      gallery.innerHTML += `
        <img src="${imageUrl}" alt="${id}" class="w-full h-auto rounded-2xl mb-3 shadow-md"/>
      `;
    });
    loadMoreButton.textContent = "Load More";
  } catch (error) {
    console.error("Fetch алдаа гарлаа:", error);
  }
};

const searchPhotos = async (page) => {
  loadMoreButton.textContent = "Loading...";
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentSearch)}&page=${page}`, {
      headers: {
        Authorization: "Client-ID feebZCAgzRji0NVaQ8_OpP9VbwpyNlwFGrjmBqkfmjU",
      },
    });

    const result = await response.json();

    result.results.forEach((photo) => {
      const id = photo.id;
      const imageUrl = photo.urls.small;

      gallery.innerHTML += `
        <img src="${imageUrl}" alt="${id}" class="w-full h-auto rounded-2xl mb-3 shadow-md"/>
      `;
    });
  } catch (error) {
    console.error("Fetch алдаа гарлаа:", error);
  }

  loadMoreButton.textContent = "Load More";
};

main(currentPage);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  gallery.innerHTML = "";
  currentPage = 1;
  currentSearch = searchInput.value.trim();

  searchPhotos(currentPage);
});

loadMoreButton.addEventListener("click", () => {
  currentPage++;
  if (currentSearch) {
    searchPhotos(currentPage);
  } else {
    main(currentPage);
  }
});

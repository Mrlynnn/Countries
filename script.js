const search = document.querySelector("#search");
const filter = document.querySelector("#select_country");
const cardSection = document.querySelector("#cards_section");
const xMarkSearch = document.querySelector("#xmark_search");
const xMarkFilter = document.querySelector("#xmark_filter");
const lightMode = document.querySelector("#light_mode");

async function getData() {
  const resp = await fetch("https://restcountries.com/v3.1/all");
  const data = await resp.json();
  return data;
}

function getCountryRegions() {
  return document.querySelectorAll("article .describe #card_region");
}

function createCard(data) {
  cardSection.innerHTML = data
    .map(
      (country) => `
    <article class="card">
      <img id="card_image" src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <div class="describe">
        <h3 id="card_country_name">${country.name.common}</h3>
        <span id="card_population"><b>Population:</b> ${country.population}</span>
        <span id="card_region"><b>Region:</b> ${country.region}</span>
        <span id="card_capital"><b>Capital:</b> ${country.capital}</span>
      </div>
    </article>
  `
    )
    .join("");
}
getData().then((data) => createCard(data));

function showCard(card) {
  card.style.display = "inline-block";
}

function hideCard(card) {
  card.style.display = "none";
}

function resetFilters(type) {
  const countrysRegion = getCountryRegions();

  countrysRegion.forEach((region) => {
    if (type === "search" || type === "filter") {
      showCard(region.closest(".card"));
    }
  });

  if (type === "search") {
    xMarkSearch.style.display = "none";
    search.value = "";
  } else if (type === "filter") {
    xMarkFilter.style.display = "none";
    filter.selectedIndex = 0;
  }
}

search.addEventListener("input", function searchCountry() {
  const h3Arr = document.querySelectorAll(".card h3");
  const that = this;
  xMarkSearch.style.display =
    that.value.trim() !== "" ? "inline-block" : "none";

  h3Arr.forEach(function (h3) {
    if (
      h3.textContent.trim().toLowerCase().includes(that.value.toLowerCase())
    ) {
      showCard(h3.closest(".card"));
    } else {
      hideCard(h3.closest(".card"));
    }
  });
});

filter.addEventListener("change", function () {
  xMarkFilter.style.display = "inline-block";
  const selectedRegion = this.options[this.selectedIndex].text;
  const countrysRegion = getCountryRegions();

  countrysRegion.forEach((region) => {
    const regionText = region.textContent.split(":")[1].trim();
    if (selectedRegion === regionText) {
      showCard(region.closest(".card"));
    } else {
      hideCard(region.closest(".card"));
    }
  });
});

xMarkSearch.addEventListener("click", function closeSearch() {
  resetFilters("search");
});

xMarkFilter.addEventListener("click", function closeFilter() {
  resetFilters("filter");
});

lightMode.addEventListener("click", function darkModeSwitch() {
  const moonIcon = document.querySelector(".fa-moon");
  const modeText = document.querySelector("#light_mode_text");
  const cards = document.querySelectorAll(".card");

  document.body.classList.toggle("dark_mode_body");
  addClass(document.querySelector(".search_country"));
  addClass(document.querySelector("#select_country"));
  addClass(document.querySelector(".filter"));
  addClass(document.querySelector(".header"));

  cards.forEach((card) => {
    addClass(card);
  });

  if (document.body.classList.contains("dark_mode_body")) {
    moonIcon.style.color = "white";
    modeText.textContent = "Dark Mode";
  } else {
    moonIcon.style.color = "";
    modeText.textContent = "Light Mode";
  }
});

function addClass(element) {
  element.classList.toggle("dark_mode_card");
}

function autocomplete() {
    const input = document.getElementById('searchInput');
    const inputValue = input.value.toLowerCase();
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');

    // Clear previous autocomplete suggestions
    autocompleteDropdown.innerHTML = '';

    // Filter country names based on input value
    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(inputValue)
    );

    // Display autocomplete suggestions
    filteredCountries.forEach(country => {
        const suggestion = document.createElement('div');
        suggestion.textContent = country;
        suggestion.addEventListener('click', () => {
            input.value = country; // Set input value to the selected country
            autocompleteDropdown.innerHTML = ''; // Clear autocomplete dropdown
        });
        autocompleteDropdown.appendChild(suggestion);
    });
}






function searchCountry() {
    const searchInput = document.getElementById('searchInput').value;
    document.getElementById("searchInput").value = "";  


    const searchResults = document.getElementById('searchResults');
    const weatherDetailsContainer = document.getElementById('weatherDetailsContainer');

    // Clear previous search results and weather details
    searchResults.innerHTML = '';
    weatherDetailsContainer.innerHTML = ''; // Clear weather details for previous country

    
    fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
    .then(response => response.json())
    .then(data => {
        displayCountryData(data);
        scrollToResults(); // Scroll to the search results
    })
    .catch(error => console.log(error));
}


function scrollToResults() {
    console.log("Scrolling to results...");
    const searchResults = document.getElementById('searchResults');
    console.log("Search results element:", searchResults);
    // Scroll to the search results section
    searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}








function displayCountryData(countryData) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    countryData.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        const name = document.createElement('h2');
        name.textContent = country.name.common;

        const flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.alt = `${country.name.common} flag`;

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;

        const population = document.createElement('p');
        const populationInMillions = (country.population / 1000000).toFixed(2); // Convert population to millions with 2 decimal places

        population.textContent = `Population: ${populationInMillions} million`;

        const moreDetailsBtn = document.createElement('button');
        moreDetailsBtn.textContent = 'More Details';
        moreDetailsBtn.addEventListener('click', () => showMoreDetails(country));

        countryCard.appendChild(name);
        countryCard.appendChild(flag);
        countryCard.appendChild(capital);
        countryCard.appendChild(population);
        countryCard.appendChild(moreDetailsBtn);

        searchResults.appendChild(countryCard);
    });
}

function showMoreDetails(country) {
    const countryName = country.name.common;
    const weatherAPIKey = '27e6dc585b4e91012b40f49699562a2a';
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${countryName}&units=metric&appid=${weatherAPIKey}`;

    // Clear previous weather details
    const weatherDetailsContainer = document.getElementById('weatherDetailsContainer');
    weatherDetailsContainer.innerHTML = '';

    fetch(weatherAPIUrl)
        .then(response => response.json())
        .then(weatherData => {
            // Here you can display weather data on your UI
            console.log(weatherData);
            // For example, you can create elements and append them to display weather data
            const weatherDetails = document.createElement('div');
            weatherDetails.innerHTML = `
                <h3>Weather Details for ${countryName}</h3>
                <p>Temperature: ${weatherData.list[0].main.temp} °C</p>
                <p>Weather: ${weatherData.list[0].weather[0].description}</p>
                <!-- Add more weather data here as needed -->
            `;
            weatherDetailsContainer.appendChild(weatherDetails);
        })
        .catch(error => console.error("Failed to fetch weather data:", error));
}












const country = document.querySelector('.country');
const form = document.querySelector('form');
const search = document.querySelector('.search');

// inject HTML to DOM
const renderCountry = (data, className = '') => {
	const html = `
        <img class="flag" src="${data.flags.svg}" />
        <div class="details">
            <h2>${data.name.official}</h2>
            <h3>${data.region}</h3>
            <p><span>Capital:</span> ${data.capital[0]}</p>
            <p><span>Population:</span> ${(+data.population / 1000000).toFixed(
							2
						)}M</p>
        </div>
`;

	country.innerHTML = html;
	country.classList.remove('hidden');
	form.reset();
};

const searchCountry = () => {
	// get search term for country
	let term = search.value.toLowerCase();

	// check search for UK countries
	if (term === 'england' || term === 'scotland' || term === 'wales') {
		term = 'united kingdom';
	}

	// make fetch request
	const getCountryData = (term) => {
		fetch(`https://restcountries.com/v3.1/name/${term}`)
			.then((response) => response.json())
			.then((data) => renderCountry(data[0]));
	};

	getCountryData(term);
};

// listen for user input
form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (search.value) {
		searchCountry();
	}
});

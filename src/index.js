import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countryEl = document.querySelector('#search-box');
countryEl.addEventListener('input', debounce(handler, DEBOUNCE_DELAY));

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handler(e) {
  e.preventDefault();
  clear();
  const searchContry = e.target.value.trim();
  if (!searchContry) {
    return;
  }
  fetchCountries(searchContry)
    .then(data => renderUserList(data))
    .catch(error => {
      if ((error = 404)) {
        Notify.failure('Oops, there is no country with that name');
      }
    });
}

function renderUserList(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    countryList.innerHTML = '';
    return;
  }

  if (data.length > 1 && data.length < 10) {
    const markup = data
      .map(({ name, flags }) => {
        return ` <li><img  class='img' src='${flags.svg}' alt='flag of ${name.official}'/>  ${name.official} </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
    return;
  }

  if (data.length === 1) {
    const markup = data
      .map(({ name, flags, capital, population, languages }) => {
        return `<img  class='img-info' src='${flags.svg}' alt='flag of ${name.official}'/>
        <p class="country">${name.official}</p>
        <p class='info'><span>Capital: </span>${capital}</p>
        <p class='info'><span>Population: </span>${population}</p>
        <p class='info'><span>Languages: </span>${languages}</p>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
    return;
  }
}

function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}



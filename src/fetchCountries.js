export function fetchCountries(searchContry) {
    if(!searchContry){
        return
    }

  return fetch(`https://restcountries.com/v3.1/name/${searchContry}?fields=name,capital,population,flags,languages`)
    .then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    })  
   
}

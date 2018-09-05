let close = document.querySelector(".close");
let search = document.querySelector(".search");
let modal = document.querySelector(".modal");
let backDrop = document.querySelector(".backdrop");
let countries = document.querySelector(".countries");
let endpointAPI = "https://restcountries.eu/rest/v2/all";
let error = "something went wrong !";
fetch(endpointAPI)
  .then(res => res.json())
  .then(data => {
    data.forEach(country => {
      let countryName = country.name;
      let countryCapital = country.capital;
      let countryFlag = country.flag;

      let callingCode = country.callingCodes; //array
      let currency = country.currencies; // array
      let language = country.languages; // array
      let latitude = country.latlng[0];
      let longiitude = country.latlng[1];
      let population = country.population;
      let region = country.region;
      let timeZone = country.timezones; //array

      let singleCountry = document.createElement("div");
      singleCountry.classList.add("country");
      singleCountry.innerHTML = `
             <div class="country-flag">
                    <div class="bg">
                        <div class="country-details">
                            <h1 class="country-name">${countryName}</h1>
                            <h2 class="country-capital">${countryCapital}</h2>
                            <a class="view" href="#">View >>></a>
                        </div>
                    </div>
             </div>
            `;

      countries.appendChild(singleCountry);
      //Select all the div with the class of "bg"
      let bg = singleCountry.querySelectorAll("div");
      bg[1].style.backgroundImage = `linear-gradient(rgba(5,5,5,0.5),rgba(5,5,5,0.5)),url(${countryFlag})`;
      //Add click event on each link inside the div with class of "country details"
      bg[2].childNodes[5].addEventListener("click", showModal);
    });

    //console.log(countryDetails);
  })
  .catch(err => console.log(err));

//Show the modal
function showModal(e) {
  e.preventDefault();
  backDrop.style.display = "block";
  modal.style.display = "block";
}
close.addEventListener("click", closeModal);
//Close the modal
function closeModal() {
  backDrop.style.display = "none";
  modal.style.display = "none";
}

// Add a keyup event on the search input
search.addEventListener("keyup", filterCountry);

// Filter country function
function filterCountry() {
  // Set the user input for search
  const countrySearchText = search.value.toUpperCase();
  //Set a reference for all div with "country-details" class
  let countryDetails = document.querySelectorAll(".country-details");

  // Loop thru all those div
  countryDetails.forEach(countryDetail => {
    //Check if the user input match partially or totally with the different countries' names
    if (
      countryDetail.firstElementChild.textContent
        .toUpperCase()
        .indexOf(countrySearchText.trim()) != -1
    ) {
      // get the div with the "country" class and display it if match
      countryDetail.parentElement.parentElement.parentElement.style.display =
        "block";
    } else {
      //otherwise,hide it
      countryDetail.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
}

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

    //console.log(data);

    function showModal(e) {
      e.preventDefault();
      backDrop.style.display = "block";
      modal.style.display = "block";
      console.log(e.target.parentElement.firstElementChild.textContent);
      //display the datas iinside the modal
      let modalContent = modal.querySelector(".modal-content");
      data.forEach(country => {
        let countryName = country.name;
        let countryCapital = country.capital;
        let countryFlag = country.flag;
        let area = country.area;
        let callingCode = country.callingCodes; //array
        let currency = country.currencies; // array
        let language = country.languages; // array
        let latitude = country.latlng[0];
        let longitude = country.latlng[1];
        let population = country.population;
        let region = country.region;
        let timeZone = country.timezones; //array
        if (
          e.target.parentElement.firstElementChild.textContent == country.name
        ) {
          modalContent.innerHTML = `
<div class="modal-left">
                        <h2>${countryName}</h2>
                        <div class="modal-image"> <img src="${countryFlag}" alt="flag"></div>

                    </div>
                    <div class="modal-right">
                        <h2>Capital:<span class="capital">${countryCapital}</span></h2>
                        <h2>Region:<span class="region">${region}</span></h2>
                        <h2>Population:<span class="population">${population}</span></h2>
                        <h2>Area:<span class="area">${area}</span></h2>
                        <h2>Calling Code:<span class="calling-code">${callingCode}</span></h2>
                        <h2>Currency:<span class="ccurrency">${currency}</span></h2>
                        <h2>Languages:<span class="language">${language}</span></h2>
                        <h2>Latitude:<span class="latitude">${latitude}</span></h2>
                        <h2>Longitude:<span class="longitude">${longitude}</span></h2>
                        <h2>Time Zone:<span class="time-zone">${timeZone}</span></h2>
      `;
        }
      });
    }
  })
  .catch(err => console.log(err));

//Show the modal

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

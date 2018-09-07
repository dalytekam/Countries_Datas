let close = document.querySelector(".close");
let search = document.querySelector(".search");
let modal = document.querySelector(".modal");
let backDrop = document.querySelector(".backdrop");
let countries = document.querySelector(".countries");
let endpointAPI = "https://restcountries.eu/rest/v2/all";
let error = "something went wrong !";
let km = "Km" + "2".sup();
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

    console.log(data);

    function showModal(e) {
      e.preventDefault();
      backDrop.style.display = "block";
      modal.style.display = "block";
      //console.log(e.target.parentElement.firstElementChild.textContent);
      //display the datas iinside the modal
      let modalContent = modal.querySelector(".modal-content");
      data.forEach(country => {
        let countryName = country.name;
        let countryCapital = country.capital;
        let countryFlag = country.flag;
        let area = parseInt(country.area).toLocaleString() + " " + km;
        let callingCode = country.callingCodes; //array
        let currency = country.currencies; // array
        let language = country.languages; // array
        let latitude = country.latlng[0];
        let longitude = country.latlng[1];
        let population = parseInt(country.population).toLocaleString();
        let region = country.region;
        let timeZone = country.timezones; //array
        let topDomain = country.topLevelDomain[0]; //Array
        let alphaCode = country.alpha3Code;

        if (
          e.target.parentElement.firstElementChild.textContent == country.name
        ) {
          modalContent.innerHTML = `
<div class="modal-left">
                        <div><h2>${countryName}</h2></div>
                        <div class="modal-image"> <img src="${countryFlag}" alt="flag"></div>

                    </div>
                    <div class="modal-right">
                        <h2>Capital: <span class="capital">${countryCapital}</span></h2>
                        <h2>Region: <span class="region">${region}</span></h2>
                        <h2>Population: <span class="population">${population}</span></h2>
                        <h2>Area: <span class="area">${area}</span></h2>
                        <h2>Latitude: <span class="latitude">${latitude}</span></h2>
                        <h2>Longitude: <span class="longitude">${longitude}</span></h2>
                        <h2>Top Level Domain: <span class="top-domain">${topDomain}</span></h2>
                        <h2>Alpha3 Code: <span class="alpha-3">${alphaCode}</span></h2>
                        </div>
      `;
          // get the calling code
          const br = document.createElement("br");
          const semicolon = "; ";
          const plusSign = "+";
          let comma = ", ";
          const modalRight = document.querySelector(".modal-right");
          let h2Call = document.createElement("h2");
          let h2CallText = document.createTextNode("Calling Code: ");
          h2Call.appendChild(h2CallText);
          for (let i = 0; i < callingCode.length; i++) {
            let h2CallChildren = document.createTextNode(callingCode[i]);
            let callSpan = document.createElement("span");
            callSpan.className = "calling-code";

            if (callingCode.indexOf(callingCode[i]) == callingCode.length - 1) {
              callSpan.append(plusSign);
              callSpan.appendChild(h2CallChildren);
            } else {
              callSpan.append(plusSign);
              callSpan.appendChild(h2CallChildren);
              callSpan.append(comma);
            }
            h2Call.appendChild(callSpan);
          }
          modalRight.appendChild(h2Call);

          //Get the currency
          let h2Currency = document.createElement("h2");
          let h2CurrencyText = document.createTextNode("Currency: ");
          h2Currency.appendChild(h2CurrencyText);
          for (let i = 0; i < currency.length; i++) {
            let h2CurrencyChildrenCode = document.createTextNode(
              "code: " + currency[i].code
            );
            let h2CurrencyChildrenName = document.createTextNode(
              currency[i].name
            );
            let h2CurrencyChildrenSymbol = document.createTextNode(
              "symbol: " + currency[i].symbol
            );
            let currencySpan = document.createElement("span");
            currencySpan.className = "currency";
            currencySpan.appendChild(h2CurrencyChildrenName);
            currencySpan.append(semicolon);
            currencySpan.appendChild(h2CurrencyChildrenCode);
            //Check if symbol exist
            if (h2CurrencyChildrenSymbol != null) {
              currencySpan.append(semicolon);
              currencySpan.appendChild(h2CurrencyChildrenSymbol);
            }
            if (currency.length > 1) {
              h2Currency.appendChild(br);
              //! need to indent the second line in case of many currencies
            }
            h2Currency.appendChild(currencySpan);
          }
          modalRight.appendChild(h2Currency);
          //Get the languages
          let h2Language = document.createElement("h2");
          let h2LanguageText = document.createTextNode("Language: ");
          h2Language.appendChild(h2LanguageText);
          for (let i = 0; i < language.length; i++) {
            let h2LanguageChildren = document.createTextNode(language[i].name);
            let languageSpan = document.createElement("span");
            languageSpan.className = "language";
            // Check if there is one or more than one language and render them accordingly with comma and period
            if (language.indexOf(language[i]) == language.length - 1) {
              languageSpan.appendChild(h2LanguageChildren);
            } else {
              languageSpan.appendChild(h2LanguageChildren);
              languageSpan.append(comma);
            }

            h2Language.appendChild(languageSpan);
          }
          modalRight.appendChild(h2Language);

          //  Get the time zone
          let h2Time = document.createElement("h2");
          let h2TimeText = document.createTextNode("Timezone: ");
          h2Time.appendChild(h2TimeText);
          for (let i = 0; i < timeZone.length; i++) {
            let h2TimeChildren = document.createTextNode(timeZone[i]);
            let timeSpan = document.createElement("span");
            timeSpan.className = "time-zone";
            // Check if there is one or more than one timezone and render them accordingly with comma and period
            if (timeZone.indexOf(timeZone[i]) == timeZone.length - 1) {
              timeSpan.appendChild(h2TimeChildren);
            } else {
              timeSpan.appendChild(h2TimeChildren);
              timeSpan.append(comma);
            }

            h2Time.appendChild(timeSpan);
          }
          modalRight.appendChild(h2Time);
        }
        //  <h2>Calling Code:<span class="calling-code">${callingCode}</span></h2>
        //                 <h2>Currency:<span class="ccurrency">${currency}</span></h2>
        //                 <h2>Languages:<span class="language">${language}</span></h2>
        //                 <h2>Time Zone:<span class="time-zone">${timeZone}</span></h2>
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

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
                            <a href="#">View >>></a>
                        </div>
                    </div>
                </div>
            `
            countries.appendChild(singleCountry);
            let aaa = singleCountry.querySelectorAll("div");
            aaa[1].style.backgroundImage = `linear-gradient(rgba(5,5,5,0.5),rgba(5,5,5,0.5)),url(${countryFlag})`;

            console.log(aaa[1]);
        });
    })
    .catch(err => console.log(err));
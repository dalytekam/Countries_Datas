let close = document.querySelector(".close");

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
            `
            countries.appendChild(singleCountry);

            let bg = singleCountry.querySelectorAll("div");
            bg[1].style.backgroundImage = `linear-gradient(rgba(5,5,5,0.5),rgba(5,5,5,0.5)),url(${countryFlag})`;
            bg[2].childNodes[5].addEventListener("click", showModal);

            //implement the backDrop

            //view.forEach.addEventListener("click", showModal);
            //let view = document.querySelector(".view");

            console.log(bg[2].childNodes[5]);



        });
    })
    .catch(err => console.log(err));



function showModal(e) {

    e.preventDefault();
    backDrop.style.display = "block";
    modal.style.display = "block";

}
close.addEventListener("click", closeModal);

function closeModal() {
    backDrop.style.display = "none";
    modal.style.display = "none";
}
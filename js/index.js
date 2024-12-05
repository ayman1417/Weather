let temp = document.querySelector(".content");
let search_input = document.querySelector("#search-input");
let city;


async function search() {
  let res_search = await fetch(
    "https://api.weatherapi.com/v1/search.json?key=5875f08c9cad44d28b9174534240312&q=lond"
  );
  res_search = await res_search.json();
  city = search_input.value;
  for (let i = 0; i < res_search.length; i++) {
    if (res_search[i].name.toUpperCase() == city.toUpperCase()) {
      city = res_search[i].name;
      console.log("founded");
      break;
    }
  }

  getTemperature();
}

async function getTemperature() {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5875f08c9cad44d28b9174534240312&q=${city}&days=3`
  );

  let cityDetails = await res.json();
  console.log(cityDetails.location.name);
  console.log(cityDetails.current.temp_c);

  console.log(cityDetails);
  console.log(cityDetails.forecast.forecastday[1].date);
  console.log("the max temp is ",cityDetails.forecast.forecastday[1].day.maxtemp_c);
  console.log("the min temp is ",cityDetails.forecast.forecastday[1].day.mintemp_c);

  console.log(cityDetails.forecast.forecastday[2].date);
  console.log("the max temp is ",cityDetails.forecast.forecastday[2].day.maxtemp_c);
  console.log("the min temp is ",cityDetails.forecast.forecastday[2].day.mintemp_c);
  show(cityDetails);
}


function show(cityDetails){

    function getDayName(dateString) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date = new Date(dateString);
        return days[date.getDay()];
    }
    let day=getDayName();
    temp.innerHTML=`
                        <div class="row text-white">
              <div class="col-md-4 g-5 bg-sec p-0 rounded-3">
                <div class="">
                  <div
                    style="background-color: #2d303d"
                    class="d-flex justify-content-between w-100 px-2 pt-2"
                  >
                    <p>${getDayName(cityDetails.forecast.forecastday[0].date)}</p>
                    <p>${cityDetails.forecast.forecastday[0].date}</p>
                  </div>
                  <div class="px-3">
                    <h5 class="mt-4">${cityDetails.location.name}</h5>
                    <h1 class="f-90 d-none d-lg-block">${cityDetails.current.temp_c}<sup>o</sup>C</h1>
                    <h1 class="f-50 d-lg-none d-block">${cityDetails.current.temp_c}<sup>o</sup>C</h1>
                    <div class="">
                    <img src="https:${cityDetails.current.condition.icon}" alt="Weather Icon">
                      <p class="text-info mt-3">${cityDetails.current.condition.text}</p>
                    </div>
                  </div>
                  <div class="d-flex gap-3 my-3 text-white-50 px-3">
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-umbrella fs-4"></i>
                      <p class="m-0 ms-2">20%</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-wind fs-4"></i>
                      <p class="m-0 ms-2">18km/h</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="fa-regular fa-compass fs-4"></i>
                      <p class="m-0 ms-2">East</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 g-5 bg-thir p-0 rounded-3">
                <div class="text-center">
                  <div
                    style="background-color: #222530"
                    class="d-flex justify-content-center w-100 pt-2"
                  >
                    <p>${getDayName(cityDetails.forecast.forecastday[1].date)}</p>
                  </div>
                  <div class="mt-4">
                    <img src="https:${cityDetails.forecast.forecastday[1].day.condition.icon}" alt="Weather Icon">
                  <h2>${cityDetails.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h2>
                  <h6>${cityDetails.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</h6>
                    <p class="text-info mt-4">${cityDetails.forecast.forecastday[1].day.condition.text}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 g-5 bg-sec p-0 rounded-3">
                <div class="text-center">
                  <div
                    style="background-color: #2d303d"
                    class="d-flex justify-content-center w-100 pt-2"
                  >
                    <p>${getDayName(cityDetails.forecast.forecastday[2].date)}</p>
                  </div>
                  <div class="mt-4">
                    <img src="https:${cityDetails.forecast.forecastday[2].day.condition.icon}" alt="Weather Icon">
                  <h2>${cityDetails.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h2>
                  <h6>${cityDetails.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</h6>
                    <p class="text-info mt-4">${cityDetails.forecast.forecastday[2].day.condition.text}</p>
                  </div>
                </div>
              </div>
            </div>
    
    `

}



async function mylocation(){
        
            let getPosition = () =>
                new Promise((resolve, reject) =>
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                );
    
                let position = await getPosition();
                let { latitude, longitude } = position.coords;
    
            let response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=5875f08c9cad44d28b9174534240312&q=${latitude},${longitude}&days=3`
            );
            let cityDetails = await response.json();
    
            // Set the city and display the weather details
            city = cityDetails.location.name;
            show(cityDetails);

    
}
mylocation();

search_input.addEventListener("keyup", (e) => {
    search();

});

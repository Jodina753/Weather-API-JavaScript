//dynamic date
const header = document.getElementById("header");
header.innerText = new Date().toDateString(); //uses the clock on your computer, this can configure this

//***LOCATION***
const displayCity = document.getElementById("city");
const displayTemp = document.getElementById("temp");
const displayIcon = document.getElementById("weatherIcon");
const displayDescription = document.getElementById("description");
const displayRange = document.getElementById("range");
const displayFeel = document.getElementById("feels-like");

//***ROUTE 1*** - Automatic geolocation

//STEP 1 - Access the button which will get the
const geoBtn = document.getElementById("location-btn");

//STEP 2 - Add an event listener to the button, which will find the users location when the button is clicked:
geoBtn.addEventListener("click", function () {
  //2a - this code gets the user location using the getCurrentPosition method
  navigator.geolocation.getCurrentPosition(function (displayPosition) {
    //store the users lon and lat coordinates into variables
    let lat = displayPosition.coords.latitude;
    let lon = displayPosition.coords.longitude;
    console.log(lat);
    console.log(lon);

    //use those variables to feed into the url
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=787369a90d8ae0741864fb490cf94350`; //this particular API call uses the long and lat within the url

    let weatherData = localStorage.getItem("weather_data");
    if (weatherData) {
      let response = JSON.parse(weatherData); //converts back to an object
      displayCity.innerHTML = response.data.name;
      displayTemp.innerHTML = response.data.main.temp + " &#8451;";
      displayIcon.img.src = "./white_clouds.jpg"; //how do i insert an image
      displayDescription.innerHTML = response.data.weather[0].description;
      displayRange.innerHTML =
        "H:" +
        response.data.main.temp_max +
        " " +
        "L:" +
        response.data.main.temp_min;
      displayFeel.innerHTML =
        "Feels Like: " + response.data.main.feels_like + " &#8451;";
    } else {
      //use Axios call the weather API
      axios.get(url).then(function (response) {
        console.log(response);

        //converting response from the API so can locally store
        localStorage.setItem("weather_data", JSON.stringify(response));

        //inserts data retrieved back into the DOM
        displayCity.innerHTML = response.data.name;
        displayTemp.innerHTML = response.data.main.temp + " &#8451;";
        displayIcon.img.src = "./white_clouds.jpg"; //how do i insert an image
        displayDescription.innerHTML = response.data.weather[0].description;
        displayRange.innerHTML =
          "H:" +
          response.data.main.temp_max +
          " " +
          "L:" +
          response.data.main.temp_min;
        displayFeel.innerHTML =
          "Feels Like: " + response.data.main.feels_like + " &#8451;";
      });
    }
  });
});

//***ROUTE 2*** - User inputs their location to search bar

// //STEP 1 - Access the 'search' button via the DOM
const userInputLocation = document.getElementById("userLocationBtn");

//STEP 2 - Add an event listener for when the user clicks the 'search' button and executes the following code - which takes the users input of the city and add it to the url which then calls the API
userInputLocation.addEventListener("click", function () {
  //Step 2a - access the users input and store in a variable
  let userCity = document.getElementById("userInput").value;

  //STEP 2b - Store the url that will be accessed later by the function below, using a template literal
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=9245cd47bf011ca7512ccd892236e833`; //this particular API call uses the city location within the url

  //STEP 3 - using axios get the data from the api url
  axios.get(url).then(function (response) {
    console.log(response);
    displayCity.innerHTML = response.data.name;
    displayTemp.innerHTML = response.data.main.temp + " &#8451;";
    // displayDescription.innerHTML = response.data.weather;
    displayRange.innerHTML =
      "H:" +
      response.data.main.temp_max +
      " " +
      "L:" +
      response.data.main.temp_min;
    displayFeel.innerHTML =
      "Feels Like: " + response.data.main.feels_like + " &#8451;";
  });
});

//To-Do List

//4 - Think about replacing the weather info with images of wearher e.g. sunshine, clouds, rain etc

//add validation html/css which checks taht the users input is text/letters and sisplays a box if its not

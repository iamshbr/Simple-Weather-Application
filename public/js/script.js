const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const weatherIcon = document.querySelector(".weather-icon");

const searchWeather = async function () {
  const cityName = searchInput.value;
  hideErrors();
  if (cityName.trim()) {
    const data = await getWeatherData(cityName);
    console.log(data);
    if (data["cod"] == 400 || data["cod"] == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const {
        name,
        main: { temp, humidity },
        wind: { speed },
        weather: [weatherImage],
      } = data;
      displayWeather({ name, temp, humidity, speed, weatherImage });
    }
  } else {
    document.querySelector(".empty-error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
};

const hideErrors = function () {
  document.querySelector(".empty-error").style.display = "none";
  document.querySelector(".error").style.display = "none";
};

const displayWeather = function ({ name, temp, humidity, speed, weatherImage }) {
  document.querySelector(".city").innerHTML = name;
  document.querySelector(".temp").innerHTML = Math.round(temp) + "°C";
  document.querySelector(".humidity").innerHTML = humidity + "%";
  document.querySelector(".wind").innerHTML = speed + " km/h";
  document.querySelector(".weather").style.display = "block";
  displayWeatherImage(weatherImage);
};

const displayWeatherImage = function (weatherImage) {
  if (weatherImage.main == "Clouds") {
    weatherIcon.src = "https://i.postimg.cc/W1KyTM5M/clouds.png";
  } else if (weatherImage.main == "Clear") {
    weatherIcon.src = "https://i.postimg.cc/6QRxS9dL/clear.png";
  } else if (weatherImage == "Rain") {
    weatherIcon.src = "https://i.postimg.cc/ZnFndXXc/rain.png";
  } else if (weatherImage.main == "Drizzle") {
    weatherIcon.src = "https://i.postimg.cc/zv5mgzLP/drizzle.png";
  } else if (weatherImage == "Mist") {
    weatherIcon.src = "https://i.postimg.cc/Qx2QkFNt/mist.png";
  }
};

const getWeatherData = async function (cityName) {
  const formData = new URLSearchParams();
  formData.append("city", cityName);
  const response = await fetch("/", {
    method: "POST",
    body: formData,
  });

  let data = response.status === 200 ? await response.json() : { status: "error" };
  return data;
};

searchBtn.addEventListener("click", searchWeather);

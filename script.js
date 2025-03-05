const apiKey = "0c40ab524de1f5de96274071a510e27e"; 
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

                if (response.status === 401) {
                    alert("Invalid API Key. Please check your API key.");
                    return;
                }

                if (response.status === 404) {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                } else {
                    const data = await response.json();

                    if (data.main && data.weather) {
                        document.querySelector(".city").innerHTML = data.name;
                        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
                        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                        if (data.weather[0].main === "Clouds") {
                            weatherIcon.src = "img/clouds.png";
                        } 
                        else if (data.weather[0].main === "Clear") {
                            weatherIcon.src = "img/clear.png";
                        } 
                        else if (data.weather[0].main === "Rain") {
                            weatherIcon.src = "img/rain.png";
                        } 
                        else if (data.weather[0].main === "Drizzle") {
                            weatherIcon.src = "img/drizzle.png";
                        } 
                        else if (data.weather[0].main === "Mist") {
                            weatherIcon.src = "img/mist.png";
                        }

                        document.querySelector(".weather").style.display = "block";
                        document.querySelector(".error").style.display = "none";
                    }
                }
            } 
            catch (error) {
                console.log("Error:", error);
                alert("An error occurred while fetching weather data. Please try again later.");
            }
        }

        searchBtn.addEventListener("click", () => {
            const city = searchBox.value;
            if (city) {
                checkWeather(city);
            }
        });

        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
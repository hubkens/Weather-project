let weather = {
    apiKey: '7a6dc7c60556b4eeb40073b6ab1c0f58',
    geocoding : function(searchInput : string) {
        fetch(
            'http:\\api.positionstack.com/v1/forward?access_key='
            + this.apiKey + '&query=' + searchInput + '&fields=results.latitude,results.longitude,results.locality')
            .then((response) => response.json())
            .then((data) => this.retrieveForecastLink(data.data[0]))
            .catch((error: any) => console.error('Error: Invalid Search Input,', error));
    },
    localityHolder : "",
    retrieveForecastLink: function(geofeatures : any) {
        const {latitude} = geofeatures;
        const {longitude} = geofeatures;
        const {locality} = geofeatures;
        this.localityHolder = locality;
        fetch(
            'https://api.weather.gov/points/'
            + parseFloat(latitude) + "," + parseFloat(longitude))
            .then((response) => response.json())
            .then((data) => this.retrieveWeather(data.properties.forecast))
            .catch((error: any) => console.error('Error: Invalid Search Input,', error));
    },
    
    retrieveWeather: function(link: string){
        fetch(link)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data.properties.periods[0]))
        .catch((error: any) => console.error('Error: Invalid Search Input,', error));
    },

    displayWeather: function(data: any){
        const { temperature } = data;
        const { windSpeed } = data;
        const { windDirection } = data;
        const { icon } = data;
        const { shortForecast } = data;
        console.log("Temp:" + temperature, "Wind:" + windSpeed + windDirection, "Icon:" + icon,"Description: " + shortForecast);
        
        const loc = document.querySelector(".location") as HTMLElement | null;

        const ic = document.querySelector(".icon") as HTMLImageElement | null;
        
        const win = document.querySelector(".wind")as HTMLElement | null;

        const des = document.querySelector(".description")as HTMLElement | null;

        const tem = document.querySelector(".temp")as HTMLElement | null;

        loc!.innerText = "Weather in " + this.localityHolder;
        ic!.src = icon;
        win!.innerText = windSpeed + " " + windDirection;
        des!.innerText = shortForecast;
        tem!.innerText = temperature + "°F";
        
    },

    search: function () {
        const input = document.querySelector(".search-bar") as HTMLInputElement;
        this.geocoding(input.value);
    },

}

weather.geocoding('Baltimore');
const searchBar = document.querySelector(".search-bar") as HTMLElement
searchBar.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
const search = document.querySelector("#search-button") as HTMLElement;
search.addEventListener("click", function () {weather.search();})


        



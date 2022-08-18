let features = JSON;
 function geocoding(){
    const apiKey = "7a6dc7c60556b4eeb40073b6ab1c0f58";
    const place = document.querySelector('#text');
    fetch(
        "http://api.positionstack.com/v1/forward?access_key=" 
        + apiKey + "&query=" + place
    )
        .then((response) => response.json())
        .then((data) => features = data).then(() => console.log())
}
function retrieveForcast(){ 
    //const lat = features['latitude']
    return fetch("https://api.weather.gov/gridpoints/" + lat +"/" + long + "/forecast");
}

function displayForecast(){

}
let computeButton;
window.onload = () => {
    computeButton = document.getElementById('compute-button');
    if (computeButton != null){
        computeButton.addEventListener("click", () => displayForecast());
    }  
};
    
    


const ipAddress = document.getElementById("ipAddress");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const form = document.forms.ip;
var map = L.map('map');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    ipData(e.target[0].value);
    e.target[0].value = "";
})

const ipData = (address = "") => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qoJBZrBxMVeTgrJkk7P3vZIbtmb0U&domain=${address}`)
    .then(res => res.json())
    .then(data => {
        let lat = data.location.lat;
        let lng = data.location.lng;
        showIpData(data);
        generateMap(lat,lng);
    })
}

ipData();

const showIpData = (data) => {
    ipAddress.innerHTML = data.ip;
    ipLocation.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timezone.innerHTML = `UTC ${data.location.timezone}`;
    isp.innerHTML = data.isp;
}

const generateMap = (lat, lng) => {
    let locationIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [lat, lng], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });
    map.setView([lat, lng], 17);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(map);

    L.marker([lat, lng], {icon: locationIcon}).addTo(map);
}
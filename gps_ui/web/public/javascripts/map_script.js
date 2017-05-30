$(document).ready(function () {
    var lat = "37.5341824";
    var lng = "127.0897395";
    initMap(lat, lng);

});

function initMap(_lat, _lng) {
    var userPosition = {
        lat: parseFloat(_lat),
        lng: parseFloat(_lng)
    };
    //맵 초기화
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: userPosition
    });
    //마커 설정
    marker = new google.maps.Marker({
        position: userPosition,
        map: map,
    });
}


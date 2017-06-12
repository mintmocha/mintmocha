$(document).ready(function () {
    var lat = $('#lat_0').text();
    var lng = $('#lng_0').text();

    //맵 초기화
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat:parseFloat(lat),lng:parseFloat(lng)}
    });
    //마커 설정
    /*marker = new google.maps.Marker({
        position: {lat:parseFloat(lat),lng:parseFload(lng)},
        map: map,
    });*/

    var tableRowCount = $('#tbody tr').length;
    var markers=[];
    //console.log('table rows : '+tableRowCount);

    for(var i=0; i<tableRowCount;i++){
        var _lat = $('#lat_'+i).text();
        var _lng = $('#lng_'+i).text();
        var label = tableRowCount -i;
        markers.push({lat:parseFloat(_lat), lng:parseFloat(_lng)});
        //console.log('['+i+'] '+_lat +', '+_lng);

        /*note: 일반 marker*/
        //*
        var marker = new google.maps.Marker({
            position:{lat:parseFloat(_lat), lng:parseFloat(_lng)},
            label:label.toString(),
            map:map
        })
        //*/
    }
    //console.log(markers.reverse());
    var pathCoordinates = markers.reverse();
    var path = new google.maps.Polyline({
        path: pathCoordinates,
        icons: [{
            //repeat: '70px',
            icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
            offset: '100%'
        }],
        geodesic:true,
        strokeColor:'#FF0000',
        strokeOpacity:1.0,
        strokeWeight:2,

    });
    path.setMap(map);
    /*console.log('map init');
    console.log('lat : '+lat);
    console.log('lng : '+lng);*/

    //initMap(lat, lng);

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


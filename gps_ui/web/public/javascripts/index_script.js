//새로고침 버튼 클릭시.
function refreshMap() {

    /*todo: 사용자 위치 읽어오는 api 호출*/
    /*todo: 새 사용자 위치 지도에 marker 표시*/
    /*fixme: API 구현후 읽어온 값으로 수정해야 함.*/

    /*todo : 다시 활성화*/
    //var lat = $('#lat_val').text();
    //var lng = $('#lng_val').text();
    //

    //37.513981, 126.903218 (영등포 타임스퀘어)
    var lat = 37.513981;
    var lng = 126.903218;
    //사용자 위치 표시
    geocodeLatLng(lat, lng);

    //새로고침(업데이트) 시각 표시
    $('#mapUpdatedTime').empty();
    $('#mapUpdatedTime').append("Last Refreshed : " + getTimeStamp());

    //마커 이동
    modifyMarker(lat, lng);
}

function getTimeStamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

    return s;
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

// 역지오코딩(api 호출)
function geocodeLatLng(_lat, _lng) {
    var _latlng = _lat + "," + _lng;
    console.log("lat lng : " + _latlng);
    $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        data: {
            'latlng': _latlng,
            'key': 'AIzaSyDI1Y398iX5bI_2lMFJ_d6WEex0vpwDNgI'
        },
        success: function (result) {
            var usrlocation = result.results[1].formatted_address;
            $('#userLocationDesc').empty();
            $('#userLocationDesc').append("Location : " + usrlocation);

        },
        error: function (e) {
            _usrlocation = e.responseText;
            $('#userLocationDesc').empty();
            $('#userLocationDesc').append("Location : " + usrlocation);

        }
    });
}

function reloadLocation(_location) {
    var str = "Location : " + _location;

}

function reloadUpdateTime(_time) {

}

function initMap(_lat, _lng) {
    console.log('initialize map ');
    var userPosition = {
        /*
        lat: 37.5341824,
        lng: 127.0897395
        */
        lat: parseFloat(_lat),
        lng: parseFloat(_lng)

    };

    //맵 초기화
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: userPosition
    });

    //마커 설정
        marker = new google.maps.Marker({
        position: userPosition,
        map: map
    });
}

/*note:marker 삭제 : 미사용*/
function removeMarker(){
    marker.setMap(null);
    marker=null;
}

//마커 위치 수정 및 지도 이동
function modifyMarker(_newlat,_newlng){
    map.panTo(new google.maps.LatLng(_newlat, _newlng));
    marker.setPosition(new google.maps.LatLng(_newlat, _newlng));
}

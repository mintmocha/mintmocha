$(document).ready(function () {
    //var lat=37.5341824, lng=127.0897395;
    var lat = $('#lat_val').text();
    var lng = $('#lng_val').text();

    //지도 초기화
    initMap(lat, lng);

    //GPS TO ADDRESS
    geocodeLatLng(lat, lng);

    //*
    $.jsonRPC.setup({
        endPoint: 'http://localhost:3001/api',
        namespace: ''
    });
    //*/

});

//맵 새로고침 성공 콜백함수
function refreshSuccess(data) {
    if (Array.isArray(data.result)) {
        if (data.result.length != 1) {
            console.log('데이터 사이즈가 맞지 않습니다.(result size : ' + data.result.length + ')');
        } else {
            var lat = data.result[0].lat;
            var lng = data.result[0].lng;
            var alt = data.result[0].alt;
            var status_device = data.result[0].status_device;
            var status_gps = data.result[0].st
            var gps_mode = data.result[0].gps_mode;
            var timestamp = data.result[0].timestamp;

            console.log('===== [Refresh API 호출 결과] =====');
            console.log('lat :' + lat);
            console.log('lng :' + lng);
            console.log('alt :' + alt);
            console.log('status_device :' + status_device);
            console.log('status_gps :' + status_gps);
            console.log('gps_mode :' + gps_mode);
            console.log('timestamp :' + timestamp);
            console.log('=================================');

            //테이블 값 변경
            $('#dStatus_val').text(status_device);
            $('#gStatus_val').text(status_gps);
            $('#gMod_val').text(gps_mode);
            $('#lat_val').text(lat);
            $('#lng_val').text(lng);
            $('#alt_val').text(alt);

            //업데이트 시간 변경
            $('#mapUpdatedTime').empty();
            $('#mapUpdatedTime').append("Last Updated : " + getTimeStamp(timestamp));

            //사용자 위치 표시
            geocodeLatLng(lat, lng);

            //마커 이동
            modifyMarker(lat, lng);

        }
    } else {
        console.log('배열 아님')
    };
}

//맵 새로고침 버튼 클릭시 호출
function refreshMap() {
    $.jsonRPC.request('refreshmap', {
        id: 1001,
        params: ["id:test"],
        success: function (data) {
            console.log('정상 응답');
            refreshSuccess(data);
        },
        error: function (data) {
            console.log('오류 응답');
            console.dir(data);
            console.log(data.error.message);
        }
    });

}

function getTimeStamp(_time) {
    var d = new Date(_time);
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
            var usrlocation = '주소를 확인할 수 없습니다.';
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
function removeMarker() {
    marker.setMap(null);
    marker = null;
}

//마커 위치 수정 및 지도 이동
function modifyMarker(_newlat, _newlng) {
    console.log('[modify marker]');
    map.panTo(new google.maps.LatLng(_newlat, _newlng));
    marker.setPosition(new google.maps.LatLng(_newlat, _newlng));
}

//새로고침 버튼 클릭시.
function refreshMap() {
    console.log(getTimeStamp());
    $('#userLocationDesc').empty();
    $('#userLocationDesc').append("Location : " + getTimeStamp());

    $('#mapUpdatedTime').empty();
    $('#mapUpdatedTime').append("Last Refreshed : " + getTimeStamp());

    var lat = $('#lat_val').text();
    var lng = $('#lng_val').text();
    //alert('좌표 : '+lat+', '+lng);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        }
    });
    var geocoder = new google.maps.Geocoder;
    geocodeLatLng(geocoder, map, lat, lng);
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

// 역 지오코딩
function geocodeLatLng(geocoder, map, _lat, _lng) {
    //var input = document.getElementById('latlng').value;
    //var latlngStr = input.split(',', 2);
    var latlng = {
        lat: parseFloat(_lat),
        lng: parseFloat(_lng)
    };
    console.log(latlng);
    console.log('latlng :'+ latlng);
    geocoder.geocode({
        'location': latlng
    }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                console.log(results[1].formatted_address);
                //infowindow.setContent(results[1].formatted_address);
                //infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

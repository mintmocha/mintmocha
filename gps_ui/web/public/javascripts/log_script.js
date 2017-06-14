$(document).ready(function () {
    $("#table").DataTable();
    //setTimeout("location.reload()",10000)
    setTimeout("javascript:refresh()", 5000)

    var log_sw = localStorage.getItem('tracker_log');
    //refresh  관련 설정
    if (log_sw == undefined || log_sw == null) {
        localStorage.setItem('tracker_log', 'on');
    } else if (log_sw == 'off') {
        $('#refreshSwitch').bootstrapToggle('off');
    }

    //toggle switch 설정
    $('#refreshSwitch').bootstrapToggle();
    $('#refreshSwitch').change(function () {
        if ($(this).prop('checked')) {
            localStorage.setItem('tracker_log', 'on');
        } else {
            localStorage.setItem('tracker_log', 'off');
        }
        refresh();
    })

});

function showDetail(idx) {
    console.log("click");
    var title = $('#' + idx + '_title').text();
    var msg = $('#' + idx + '_msg').text();
    $('#modal_LogTitle').text(title);
    $('#modal_LogMsg').text(msg);

}

function refresh() {
    console.log("refresh");

    var refreshFlag = localStorage.getItem('tracker_log');
    console.log('flag : ' + refreshFlag);
    if (refreshFlag == 'on') {
        console.log('switch on');
        location.reload();
    } else if (refreshFlag = 'off') {
        console.log('switch off');
    } else {
        console.log('undefined switch status');
    }

}

$(document).ready(function(){
    $("#table").DataTable();
});

function showDetail(idx){
    console.log("click");
    var title = $('#'+idx+'_title').text();
    var msg = $('#'+idx+'_msg').text();
    $('#modal_LogTitle').text(title);
    $('#modal_LogMsg').text(msg);

}

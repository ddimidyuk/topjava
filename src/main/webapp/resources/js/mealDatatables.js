var ajaxUrl = "ajax/meal/";
var datatableApi;

// $(document).ready(function () {
$(function () {
    datatableApi = $("#datatable").DataTable({
        "paging": false,
        "info": true,
        "columns": [
            {
                "data": "dateTime"
            },
            {
                "data": "description"
            },
            {
                "data": "calories"
            },
            {
                "defaultContent": "Edit",
                "orderable": false
            },
            {
                "defaultContent": "Delete",
                "orderable": false
            }
        ],
        "order": [
            [
                0,
                "asc"
            ]
        ]
    });
    makeEditable();
});

function updateTableWithFilter() {
    $.get(ajaxUrl, {startDate: $("#startDate").val(), endDate: $("#endDate").val(), startTime: $("#startTime").val(), endTime: $("#endTime").val()}, function (data) {
        datatableApi.clear().rows.add(data).draw();
    });
}
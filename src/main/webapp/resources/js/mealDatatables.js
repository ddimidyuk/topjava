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

$(function () {

    $("#dateTime").datetimepicker();

    $("#startDate").datetimepicker({
        timepicker: false,
        format: 'Y-m-d'
    });

    $("#endDate").datetimepicker({
        timepicker: false,
        format: 'Y-m-d'
    });

    $("#startTime").datetimepicker({
        datepicker: false,
        step: 15,
        format: 'H:i'
    });

    $("#endTime").datetimepicker({
        datepicker: false,
        step: 15,
        format: 'H:i'
    });
});

function updateTableWithFilter() {
    $.get(ajaxUrl, {startDate: $("#startDate").val(), endDate: $("#endDate").val(), startTime: $("#startTime").val(), endTime: $("#endTime").val()}, function (data) {
        datatableApi.clear().rows.add(data).draw();
    });
}

function clearFilter() {
    $("#startDate").val('');
    $("#endDate").val('');
    $("#startTime").val('');
    $("#endTime").val('');
    updateTableWithFilter();
}
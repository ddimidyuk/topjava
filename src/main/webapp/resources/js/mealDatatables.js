const ajaxUrl = "ajax/profile/meals/";
let datatableApi;

function updateTable() {
    $.ajax({
        type: "GET",
        url: ajaxUrl + "filter",
        data: $("#filter").serialize()
    }).done(updateTableByData);
}

function clearFilter() {
    $("#filter")[0].reset();
    $.get(ajaxUrl, updateTableByData);
}

$(function () {
    datatableApi = $("#datatable").DataTable({
        "ajax": {
            "url": ajaxUrl,
            "dataSrc": ""
        },
        "paging": false,
        "info": true,
        "columns": [
            {
                "data": "dateTime",
                "render": function (data, type, row) {
                    let date = new Date(data);
                    return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
                        ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                }
            },
            {
                "data": "description"
            },
            {
                "data": "calories"
            },
            {
                "orderable": false,
                "defaultContent": "",
                "render": renderEditBtn
            },
            {
                "orderable": false,
                "defaultContent": "",
                "render": renderDeleteBtn
            }
        ],
        "order": [
            [
                0,
                "desc"
            ]
        ],
        "createdRow": function (row, data, dataIndex) {
            $(row).attr("data-mealExceed", data.exceed);
        },
        "initComplete": makeEditable
    });
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

function formatDateTimeAndSave() {
    let dateTime = $("#dateTime");
    let date = new Date(dateTime.val());
    dateTime.val(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString());
    save();
}

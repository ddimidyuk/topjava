var ajaxUrl = "ajax/admin/users/";
var datatableApi;

// $(document).ready(function () {
$(function () {
    datatableApi = $("#datatable").DataTable({
        "paging": false,
        "info": true,
        "columns": [
            {
                "data": "name"
            },
            {
                "data": "email"
            },
            {
                "data": "roles"
            },
            {
                "data": "enabled"
            },
            {
                "data": "registered"
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

function changeUserStatus(id) {
    var isActive = $("#" + id).find('input:checkbox:first').attr('checked') !== 'checked';
    $.ajax({
        type: "POST",
        url: ajaxUrl + id + "/status?isActive=" + isActive,
        success: function () {
            updateTable();
            successNoty("Status changed");
        }
    });
};
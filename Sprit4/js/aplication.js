var editingItem = null;
var page = 1;
var totalPages = 1;

var drawTable = function (store) {
    store.getAll(page).then(function (data) {
        $('table tbody').empty();
        $('#totalpage').text(data.totalPages);
        totalPages = data.totalPages;

        $.each(data.list, function () {
            var tr = tmpl("tpl", this);
            $('table tbody').append(tr);
        });
        attachTableEvents();
    })
};

var getFormData = function () {
    return {
        name: $('#name').val(),
        visited: $('#button').is(":checked") ? 1 : 0,
        stars: parseInt($('#starsuri').val())
    };
};

var onSubmit = function () {
    if (editingItem) {
        store.update(editingItem.id, getFormData()).then(function () {
            $('#form').removeClass("to_edit");
            drawTable(store);
        });
    } else {
        store.add(getFormData()).then(function () {
            drawTable(store);
        });
    }
    resetForm();

    return false;
};

var attachTableEvents = function () {
    $('table tbody').find('a.edit-btn').click(editClicked);
    $('table tbody').find('a.remove-btn').click(removeClicked);
};

var removeClicked = function () {
    var id = $(this).closest('tr').data('id');

    store.delete(id).then(function () {
        drawTable(store);
    });

    return false;
};

var editClicked = function () {
    $('#form').addClass("to_edit");
    var id = $(this).closest('tr').data('id');
    console.log(id);
    store.get(id).then(function (data) {
            console.log(id);
            editingItem = data;
            console.log(data);
            $('input[name="name"]').val(data.name);
            $('input[name="visited"]').prop("checked", data.visited);
            $('input[name="stele"]').val(data.stars).change();
        },
        function () {
            alert('Something went wrong');
        });

    return false;
};

var cancelClicked = function () {
    $('#form').removeClass("to_edit");
    resetForm();

    return false;
};

var resetForm = function () {
    $('input[name="name"]').val('');
    $('input[name="stele"]').val('').change();
    $('input[name="visited"]').prop('checked', false);
};

$(document).ready(function () {
    $('#form').submit(onSubmit);
    $('#form').find('a.cancel').click(cancelClicked);
    $('[name="stele"]').stars();

    $('#increment').click(function () {
        if (page < totalPages) {
            page++;
            $('#currentpage').text(page);
            drawTable(store);
        }
    });

    $('#decrement').click(function () {
        if (page > 1) {
            page--;
            $('#currentpage').text(page)
            drawTable(store);
        }
    });

    drawTable(store);
});

//incarcare dinamica de imagini in js
//documentatie gyphy

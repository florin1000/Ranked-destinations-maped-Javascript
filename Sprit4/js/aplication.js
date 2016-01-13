var editingItem = null;
var page = 1;
var totalPages = 1;
var tableBody = $('table tbody');
var theForm = $('#form');

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
    tableBody.find('a.edit-btn').click(editClicked);
    tableBody.find('a.remove-btn').click(removeClicked);
};

//var accesGipfy = function () {
tableBody.on('click', 'tr', function () {
    var cityName = $($(this).find('td')[0]).text();
    console.log(cityName);
    return new Promise(function (resolve, reject) {
        $.ajax("http://api.giphy.com/v1/gifs/search?q=" + cityName + "&api_key=dc6zaTOxFJmzC", {
            type: 'GET'
        }).done(function (data) {
            //console.log(data);
            //console.log(data.data[0].images.downsized.url);
            //console.log(data.data[0].bitly_gif_url);
            $('#gify').removeClass('gyfremove');
            $('#gify').addClass('gyfdisplay');
            $('#closegyf').removeClass('gyfremove');
            $('#closegyf').addClass('addgyf');
            $('#gifyimg').attr("src", data.data[0].images.downsized.url);
            resolve(data);
        }).fail(function () {
            alert('Giphy is not working proper')
        });
    });
});
//};

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
    //console.log(id);
    store.get(id).then(function (data) {
        editingItem = data;
        $('input[name="name"]').val(data.name);
        $('input[name="visited"]').prop("checked", data.visited);
        $('input[name="stele"]').val(data.stars).change();
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
    theForm.submit(onSubmit);
    theForm.find('a.cancel').click(cancelClicked);
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
            $('#currentpage').text(page);
            drawTable(store);
        }
    });
    drawTable(store);
});



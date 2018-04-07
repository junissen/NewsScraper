$(function() {


    $('.deleteSavedArticleButton').on("click", function(event) {
        event.preventDefault();

        $('.articleDeleteBody').empty();

        let articleId = $(this).data("id");

        $.ajax("/api/delete/article/" + articleId, {
            type: "POST"
        }).then(function() {
            let newText = $('<div>');
            newText.text("Article deleted from your Saved Articles");
            $('.articleDeleteBody').append(newText);
            $('#articleDeleteModal').modal('show');
        })

    });

    $('#deleteArticleButton').on('click', function(event) {

        event.preventDefault();

        $.ajax("/saved", {
            type: "GET"
        }).then(function() {
            location.reload()
            console.log("saved site updated")
        })

    });
    
    $('.addNoteButton').on("click", function(event) {

        event.preventDefault();

        let articleId = $(this).data("id");
        $('.noteModalBody').empty();

        $.ajax("/api/notes/" + articleId, {
            type: "GET"
        }).then(function(result) {

            $('.noteModalBody').append("<h2>" + result.headline + "</h2>");
            $('.noteModalBody').append("<ul id='noteList'>")

            let newForm = $('<form>');
            
            let newFormGroup1 = $('<div>');
            newFormGroup1.addClass("form-group");
            let newFormGroupLabel1 = $('<label for="titleinput">');
            newFormGroupLabel1.text("New Note Title");
            newFormGroup1.append(newFormGroupLabel1);
            newFormGroup1.append("<input id='titleinput' name='title' >");

            let newFormGroup2 = $('<div>');
            newFormGroup2.addClass("form-group");
            let newFormGroupLabel2 = $('<label for=bodyinput">');
            newFormGroupLabel2.text("New Note Text");
            newFormGroup2.append(newFormGroupLabel2);
            newFormGroup2.append("<textarea id='bodyinput' name='body'></textarea>");

            let newButton = $("<button data-id='" + result._id + "' id='savenote'>Save Note</button>");

            newForm.append(newFormGroup1);
            newForm.append(newFormGroup2);
            newForm.append(newButton);

            $('.noteModalBody').append(newForm)

            for (let i = 0; i < result.notes.length; i ++) {
                $('#noteList').append("<li>" + result.notes[i] + "</li>")
            }
        }).then(
            $('#noteModal').modal('show')
        )

    });

    $('#savenote').on("click", function(event) {

        let articleId = $(this).attr("data-id");

        console.log(articleId)

        // $.ajax("/api/notes/" + articleId, {
        //     type: "POST"
        // }).then(function(result) {
        //     console.log(result)
        // })

        // $.ajax("/api/notes/" + articleId, {
        //     type: "POST",
        //     // data: {
        //     //     title: $("#titleinput").val(),
        //     //     body: $("#bodyinput").val()
        //     // }
        // }).then(function(result) {
        //     console.log(result);
        //     // $('#noteModal').modal('hide');
        //     // $('.noteModalBody').empty();
        //     // $("#titleinput").val("");
        //     // $("#bodyinput").val("");
        // });
    })

});

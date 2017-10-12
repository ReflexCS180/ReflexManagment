$("#new-board-btn").on("click", function(event) {
    $("#new-board-modal").slideDown("fast");
    $("input#new-board-name").focus();
});

$("#new-board-modal").find("button.close").on("click", function(event) {
    $(this).parent().slideUp("fast");
});

$("#new-board-modal").find("button#create-board-btn").on("click", function(event) {
    var boardName = $("input#new-board-name").val();
    $("input#new-board-name").val("");
    if (boardName.trim()) {
        $("#new-board-modal").slideUp("fast");
        var newBoard = "<div class='col-3'>"
            + "<button class='btn btn-primary btn-block btn-lg mb-5 project-btn'>"
            + boardName
            + "</button></div>";
        $("#personal-boards:nth-last-child(2)").fadeOut();
        $("#personal-boards:nth-last-child(2)").after(newBoard);
    }
    else {
        alert("Please enter a valid board name");
        $("input#new-board-name").focus();
    }
});

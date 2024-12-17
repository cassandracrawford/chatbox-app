var socket = io(); // socket is now a reference to the Socket.IO library

// $ function - use of JQuery
// on: a function that accepts another function as parameter
$('form').on('submit', function () {
    var text = $('#initials').val().toUpperCase() + ' says: ' + $('#message').val();
    socket.emit('message', text);
    $('#initials').val('');
    $('#message').val('');
    return false;
});

socket.on('message', function (messages) {
     // Clear the #history list to avoid duplicates
     $('#history').empty();

    // Loop through the array and append each message to the list
    messages.forEach(function (msg) {
        $('<li>').text(msg).appendTo('#history');
    });
});
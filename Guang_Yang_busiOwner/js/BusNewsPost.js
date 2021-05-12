$(document).ready(function() {

    //Click on plus icon to add another food input form
    $('#plus').click(() => {
        $('form:first-of-type').clone().appendTo('.foodInput');
    })

    // Click on the camera icon and shows the popup
    $('.camera').click(() => {

    })
})
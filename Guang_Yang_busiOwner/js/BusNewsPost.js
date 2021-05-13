$(document).ready(function() {

    //Click on plus icon to add another food input form
    $('#plus').click(() => {
        $('form:first-of-type').clone().appendTo('.foodInput');
    })

    // Click on the camera icon and shows the popup
    $('#modalShow').click(() => {
        $('#popup-container').show();
    })

    // close modal popup
    $('#close-btn').click(() => {
        $('#popup-container').hide();

    })

    // Get the value of dropdown menu and give it to the food name input
    $('.dropdown-menu').on('click', 'a', function() {
        console.log($(this).attr('value'));
        $('.foodname').val(`${$(this).attr('value')}`);
        console.log($('.foodname').val() + " " + $('.inputDate').val());
    })

    /*  Access user device camera
     This feature block of code was adapted from the tutorial found here:
     https://www.youtube.com/watch?v=YoVJWZrS2WU 
     https://www.youtube.com/watch?v=nhX9EUGIZ6o */

    /* Once click on the "take a photo" the modal has to be closed.
    and the video and shoot button have to be shown.
    */
    $('#snap').click(() => {
        // Hide popup modal.
        $('#popup-container').hide();

        //Display video and shoot button
        $('#video').show();
        $('#shoot').show();

        // If user has input device, play the video.
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

            navigator.mediaDevices.getUserMedia({
                video: true
            }).then(stream => {
                video.srcObject = stream;

                video.play();
            })
        }
    })

    // create canvas element.
    let canvas = $('#canvas');
    let context = canvas.get(0).getContext('2d');


    $('#shoot').click(() => {

        // Hide the video and shoot button.
        $('#video').hide();
        $('#shoot').hide();

        // Draw the image and display it on the canvas.
        context.drawImage(video, 0, 0, 320, 100);

        // Get image URL in base64 encoded string.
        const dataURl = canvas.toDataURL('image/jpeg');

        // Ajax call to send the URL to back end.
    })


    // Choose image from phone
    var imgURL;
    $('#imgUpload').on('change', function() {

        // Check if the files are uploaded
        if (this.files && this.files[0]) {
            imgURL = URL.createObjectURL(this.files[0]);
            console.log(imgURL);
        }


    })



    // Submit the image selected and hide the popup.
    $('#submit').click(() => {
        // Hide popup modal.
        $('#popup-container').hide();

        // Send the image URL to backend by ajax.
    })

})
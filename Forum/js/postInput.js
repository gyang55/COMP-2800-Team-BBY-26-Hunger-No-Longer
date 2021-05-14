//1) GET input values from user
const inputThreadForm = document.querySelector('#threadForm');
inputThreadForm.addEventListener('submit', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.

    //Upload into database (Post Collection)
    db.collection('Post').add({
        title: inputThreadForm['titleBox'].value,
        body: inputThreadForm['textBody'].value,
        tag: inputThreadForm['tagBox'].value,
        date: jQuery.timeago(new Date()) //From Timeago plugin
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        inputThreadForm.reset();
        window.location.replace("/Forum/Forum.html");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});

/***********************************************************************************/




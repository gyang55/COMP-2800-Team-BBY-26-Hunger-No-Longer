//1) IF USER CHOOSES NO PROFILE PIC (DEFAULT IS GIVEN):
const optionalButton = document.querySelector('#optionalButton');
optionalButton.addEventListener('click', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.

    //Upload to database (User Collection)
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        pictureURL: "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg"
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Forum/Forum.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});

//2) IF USER DECIDES TO UPLOAD ONE (From Maksim Ivanov: https://www.youtube.com/watch?v=RLL9FEccW1Y)






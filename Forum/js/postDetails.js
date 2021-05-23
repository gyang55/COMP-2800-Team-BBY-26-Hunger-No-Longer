$(document).ready(function () {
    const urlWithID = new URL(window.location.href);
    var id = urlWithID.searchParams.get("id"); //UNIQUE doc id refering to the current Post clicked

//1) Fetches Current User Post Information:
function getUserThread(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if(user) {
            db.collection("Post").doc(id).get().then(function (doc) {
                applyFetchedPostData(doc);
            })
        }
    });
}
setInterval(getUserThread(id), 3000);

//2) Function that fetches Post Data
function applyFetchedPostData(doc) {
    let html = ''; 

        //***IF no picture has been uploaded: */
        var picture;
        if(doc.data().pictureURL == null) {
            picture = "https://firebasestorage.googleapis.com/v0/b/hunger-no-longer.appspot.com/o/posts%2FdjR9UC8ZHDRvrKfiaf0aq4ZL46b2.jpg?alt=media&token=93b46c50-bf33-4334-b08c-811ec8f6468a";
        } else {
            picture = doc.data().pictureURL;
        }

        $("#postContainer").prepend(`
            <div id="post">
                <div id="dateAndUserContainer">
                    <div id="userNamePosted">
                        <p>${doc.data().username}</p>
                    </div>
                    <div id="datePosted">
                        <p>${doc.data().date}</p>
                    </div>
                </div>
                <div id="postTitle">
                    <p>${doc.data().title}</p>
                </div>
                <div id="postImage">
                    <img src=${picture}>
                </div>
                <div id="postBody">
                    <p>${doc.data().body}</p>
                </div>
                <div id="like-LoveContainer">
                    <div id="heart">
                        <a href=""><img src="https://img.icons8.com/color/25/000000/like--v3.png"/></a>
                    </div>
                    <div id="smile">
                        <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                    </div>
                    <div id="notSmile">
                        <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                    </div>
                </div>                     
            </div>
        `);

        $("#pageTitle").html(`${doc.data().title}`);

};

});
//For Thread.html ONLY
const url = new URL(window.location.href);
var id = url.searchParams.get("id"); //UNIQUE doc id refering to the current Post clicked
console.log(id);

const comContainer = document.querySelector('#commentContainer');
function getUserComments() {
    //Retrieves an array of Comments from the collection:
    db.collection("Comment").get().then(function (data) {
        
        //For each doc...
        data.forEach(function (doc) {
            if(doc.data().postID == id) {
                $("#commentContainer").append(`
                    <div id="comment">
                        <div id="dateAndUserContainer2">
                            <div id="userCommentPic">
                                <img src="${doc.data().profilePictureURL}" width="35px" height="35px">
                            </div>
                            <div id="userNamePosted2">
                                <p>${doc.data().userName}</p>
                            </div>
                            <div id="datePosted2">
                                <p>${doc.data().date}</p>
                            </div>
                        </div>
                        <div id="commentTextContainer">
                            <div></div>
                            ${doc.data().body}
                        </div>
                        <div id="like-replyContainer">
                            <div id="smile2">
                                <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                            </div>
                            <div id="notSmile2">
                                <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                            </div>
                            <div id="replyButton">
                                <span id="replyButtonFont">REPLY</span>
                            </div>
                        </div>       
                    </div>
                `);
            } 
        });
    })
};
getUserComments();


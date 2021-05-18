//1) Fetches Current User Information:
function getUserPosts() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if(user) {
            db.collection('Post').get()
                .then((snapshot) => {
                    applyFetchedPostData(snapshot.docs);
            })
        }
    })
};
getUserPosts();

const postContainer = document.querySelector('#feedContainer');

//2) Applies the fetched data and translates selected data into DOM elements
function applyFetchedPostData(data) {
    let html = ''; //Stringifies each DOM element placed in this array.

        data.forEach(doc => {
            const postData = doc.data();
            const postDOM = `
                <div id="feed" style="display: grid; grid-template-rows: 30px 100px 35px; border: 1px solid rgb(107, 107, 107);">
                    <div id="dateAndUserContainer" style="display: grid;grid-template-columns: 130px auto auto;">
                        <div id="userNamePosted" style="padding-left: 10px;">
                            <p>${postData.username}</p>
                        </div>
                        <div id="datePosted">
                            <p>${postData.date}</p>
                        </div>
                    </div>
                    <div id="pictureTitleTextContainer" style="display: grid; grid-template-columns: 0px 100px auto;">
                        <div></div>
                        <div id="picture">
                            <img src=${postData.pictureURL} width="80px" height="80px" style="display: block; margin-left: auto; margin-right: auto; padding-top: 10px;">
                        </div>
                        <div id="titleAndTextContainer" style="display: grid; grid-template-rows: 32px 50px;">
                            <div id="feedTitle" style="font-size: 15px; font-family:Georgia, 'Times New Roman', Times, serif; font-weight: 900; color: black; overflow: auto;
                            overflow-x: hidden;
                            -ms-overflow-style: none;  /* IE and Edge */
                              scrollbar-width: none;  /* Firefox */">
                                <p style="width: 100%;text-overflow: ellipsis; overflow: hidden; white-space: pre; margin-top: 7px;">${postData.title}</p>
                            </div>
                            <div id="textBody" style="overflow: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; ">
                                <p>${postData.body}</p>
                            </div>
                        </div>
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
            `;
            html += postDOM
            postContainer.innerHTML = html;
        });
}

/******* FIXED QUEUE CODE BY: https://gist.github.com/bennadel/9760671 *******/
// Create a constructor for the fixed-length queue. This is
 // really more of a FACTORY than a construtor since an
// entirely tangential object is returned.
function FixedQueue( size, initialValues ){

// If there are no initial arguments, default it to
// an empty value so we can call the constructor in
// a uniform way.
    initialValues = (initialValues || []);

    // Create the fixed queue array value.
    var queue = Array.apply( null, initialValues );

    // Store the fixed size in the queue.
    queue.fixedSize = size;

    // Add the class methods to the queue. Some of these have
    // to override the native Array methods in order to make
    // sure the queue lenght is maintained.
    queue.push = FixedQueue.push;
    queue.splice = FixedQueue.splice;
    queue.unshift = FixedQueue.unshift;

    // Trim any initial excess from the queue.
    FixedQueue.trimTail.call( queue );

    // Return the new queue.
    return( queue );

}


// I trim the queue down to the appropriate size, removing
// items from the beginning of the internal array.
    FixedQueue.trimHead = function(){

    // Check to see if any trimming needs to be performed.
        if (this.length <= this.fixedSize){

            // No trimming, return out.
            return;
        }

        // Trim whatever is beyond the fixed size.
        Array.prototype.splice.call(
            this,
            0,
            (this.length - this.fixedSize)
        );

    };


            // I trim the queue down to the appropriate size, removing
            // items from the end of the internal array.
            FixedQueue.trimTail = function(){

                // Check to see if any trimming needs to be performed.
                if (this.length <= this.fixedSize){

                    // No trimming, return out.
                    return;

                }

                // Trim whatever is beyond the fixed size.
                Array.prototype.splice.call(
                    this,
                    this.fixedSize,
                    (this.length - this.fixedSize)
                );

            };


            // I synthesize wrapper methods that call the native Array
            // methods followed by a trimming method.
            FixedQueue.wrapMethod = function( methodName, trimMethod ){

                // Create a wrapper that calls the given method.
                var wrapper = function(){

                    // Get the native Array method.
                    var method = Array.prototype[ methodName ];

                    // Call the native method first.
                    var result = method.apply( this, arguments );

                    // Trim the queue now that it's been augmented.
                    trimMethod.call( this );

                    // Return the original value.
                    return( result );

                };

                // Return the wrapper method.
                return( wrapper );

            };

            // Wrap the native methods.
            FixedQueue.push = FixedQueue.wrapMethod(
                "push",
                FixedQueue.trimHead
            );

            FixedQueue.splice = FixedQueue.wrapMethod(
                "splice",
                FixedQueue.trimTail
            );

            FixedQueue.unshift = FixedQueue.wrapMethod(
                "unshift",
                FixedQueue.trimTail
            );

    // Create a fixed news queue
    var fixedNewsQueue = FixedQueue(10, null);
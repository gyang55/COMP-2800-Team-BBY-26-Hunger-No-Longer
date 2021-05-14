'use strict'

//1) For Thread Title:
const inputTitleForm = document.querySelector('#inputTitleForm');
inputTitleForm.addEventListener('input', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.

    //Get Post Title
    const title = inputTitleForm['titleBox'].value;
    console.log(title);
});

/***********************************************************************************/


//2) For Thread Body
const inputBodyText = document.querySelector("#inputBodyTextForm");
inputBodyText.addEventListener('input', (e) => {
    e.preventDefault();
    
    //Get textArea stuff
    const bodyText = inputBodyText['textBody'].value;
    console.log(bodyText);
});


/***********************************************************************************/

//3) For Tags
const inputTag = document.querySelector("#inputTagForm");
inputTag.addEventListener('input', (e) => {
    e.preventDefault();

    //Get textArea stuff
    const userInputTag = inputTag['tagBox'].value;
    console.log(userInputTag);
});

// 4) Upload Thread Attributes to FireBase



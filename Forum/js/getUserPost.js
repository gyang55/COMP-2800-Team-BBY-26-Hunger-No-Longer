
//1) Selects the database schema we want from FireStore
db.collection('Individual').get().then(snapshot => {
    console.log(snapshot.docs); //Snapshot for a specific class: An array of documents of the Firebase classes.
})

//PROBLEM HERE IS IF IT GETS AND PRINTS OUT EVERY USER POST as an array, how can we LIMIT that???
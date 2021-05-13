
//1) Selects the database schema we want from FireStore
db.collection('Individual').get().then(snapshot => {
    console.log(snapshot.docs); //Snapshot for a specific class: An array of documents of the Firebase classes.
})
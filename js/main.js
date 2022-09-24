/* Create a page counter variable such that it can access different url at the next click on blue button */
var pageCounter = 1;

/* Create a JS variable to point to the Html div area
Also, Create a JS variable as object to point to the button element */
var animalContainer = document.getElementById("animal-info") ;
var btn = document.getElementById("btn");

/* then, add an event listener to the object and then put the entire JS code inside 
an anonymous function of the event listener */
btn.addEventListener("click",  function() {
    /*  We create an instance of the tool XMLHttpRequest, which will help sending and receiving the data on the fly,
        without creating a page-reload */
    var ourRequest = new XMLHttpRequest();

    /* Now use the object instance to open connection and say that we want
       to download the data that is GET from the mentioned URL, and not send, that is to POST 
       Also, we need to get different animals-pageCounter for each click */
    // ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    ourRequest.open('GET', 'animals-' + pageCounter + '.json');

    /*  Now, after we have had an access to the data downloaded, we need to process the data (JSON)
        We are going to use the object to define a method "onload" with an anonymous function */
    ourRequest.onload = function() {
            /*  this is a POC on the console if the data access is getting proper */
            //  console.log(ourRequest.responseText);  
            /*    Let us now, put the same JSON data as a whole in a variable */
            var ourData = ourRequest.responseText;

            /* Now, let's print on the browser the first element of the object array, that is the cat "Mewsalot" */
            // console.log(ourData[0]);
            /* But, browser interprets that as a Giant Text and not a JSON object, therefore on Console only "[" appears
               Therefore we need to convert the responseText as JSON object  */

            /* Error handling */
            if (ourRequest.status >= 200 && ourRequest.status < 400 ) {
                ourData = JSON.parse(ourRequest.responseText);
                // console.log(ourData[0]);
                // Call the function renderHtml()
                renderHtml(ourData);
            } else 
                console.log("We are connected to Server, but it returned and Error…");
    };
    ourRequest.onerror = function() {
        console.log("Connection error..");
    };
    
    // Finally, we would like to send the response to the client
    ourRequest.send();
    // Here, we need to hide the blue button once we already have accessed 3 different JSON data files on the fly
    pageCounter++;
    if (pageCounter > 3) {
	    btn.classList.add("hide-me");
    }
 
});  // end of event listener

function renderHtml(data) {
    /* The Html should be using the area designated to the browser by div with id = "animal-info"
       So, create a JS variable to contain the id - globally declared on top */ 
    var htmlString = "Some Text";
    htmlString = "";

    // Loop through the JSON data
    for (i=0; i < data.length; i++) {
        htmlString += "<p>" + "<b>" + data[i].name +"</b>" + " is a " + data[i].species + " that likes to eat ";

        // loop through the foods which the animals likes
        for (ii=0; ii < data[i].foods.likes.length; ii++) {
            htmlString += data[i].foods.likes[ii];
            if (ii < data[i].foods.likes.length) 
                htmlString += " , ";
        }
        htmlString += " and also, that dislikes to eat ";
        // loop through the foods which the animals dislikes
        for (ii=0; ii < data[i].foods.dislikes.length; ii++) {
            htmlString += data[i].foods.dislikes[ii];
            if (ii < data[i].foods.dislikes.length && ii+1 != data[i].foods.dislikes.length) 
                htmlString += " , ";
        }
    }

    // animalContainer.insertAdjacentHTML('beforeend', 'Some Text');	
    animalContainer.insertAdjacentHTML('beforeend', htmlString);

    /* if the above works and prints "Some Text" then we can move on to browse the JSON objects Array and print the data. */

}


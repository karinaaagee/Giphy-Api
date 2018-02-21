
var topic = ['puppy', 'kitten', 'lion', 'turtle', 'kangaroo', 'giraffe', 'deer', 'koala'];

// creates button
function showButton(){
    $("#animalButtons").empty()
    //looping through array of animals
    for (var i = 0; i < topic.length; i++) {
        //jquery needs to create the start and end tag of a button
        var a = $("<button>");
        //adding a class
        a.addClass("animal");
        a.addClass("btn btn-info")
        //adding a data-attribute with the value of the animal at index i
        a.attr("data-name", topic[i]);
        //providing the buttons text with a value of the animal at index i
        a.text(topic[i]);
        //adding the button to the html
        $("#animalButtons").append(a);
    }


    //adds new animal when typing it in the search bar
    $("#addAnimal").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        // This line will grab the text from the input box
        var newAnimal = $("#animal-input").val().trim();
        if (newAnimal == "") {
            return false;
        }
        // The animal from the textbox is then added to our array
        topic.push(newAnimal);
        console.log("LOOK AT ME!");
        showButton();

    });
    


    $(".animal").on('click', function () {
        $("#gifs-display").empty();

        var x = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                console.log(response);
                var results = response.data
                for (var i = 0; i < results.length; i++) {
                    var animalGif = $("<div>");

                    var Rating = $("<p>").text("Rating: " + results[i].rating);
                    animalGif.append(Rating);

                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.original_still.url);
                    animalImage.attr("data-still", results[i].images.original_still.url);
                    animalImage.attr("data-animate", results[i].images.original.url);
                    animalImage.attr("data-state", "still")
                    
                    // attr id , x + i
                    // "zabra1"
                    // add clik funk --
                     animalImage.on("click", function(){
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            var animateUrl = $(this).attr("data-animate");
                            $(this).attr("src", animateUrl);
                            $(this).attr("data-state", "animate");
                          } else {
                            var stillUrl = $(this).attr("data-still");
                            $(this).attr("src", stillUrl);
                            $(this).attr("data-state", "still");
                          }
                     });

                    $("#gifs-display").append(animalGif);
                    $("#gifs-display").append(animalImage);
                }
            })


    });
        
}
showButton();




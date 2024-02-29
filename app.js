const e = require('express');
const express = require('express');
const app = express();
const request = require('request');

let pokemonName = "Pikachu";

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});

app.get('/pokemon', (req, res) => {
    // Replaces default name with requested name
    let pokemonName = req.query.name;

    // Retrieves the image
    request('https://pokeapi.co/api/v2/pokemon/' + pokemonName, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            res.send('<img src="' + JSON.parse(body).sprites.front_default + '">'
            + '<h1>' + pokemonName + '</h1>'
            + '<p>Type: ' + JSON.parse(body).types[0].type.name + '</p>'
            + '<p>Height: ' + JSON.parse(body).height + '</p>'
            + '<p>Weight: ' + JSON.parse(body).weight + '</p>'
            );
            
        }
        else {
            res.send("Error: " + response.statusCode);
        }
    });


});



// Port to run app
app.listen(3000, () => {
    console.log('Listening to port.');
});


  
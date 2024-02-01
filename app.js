const express = require('express');
const app = express();
const request = require('request');

let pokemonName = "Pikachu";

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});

app.get('/pokemon', (req, res) => {
    // Replaces default name with requested name
    let pokemonName = req.query.name;

    // Retrieves the image
    request('https://pokeapi.co/api/v2/pokemon/' + pokemonName, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // send an image of that pokemon
            res.send('<img src="' + JSON.parse(body).sprites.front_default + '">');
        }
    });


});



// Port to run app
app.listen(3000, () => {
    console.log('Listening to port.');
});


  
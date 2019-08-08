var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));




app.get("/", function (req, res) {
    
    res.render("search.ejs");
});




app.get("/results", function (req, res){
    let userInput = req.query.search;
    
    //API KEYS
    let geocode_api_key = "AIzaSyAZpBUG4CpsIAk6dT73MbOUyC6f99hUXJs"
    let dark_sky_api_key = "213937730f592bdd0b26e4a5a2972666";

    let geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${geocode_api_key}`



    request(geocode_url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)

            let lat = (data["results"].find(o => o.location_type = "APPROXIMATE").geometry.location.lat);
            
            let lng = (data["results"].find(o => o.location_type = "APPROXIMATE").geometry.location.lng); 
            

            let dark_sky_url = `https://api.darksky.net/forecast/${dark_sky_api_key}/${lat},${lng}?units=us`

            request(dark_sky_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let data = JSON.parse(body);

                    res.render("results.ejs", { data: data });
                } else {
                    res.send(`Sorry something went wrong. ERROR: ${error}`)
                }
            })
        } 

    })
})





let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening at ", PORT);
}); 


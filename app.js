var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("search.ejs");
});


app.get("/results", function (req, res){
    let lat = req.query.search;
    let long = req.query.search2;
    
    let api_key = "213937730f592bdd0b26e4a5a2972666";
    //us is the best one.
    let url = `https://api.darksky.net/forecast/${api_key}/${lat},${long}?units=us`



    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)

            res.render("results.ejs", {data: data});
    
        } else {
            res.send("Your input is invalid! ");
        }

    })
})





let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening at ", PORT);
}); 


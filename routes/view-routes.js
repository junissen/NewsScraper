const db = require("../models")

module.exports = function(app) {

    app.get("/", function(req, res) {

        var headlineObject = {}

        headlineObject["articles"] = []

        db.Headline.find({}, function(error, found) {
            // Log any errors if the server encounters one
            if (error) {
              console.log(error);
            }
            // Otherwise, send the result of this query to the browser
            else {
                for (let i = 0; i < found.length; i ++ ) {

                    console.log(found[i]);

                    newObject = {
                        id: found[i]._id,
                        headline: found[i].headline,
                        summary: found[i].summary,
                        link: found[i].link,
                        photo: found[i].photo,
                        saved: found[i].saved,
                        notes: found[i].notes
                    }

                    headlineObject.articles.push(newObject);

                    if (i == (found.length - 1)) {
                        // res.json(headlineObject)
                        // let newArticles = headlineObject.articles.reverse();
                        // headlineObject["articles"] = newArticles
                        res.render("home", headlineObject)
                    }
                }
            }

        });

    });

    app.get("/saved", function(req, res) {
        var headlineObject = {}

        headlineObject["articles"] = []

        db.Headline.find({saved: true}, function(error, found) {
            // Log any errors if the server encounters one
            if (error) {
              console.log(error);
            }
            // Otherwise, send the result of this query to the browser
            else {
                for (let i = 0; i < found.length; i ++ ) {

                    console.log(found[i]);

                    newObject = {
                        id: found[i]._id,
                        headline: found[i].headline,
                        summary: found[i].summary,
                        link: found[i].link,
                        photo: found[i].photo,
                        saved: found[i].saved,
                        notes: found[i].notes
                    }

                    headlineObject.articles.push(newObject);

                    if (i == (found.length - 1)) {
                        // res.json(headlineObject)
                        // let newArticles = headlineObject.articles.reverse();
                        // headlineObject["articles"] = newArticles
                        res.render("saved", headlineObject)
                    }
                }
            }

        });


    });
}





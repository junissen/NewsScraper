const cheerio = require("cheerio");
const request = require("request");
const db = require("../models")

module.exports = function(app) {

    app.get("/api/scrape", function(req, res) {

        let newArticles = 0;

        request("http://www.npr.org/sections/news/", function(error, response, html) {

            const $ = cheerio.load(html);

            $("article.item").each(function(i, element) {


                let headline = $(element).find('.item-info').find('.title').find('a').text();
                let summary = $(element).find('.item-info').find('.teaser').find('a').text();
                let link = $(element).find('.item-info').find('.title').children().attr("href");
                let photo = $(element).find('.item-image').find('.imagewrap').find('a').find('img').attr("src");


                let headlineObject = {
                    headline: headline,
                    summary: summary, 
                    link: link,
                    photo: photo
                }

                db.Headline.create(headlineObject, function(error) {
                    if (error) console.log("Article already exists: " + headlineObject.headline)
                    else {
                        console.log("New article: " + headlineObject.headline);
                        newArticles ++;
                    }

                    if (i == ($("article.item").length - 1)) {
                        res.json(newArticles)
                    }
                })


            });

        })
    });

    app.post("/api/save/article/:id", function(req, res) {
        let articleId = req.params.id;

        db.Headline.findOneAndUpdate(
            {_id: articleId},
            {
                $set: {saved: true}
            }
        ).then(function(result) {
            res.json(result)
        })
    });


    app.post("/api/delete/article/:id", function(req, res) {
        let articleId = req.params.id;

        db.Headline.findOneAndUpdate(
            {_id: articleId},
            {
                $set: {saved: false}
            }
        ).then(function(result) {
            res.json(result)
        })
    });

    app.get("/api/notes/:id", function(req, res) {
        let articleId = req.params.id;

        db.Headline.findOne(
            {_id: articleId}
        )
        .populate("note")
        .then(function(result) {
            res.json(result)
        })
    });

    app.post("/api/notes/:id", function(req, res) {
        console.log(req.body);

        // db.Note.create(req.body)
        // .then(function(dbNote) {
        //     return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        // })
        // .then(function(result) {
        //     res.json(result);
        // })
        // .catch(function(err) {
        //     res.json(err);
        // });
    })
}




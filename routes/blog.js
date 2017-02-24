const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

// TODO кеширование запросов, которые завершились успешно
let cache ={};

/* GET home page. */
router.get('/', function(req, res, next) {
  // отобразить все записи с пейджингом
  res.render('blog', { curUrl: "/blog" });
  res.end("blog");
});



/* GET home page. */
router.get('/:name', (req, res, next) =>     {
    if (cache[req.params.name]) {
        res.render("posts/" + req.params.name, {
          curUrl: "/blog"
        });  
    } else {
        if (fs.access("views/posts/" + req.params.name + ".pug", fs.constants.R_OK, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    err.status = 400;
                }
                next(err);
            } else {
                cache[req.params.name] = true;
                res.render("posts/" + req.params.name, {
                  curUrl: "/blog"
                });
            }
        }));
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

// TODO кеширование запросов, которые завершились успешно
let cache ={};

/* GET home page. */
router.get('/:name', (req, res, next) =>     {
    if (cache[req.params.name]) {
        res.render("posts/post" + req.params.name);  
    } else {
        if (fs.access("views/posts/post" + req.params.name + ".pug", fs.constants.R_OK, (err) => {
            if (err) {
                if (err.code === "ENOENT") {
                    err.status = 400;
                }
                next(err);
            } else {
                cache[req.params.name] = true;
                res.render("posts/post" + req.params.name);
            }
        }));
    }
});

module.exports = router;

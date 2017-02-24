const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const pug = require("pug");

// TODO кеширование запросов, которые завершились успешно
let cache ={};

/* GET blog page. */
router.get('/', function(req, res, next) {
  // отобразить все записи с пейджингом
  res.render('blog', { curUrl: "/blog" });
  res.end("blog");
});

// read post
router.get('/read/:name', (req, res, next) =>     {
    if (cache[req.params.name]) {
        renderPost(res, req.params.name); 
    } else {
        fs.access("views/posts/" + req.params.name + ".pug", fs.constants.R_OK, (err) => {
            if (err) {
                // если файла не существует то 404
                if (err.code === "ENOENT") {
                    err.status = 404;
                }
                next(err);
            } else {
                cache[req.params.name] = true;
                renderPost(res, req.params.name); 
            }
        });
    }
});

/*
 * ответ запросу клиент
 * @param {object} res - объект ответа express
 * @param {string} name - имя шаблона
 */
function renderPost(res, name) {
    res.render("posts/" + name, {
        curUrl: "/blog"
    });  
}

module.exports = router;

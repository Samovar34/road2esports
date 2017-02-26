const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const resourceReader = require("../libs/resourceReader");

const pug = require("pug");

let postRouter = require("../resource/router.json");

// TODO кеширование запросов, которые завершились успешно
let cache ={};


// маршрутизация по спискам блогов
router.use("/page/:name", (req, res, next) => {
    let param = parseFloat(req.params.name);

    // если не верный параметр => 404
    if (isNaN(param)) {
        let err = new Error("Not found");
        err.status = 404;
        next(err);
        return;
    } else {
        param = Math.abs(param);
    }

    if (param > 0) {
        param -= 1;
    } else {
        param = 0;
    }

    

    resourceReader.get(postRouter.paths[param], (err, data) => {
        if (err) {
            next(err);
        } else {
            res._blogData = data;
            next();
        }
    });
});

/* GET blog page. */
router.get("/", function(req, res, next) {
  // отобразить все записи с пейджингом
    resourceReader.get(postRouter.paths[0], (err, data) => {
        if (err) {
            next(err);
        } else {
            res.render('blog', { curUrl: "/blog", values: data});
        }
    });
});

router.get("/page/:name", (req, res, next) => {
    res.render("test", {
        curUrl: "/blog",
        values: res._blogData
    });
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

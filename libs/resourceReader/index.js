const fs = require("fs");

let resouseRoot = "./resource/";
const cache = {};


exports.get = function read(resourceId, callback) {
    if (cache[resourceId]) {
        callback(null, cache[resourceId]);
        return;
    }
    var path = resouseRoot + resourceId + ".json";
    fs.open(path, "r", (err, fd) => {
        if (err) {
            if (err.code === "ENOENT") {
                err.status = 404;
            }
            callback(err);
        } else {
            fs.readFile(fd, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    try {
                        cache[resourceId] = JSON.parse(data);
                        callback(null, cache[resourceId]);
                    } catch (err) {
                        callback(err);
                    }
                }
            });
        }
    });
}
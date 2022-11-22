"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getValueIgnoringKeyCase(object, key) {
    var foundKey = Object
        .keys(object)
        .find(function (currentKey) { return currentKey.toLocaleLowerCase() === key.toLowerCase(); });
    return object[foundKey];
}
function getBoundary(event) {
    return getValueIgnoringKeyCase(event.headers, 'Content-Type').split('=')[1];
}
function getBody(event) {
    if (event.isBase64Encoded) {
        return Buffer.from(event.body, 'base64').toString('binary');
    }
    return event.body;
}
exports.parse = function (event, spotText) {
    var boundary = getBoundary(event);
    var result = {};
    getBody(event)
        .split(boundary)
        .forEach(function (item) {
        if (/filename=".+"/g.test(item)) {
            result[item.match(/name=".+";/g)[0].slice(6, -2)] = {
                type: 'file',
                filename: item.match(/filename=".+"/g)[0].slice(10, -1),
                contentType: item.match(/Content-Type:\s.+/g)[0].slice(14),
                content: spotText ? Buffer.from(item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4), 'binary') :
                    item.slice(item.search(/Content-Type:\s.+/g) + item.match(/Content-Type:\s.+/g)[0].length + 4, -4),
            };
        }
        else if (/name=".+"/g.test(item)) {
            result[item.match(/name=".+"/g)[0].slice(6, -1)] = item.slice(item.search(/name=".+"/g) + item.match(/name=".+"/g)[0].length + 4, -4);
        }
    });
    return result;
};

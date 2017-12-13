var e=require("chalk"),o=require("./mates.js"),n=function(o){return o.map(function(o){return console.log(e.green(o))})},r=function(o){Promise.all(o.checkers.map(function(e){return e(o)})).then(function(r){console.log(" "),console.log(" "),console.log(e.bold.blueBright("Checks for "+o.humanName)),n(r)})};module.exports=function(e,n){if("object"!=typeof e)throw new TypeError("Expected an object, got "+typeof e);n=n||{},o.map(r)};
//# sourceMappingURL=cli.js.map
))));
        logAll(message);
    });
};
module.exports = (function (input, opts) {
    if (typeof input !== 'object') {
        throw new TypeError(("Expected an object, got " + (typeof input)));
    }
    opts = opts || {};
    checkFiles.map(runCheckers);
});
//# sourceMappingURL=cli.js.map

this["JST"] = this["JST"] || {};

this["JST"]["index"] = function anonymous(locals) {
var buf = [];
buf.push("<p>index view</p>");;return buf.join("");
};

this["JST"]["main"] = function anonymous(locals) {
var buf = [];
buf.push("<h1>exo-skeleton</h1><strong>project scaffolding that uses backbone and layoutmanager</strong><p>rendered at " + (jade.escape((jade.interp = new Date()) == null ? '' : jade.interp)) + "</p>");;return buf.join("");
};
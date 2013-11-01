'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ExoSkeletonGenerator = module.exports = function ExoSkeletonGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
	console.log("exo-skeleton version " + this.pkg.version);
};

util.inherits(ExoSkeletonGenerator, yeoman.generators.Base);

ExoSkeletonGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);
	cb();
};

ExoSkeletonGenerator.prototype.app = function app() {
	var cb = this.async();

	this.remote('positlabs', 'exo-skeleton', "master", function (err, remote) {
		console.log(remote.directory, err?err:"");
		remote.directory('.', '.');
		cb();
	}, true);
	// TODO - not sure if this works, but should bust cache on repo pull
	// could bust cache manually by deleting the cache directory
	// ~/.cache/yeoman/positlabs/exo-skeleton

};


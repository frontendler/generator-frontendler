'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var FrontendlerGenerator = yeoman.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },
    prompting: function() {
        var done = this.async();
        this.log(this.yeoman);
        this.log(chalk.magenta('Hello! welcome to Frontendler!\nNow we will setup and generate the project for you. :)'));
        return this.prompt([{
            name: 'appName',
            message: 'what is your app name ?',
            default: 'Frontendler'
        }]).then(function(answers) {
            this.log('App name', answers.name);
            done();
        }.bind(this));
    },
    writing: function() {
        //folders
        mkdirp('app');
        mkdirp('app/template/');
        mkdirp('app/assets/images/');
        mkdirp('app/assets/images/branding');
        mkdirp('app/assets/scripts/');
        mkdirp('app/assets/styles/');
        //settings
        this.copy('config/.editorconfig', '.editorconfig');
        this.copy('config/.eslintignore', '.eslintignore');
        this.copy('config/.eslintrc', '.eslintrc');
        this.copy('config/.travis.yml', '.travis.yml');
        this.copy('config/gulpfile.js', 'gulpfile.js');
        this.copy('config/LICENSE', 'LICENSE');
        this.copy('config/manifest.json', 'manifest.json');
        this.copy('config/package.json', 'package.json');
        this.copy('config/README.md', 'README.md');
        //images
        this.copy('images/branding/favicon.png', 'app/assets/images/branding/favicon.png');
        this.copy('images/branding/icon-57x57.png', 'app/assets/images/branding/icon-57x57.png');
        this.copy('images/branding/icon-76x76.png', 'app/assets/images/branding/icon-76x76.png');
        this.copy('images/branding/icon-120x120.png', 'app/assets/images/branding/icon-120x120.png');
        this.copy('images/branding/icon-152x152.png', 'app/assets/images/branding/icon-152x152.png');
        this.copy('images/branding/icon-192x192.png', 'app/assets/images/branding/icon-192x192.png');
        this.copy('images/branding/ms-tile.png', 'app/assets/images/branding/ms-tile.png');
        this.copy('images/branding/og-image.png', 'app/assets/images/branding/og-image.png');
        this.copy('images/branding/startup.png', 'app/assets/images/branding/startup.png');
        //style
        this.copy('styles/main.scss', 'app/assets/styles/main.scss');
        this.copy('styles/_settings.scss', 'app/assets/styles/_settings.scss');
        //script
        this.copy('scripts/main.js', 'app/assets/scripts/main.js');
        //template
        this.copy('template/layout/_default.jade', 'app/template/layout/_default.jade');
        this.copy('template/index.jade', 'app/template/index.jade');
    }
});

module.exports = FrontendlerGenerator;

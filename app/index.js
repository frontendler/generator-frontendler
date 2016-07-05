'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var FrontendlerGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        //this.log(chalk.magenta('You\'re using the fantastic Frontendler generator.'));
        this.log(chalk.magenta('Hello! welcome to Frontendler!\nTell me how you want setup your project that i will generate then for you. :)'));

        var prompts = [{
            name: 'appName',
            message: 'what is your app name ?',
            default: 'Frontendler'
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },

    app_files: function() {
        //folders
        mkdirp('app');
        mkdirp('app/template/');
        mkdirp('app/assets/images/');
        mkdirp('app/assets/scripts/');
        mkdirp('app/assets/styles/');
        //settings
        this.copy('config/package.json', 'package.json');
        this.copy('config/gulpfile.js', 'gulpfile.js');
        this.copy('config/.editorconfig', '.editorconfig');
        this.copy('config/.eslintrc', '.eslintrc');
        this.copy('config/.eslintignore', '.eslintignore');
        this.copy('config/.gitignore', '.gitignore');
        this.copy('config/manifest.json', 'manifest.json');
        //style
        this.copy('styles/main.scss', 'app/assets/styles/main.scss');
        //script
        this.copy('scripts/main.js', 'app/assets/scripts/main.js');
        //template
        this.copy('template/layout/_default.jade', 'app/template/layout/_default.jade');
        this.copy('template/index.jade', 'app/template/index.jade');
    }
});

module.exports = FrontendlerGenerator;

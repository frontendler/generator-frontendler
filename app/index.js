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
        this.log(chalk.magenta('Hello! welcome to Frontendler!\nNow we will setup and generate the project for you. :)'));

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
        mkdirp('app/assets/images/branding');
        mkdirp('app/assets/scripts/');
        mkdirp('app/assets/styles/');
        //settings
        this.copy('config/*', '.editorconfig');
        //images
        this.copy('images/**/*', 'app/assets/images/');
        //style
        this.copy('styles/*', 'app/assets/styles/');
        //script
        this.copy('scripts/*', 'app/assets/scripts/');
        //template
        this.copy('template/layout/*', 'app/template/layout/');
        this.copy('template/*', 'app/template/');
    }
});

module.exports = FrontendlerGenerator;

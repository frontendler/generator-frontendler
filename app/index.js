'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


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
        this.log(chalk.magenta('Olá você esta usando o fantástico Frontendler!\nMe diga como deseja o seu projeto que eu crio para você:'));

        var prompts = [{
            name: 'appName',
            message: 'Qual será o nome do site ?',
            default: 'Frontendler'
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;

            done();
        }.bind(this));
    },

    app_folders: function() {
        this.mkdir('app');
        this.mkdir('app/jade/');
        this.mkdir('app/bower/');
        this.mkdir('app/assets/images/');
        this.mkdir('app/assets/scripts/');
        this.mkdir('app/assets/styles/');
        this.mkdir('app/assets/styles/frontendler/ui/');
        this.mkdir('app/assets/styles/frontendler/functions/');
    },
    config_files: function() {
        this.copy('config/_package.json', 'package.json');
        this.copy('config/_Gruntfile.js', 'Gruntfile.js');
        this.copy('config/_bower.json', 'bower.json');
        this.copy('config/.bowerrc', '.bowerrc');
        this.copy('config/.editorconfig', '.editorconfig');
        this.copy('config/.ftppass', '.ftppass');
        this.copy('config/.jshintrc', '.jshintrc');
    },
    scss_files: function() {
        this.copy('styles/main.scss', 'app/assets/styles/main.scss');
        this.copy('styles/main.scss', 'app/assets/styles/main.scss');
        this.copy('styles/frontendler/_core.scss', 'app/assets/styles/_core.scss');
        this.copy('styles/frontendler/_frontendler.scss', 'app/assets/styles/_frontendler.scss');
        this.copy('styles/frontendler/functions/_grid.scss', 'app/assets/styles/frontendler/functions/_grid.scss');
        this.copy('styles/frontendler/functions/_theme.scss', 'app/assets/styles/frontendler/functions/_theme.scss');
        this.copy('styles/frontendler/ui/_base.scss', 'app/assets/styles/frontendler/ui/_base.scss');
        this.copy('styles/frontendler/ui/_breadcrumb.scss', 'app/assets/styles/frontendler/ui/_breadcrumb.scss');
        this.copy('styles/frontendler/ui/_buttons.scss', 'app/assets/styles/frontendler/ui/_buttons.scss');
        this.copy('styles/frontendler/ui/_form.scss', 'app/assets/styles/frontendler/ui/_form.scss');
        this.copy('styles/frontendler/ui/_note.scss', 'app/assets/styles/frontendler/ui/_note.scss');
        this.copy('styles/frontendler/ui/_reset.scss', 'app/assets/styles/frontendler/ui/_reset.scss');
        this.copy('styles/frontendler/ui/_table.scss', 'app/assets/styles/frontendler/ui/_table.scss');
        this.copy('styles/frontendler/ui/_thumb.scss', 'app/assets/styles/frontendler/ui/_thumb.scss');
    },
    js_files: function() {
        this.copy('js/main.js', 'app/assets/scripts/main.js');
    },
    jade_files: function() {
    	this.copy('jade/_index.jade', 'app/jade/index.jade');
    },

});

module.exports = FrontendlerGenerator;

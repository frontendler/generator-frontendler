// Generated on 2014-01-17 using generator-jade 0.5.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        folders: {
            app: 'app',
            dist: 'dist',
            tmp: '.tmp',
        },
        tag: {
            banner: '/*!\n' + ' * <%= pkg.name %>\n' + ' * <%= pkg.url %>\n' + ' * @author name <%= pkg.author.name %>\n' + ' * @author email <%= pkg.author.email %>\n' + ' * @author site <%= pkg.author.url %>\n' + ' * @version <%= pkg.version %>\n' + ' * @licence <%= pkg.license %> licensed.\n' + ' */\n'
        },
        watch: {
            compass: {
                files: ['<%= folders.app %>/assets/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            server: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= folders.tmp %>/*.html',
                    '<%= folders.tmp %>/assets/styles/{,*/}*.css',
                    '{.tmp,<%= folders.app %>}/assets/scripts/{,*/}*.js',
                    '<%= folders.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            jade: {
                files: '<%= folders.app %>/jade/**/*.jade',
                tasks: ['jade']
            },
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0',
                //hostname: 'localhost',
                livereload: true
            },
            server: {
                options: {
                    open: true,
                    base: [
                        '<%= folders.tmp %>',
                        '<%= folders.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '<%= folders.tmp %>',
                        'test',
                        '<%= folders.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: [
                        '<%= folders.dist %>'
                    ],
                    livereload: false
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= folders.tmp %>',
                        '<%= folders.dist %>/*',
                        '!<%= folders.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= folders.tmp %>'
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= folders.app %>/assets/styles',
                cssDir: '<%= folders.tmp %>/assets/styles',
                imagesDir: '<%= folders.app %>/assets/images',
                javascriptsDir: '<%= folders.app %>/assets/scripts',
                fontsDir: '<%= folders.app %>/assets/fonts',
                importPath: '<%= folders.app %>/bower',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        shell: { // Task
            formatScss: { // Target
                options: { // Options
                    stdout: true
                },
                command: 'sass-convert --recursive --dasherize --in-place --indent t --from scss <%= folders.app %>/assets/styles --to scss app/assets/styles'
            }
        },
        jade: {
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.app %>/jade',
                    src: ['{,**/}*.jade', '!**/_*'],
                    //src: ['{,*/}*.jade', '!**/_*'],
                    dest: '.tmp/',
                    ext: '.html'
                }],
                options: {
                    client: false,
                    pretty: true,
                    basedir: '<%= folders.app %>/jade',
                    data: function(dest, src) {

                        var page = src[0].replace(/app\/jade\/(.*)\/index.jade/, '$1');

                        if (page == src[0]) {
                            page = 'index';
                        }

                        return {
                            page: page
                        };
                    }
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= folders.dist %>/assets/scripts/{,*/}*.js',
                        '<%= folders.dist %>/assets/styles/{,*/}*.css',
                        '<%= folders.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= folders.dist %>/assets/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= folders.tmp %>/index.html',
            options: {
                dest: '<%= folders.dist %>'
            }
        },
        usemin: {
            html: ['<%= folders.dist %>/**/*.html'],
            css: ['<%= folders.dist %>/assets/styles/**/*.css'],
            options: {
                dirs: ['<%= folders.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.app %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= folders.dist %>/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= folders.dist %>/assets/images'
                }]
            }
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: '<%= folders.dist %>/assets/styles/',
                src: '<%= folders.tmp %>/assets/styles/{,*/}*.css',
                dest: '<%= folders.dist %>/assets/styles/'
            },
            add_banner: {
                options: {
                    banner: '<%= tag.banner %>',
                },
                files: {
                    '<%= folders.dist %>/assets/styles/main.css': ['<%= folders.dist %>/assets/styles/{,*/}*.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: false,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= folders.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= folders.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= folders.app %>',
                    dest: '<%= folders.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'assets/images/{,*/}*.{webp,gif}',
                        'assets/fonts/*'
                    ]
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.app %>',
                    dest: '<%= folders.tmp %>',
                    src: [
                        'assets/scripts/{,*/}*js', 'bower/**/*js'
                    ]
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.app %>',
                    dest: '<%= folders.tmp %>',
                    src: [
                        'assets/styles/{,*/}*css', 'bower/**/*css'
                    ]
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= folders.tmp %>',
                    dest: '<%= folders.dist %>',
                    src: [
                        '**/*.html'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['<%= folders.app %>/assets/scripts/**/*js']
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.dbeff.com.br',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'dist/',
                dest: '/frontendler.com.br/',
                exclusions: [
                    '.DS_Store',
                    'Thumbs.db'
                ]
            }
        }
    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'jade',
            'concurrent:server',
            'connect:server',
            'watch',
            'shell:formatScss'

        ]);
    });
    grunt.registerTask('format', [
        'shell:formatScss'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jade',
        'copy:js',
        'copy:css',
        'useminPrepare',
        'concurrent:dist',
        'copy:html',
        'concat',
        'cssmin',
        'cssmin:add_banner',
        'uglify',
        'copy:dist',
        //'rev',
        'usemin'
        //'htmlmin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('deploy', [
        'ftp-deploy'
    ]);
};

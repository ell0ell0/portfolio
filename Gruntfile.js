module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      main: {
        options: {
          paths: grunt.file.expand('bower_components/font-awesome/less/'),
        },
        files: {
          'src/static/css/main.css': ['src/static/css/main.less']
        }
      },
    },

    copy: {
      bootstrap_css: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], 
          dest: 'src/static/css/'
        }],
      },

      bootstrap_js: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], 
          dest: 'src/static/js/'
        }],
      },

      jquery: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/jquery/dist/jquery.min.js'], 
          dest: 'src/static/js/'
        }],
      },

      font_awesome_fonts: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/fonts/**'], 
          dest: 'src/static/fonts/'
        }],
      },

      font_awesome_LESS: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/font-awesome/less/font-awesome.less'], 
          dest: 'src/static/css/'
        }],
      },

    },

    watch: {
      main: {
        files: ['src/static/css/main.less'],
        tasks: ['less']
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
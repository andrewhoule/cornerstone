/*!
 * Your Project Gruntfile
 * projecturl
 * @author Author Name <author@email.com>
 */
 
module.exports = function(grunt) {

// load all grunt tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.initConfig({
 
  pkg: grunt.file.readJSON('package.json'),

  /* ==========================================================================
     Set project object
     ========================================================================== */

  project: {
      assets: 'assets',
      css: 'css',
      js: 'js'
  },

  /* ==========================================================================
     SASS
     ========================================================================== */

  sass: {
      dev: {
        options: {
          style: 'compressed',
          compass: true,
          sourcemap: 'none'
        },
        files: {
          '<%= project.css %>/style.css': '<%= project.assets %>/scss/style.scss'
        }
      }
  },

  /* ==========================================================================
     Concatenate JS
     ========================================================================== */

  concat: {
    js : {
      src : [
        '<%= project.assets %>/js/*'
      ],
      dest : '<%= project.js %>/projectname.js'
    }
  },

  /* ==========================================================================
     Minify JS
     ========================================================================== */

  uglify : {
    js: {
      files: {
        '<%= project.js %>/projectname.js' : [ '<%= project.js %>/projectname.js' ]
      }
    }
  },

  /* ==========================================================================
     Watch
     ========================================================================== */

  watch: {
    sass: {
      files: '<%= project.assets %>/scss/{,*/}*.{scss,sass}',
      tasks: ['sass:dev']
    },
    concat: {
      files: '<%= project.assets %>/js/*',
      tasks: ['concat:js']
    },
    uglify: {
      files: '<%= project.assets %>/js/*',
      tasks: ['uglify:js']
    }
  } 

});

/* ==========================================================================
   Default task Run `grunt` on the command line
   ========================================================================== */
     
grunt.registerTask('default',['sass:dev','watch']);
 
};
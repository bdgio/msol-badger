module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          'public/css/base.css': 'public/less/base.less',
          'public/css/admin.css': 'public/less/admin.less',
          'themes/msol/public/css/msol.css' : 'themes/msol/public/less/msol.less',
          'themes/msol/public/css/criteria.css' : 'themes/msol/public/less/criteria.less'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-less');

grunt.registerTask('default', ['less']);
};
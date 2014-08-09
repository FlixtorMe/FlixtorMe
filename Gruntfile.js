module.exports = function (grunt) {

    grunt.initConfig({
        nodewebkit: {
            options: {
                version: '0.9.2',
                keep_nw: true,
                embed_nw: false,
                build_dir: './builds', // Where the build version of my node-webkit app is saved
                zip: true,
                mac: true,
                win: true,
                linux32: true,
                linux64: true,
                mac_icns: './images/flixtor-ico.icns'
            },
            src: ['./src/frames/**', './src/fonts/**', './src/images/**', './src/js/**',  './src/locales/**', './src/node_modules/**', './src/styles/**', './src/package.json'] // Your node-webkit app
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['nodewebkit']);
}
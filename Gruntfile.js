module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist', 'tscommand-*.txt'],
        ts: {
            options: {
                target: 'es5',
                sourcemap: false,
                fast: 'never'
            },
            all: {
                src: ["src/references.d.ts", "src/ArmyKnife.ts"],
                out: 'dist/ng-army-knife.js',
            },
        },
        jsbeautifier: {
            json: {
                src: ["*.json"],
                options: {}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['clean', 'ts']);
};

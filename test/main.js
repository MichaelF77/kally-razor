var libPath = process.env['KALLY_RAZOR_COV'] ? '../lib-cov/' : '../lib/';
var chai = require('chai');
var KallyRazor = require(libPath + 'main');
var fs = require('fs');

var razor = KallyRazor({
    root: __dirname
});

var should = chai.should();

describe('KallyRazor', function() {
    describe('throws an error', function() {
        it('when not passing a view', function() { 
            should.Throw(function() { razor.render(); });
        });

        it('when not passing a string to render', function() {
            should.Throw(function() { razor.render({ File: 'test' }); });
        });

        it('when a file does not exist', function() {
            should.Throw(function() { razor.render('file-does-not-exist.html'); });
        });

        it('when a null file name is passed', function() {
            should.Throw(function() { razor.render(); });
        });
    });

    describe('compiles', function() {
        describe('from a file', function() {
            it('using the exact file name', function() {
                var result = razor.render(__dirname + '/input/test-no-razor.html');
                result.should.equal(fs.readFileSync(__dirname + '/output/test-no-razor.html').toString());
            });

            it('using relative file names', function() {
                var result = razor.render('input/test-no-razor.html');
                result.should.equal(fs.readFileSync(__dirname + '/output/test-no-razor.html').toString());
            });
        });

        describe('using razor', function() {
            it('wth a basic model', function() {
                var result = razor.render('input/test-basic-model.html', { name: 'Testy Tester' });
                result.should.equal(fs.readFileSync(__dirname + '/output/test-basic-model.html').toString());
            });

            it('with multiple references', function() {
                var result = razor.render('input/test-multiple-references.html', { name: 'Testy Tester', title: 'my title' });
                result.should.equal(fs.readFileSync(__dirname + '/output/test-multiple-references.html').toString());
            })
        });
    });
});

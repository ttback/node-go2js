var go2js = require("../go.js");

describe('node-go2js', function() {
    describe('#wrap()', function() {
        it('Wrap hello world test', function(done) {
            code = 'fmt.Println("Hello world.")';
            go2js.wrap(code, function(ast) {
                ast.should.be.ok;
                ast["body"].length.should.greaterThan(0, "AST body shouldn't be empty");
                done();
            });
        });

        it('Wrap test with imports', function(done) {
            code = 'fmt.Println("Hello world.")';
            go2js.wrap(code, ["fmt", "math"], function(ast) {
                ast.should.be.ok;
                ast["body"].length.should.greaterThan(0, "AST body shouldn't be empty");
                done();
            });
        });

        it('Wrap test with 3+3', function(done) {
            code = '3+3';
            go2js.wrap(code, function(ast) {
                ast.should.be.ok;
                ast["body"].length.should.greaterThan(0, "AST body shouldn't be empty");
                done();
            });
        });
    });

    describe('#parse()', function() {
        it('Parse hello world test', function(done) {
            code = 'package main\nimport ("fmt")\nfunc main() {\nfmt.Println("Hello world.")\n}';
            go2js.parse(code, function(ast) {
                ast.should.be.ok;
                ast["body"].length.should.greaterThan(0, "AST body shouldn't be empty");
                done();
            });
        });
    });
});

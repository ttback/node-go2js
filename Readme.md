Golang to Mozilla AST Tree Parse Transform
=================================

Goal:
---------
Make Golang usable for online editors and live code teaching platforms like Code School and Code Combat.


Prerequisites:
---------

Go: Download from official go website: http://golang.org/

Go2js: A project compiling Golang to JS with **line to line** (The line number in .go file matches with .js file) matching

Esprima: Build JS AST for the generated JS code.


Usage:
---------

  Node.js
  
  ```Javascript
  var go2js = require("node-go2js");
  
  //Wrap erlang code with: 
  //"-module(tmp).\n-compile({parse_transform, shen}).\n-compile(export_all).\n-js([start/0]).\nstart() ->\n";
  go2js.wrap(code, function(ast) {
        //ast: the js obj holding the AST tree
  });

  //You can also set optional import standard lib names to avoid compile-time errors
  go2js.wrap(code, ["fmt", "math"], function(ast) {
        //ast: the js obj holding the AST tree
  });
  
  //Parse complete erlang code
  go2js.parse(code, function(ast) {
        //ast: the js obj holding the AST tree
  });
  
  ```

  Commandline Options:

    -h, --help           Output usage information
    -V, --version        Output the version number
    -t, --ast            Output JS ast tree
    -o, --output <file>  Output to a JS file to custom location


Install
---------

Run `npm install node-go2js -g`


Not implemented
---------

+ Range with index [startOf, endOf]
+ The multiple assignment has different order of preference than in JS
 (functionInverse in "testdata/func.go" fails due this issue).
+ Evaluation of constants.
+ Shadow variables in JS.
+ Goroutines.
+ Types int64 and complex.


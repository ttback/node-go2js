Golang to Mozilla AST Tree Parse Transform [![Deps](https://david-dm.org/ttback/node-go2js.png)](https://david-dm.org/ttback/node-go2js)
=================================

Goal:
---------
Make Golang usable for online editors and live code teaching platforms like Code School and Code Combat.

Install
---------

[![npm](https://nodei.co/npm/node-go2js.png)](https://npmjs.org/package/node-go2js)


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
  
  If installed globally with `npm install -g node-go2js`, you can use `go2js` command anywhere from your system.
  
  Commandline Options:

    -h, --help           Output usage information
    -V, --version        Output the version number
    -t, --ast            Output JS ast tree
    -o, --output <file>  Output to a JS file to custom location


Not implemented
---------

+ Range with index [startOf, endOf]
+ The multiple assignment has different order of preference than in JS
 (functionInverse in "testdata/func.go" fails due this issue).
+ Evaluation of constants.
+ Shadow variables in JS.
+ Goroutines.
+ Types int64 and complex.


## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var esprima = require('esprima');
var exec = require('exec');
var path = require('path');
var mv = require('mv');

//Config flags
var TMP_GO_FILE_PATH = "./tmp.go";
var INPUT_source_file_path = undefined;
var JS_AST_OUTPUT_ENABLED = false;
var DEFAULT_JS_OUTPUT_DIR_PATH = "./";
var JS_OUTPUT_FILE = undefined;

function ouptutAst() {
    return JS_AST_OUTPUT_ENABLED = true;
}

function outputFile(path) {
    JS_OUTPUT_FILE = path;
}

function parse(code, callback) {
    fs.writeFile(TMP_GO_FILE_PATH, code, function(err) {
        if (err) {
            throw err;
        }

        parseFile(TMP_GO_FILE_PATH, function(ast){
            if (!ast){
                throw new Error("No ast tree was generated");
            }else{
                callback(ast);
            }
        });
    });
}

function wrap(code, imports, callback) {
    var wrap_stmts = [];
    wrap_stmts.push("package main");
    
    if (typeof(imports) == "function"){
        callback = imports;
        wrap_stmts.push('import(' + '"fmt"' + ')');
    }
    
    if (imports instanceof Array){
        var import_strs=imports.length>1 ? '\n"'+ imports.join('"\n"') + '"' : '"'+imports[0] +'"'
        wrap_stmts.push('import(' + import_strs + ')');
    }

    var wrap_prefix = wrap_stmts.join("\n");
    var wrapped_code = wrap_prefix +  '\nfunc main(){\n' + code + '}';
    
    fs.writeFile(TMP_GO_FILE_PATH, wrapped_code, function(err) {
        if (err) throw err;
        parseFile(TMP_GO_FILE_PATH, function(ast){
            if (!ast){
                throw new Error("No ast tree was generated");
            }else{
                callback(ast);
            }
        });
    });
}

function deleteFiles(filename) {
    var jsfile = filename + ".js";
    var beamfile = filename + ".beam";

    if (fs.existsSync(jsfile))
        fs.unlinkSync(jsfile);
    
    if (fs.existsSync(beamfile))
        fs.unlinkSync(beamfile);

    if (fs.existsSync(TMP_GO_FILE_PATH))
        fs.unlinkSync(TMP_GO_FILE_PATH);
}

//Handle user input
program
    .version('0.0.1')
    .option('-t, --ast', 'Output js ast tree', ouptutAst)
    .option('-o, --output <file>', 'Output to js file', outputFile)
    .parse(process.argv);

if (program.args[0]!="test/test.js"){
    if (program.args.length > 0) {
        INPUT_source_file_path = program.args[0];
    } else {
        console.log("Please enter golang file path. i.e. examples/sample.go")
    }
}

function cleanUp(code, filename) {
    deleteFiles(filename);
}

if (INPUT_source_file_path){
    parseFile(INPUT_source_file_path);
}

function parseFile(source_file_path, callback) {
    if (fs.existsSync(source_file_path)) {

        exec(['./deps/go2js', source_file_path], function(err, out, code) {
            if (err instanceof Error)
                throw err;
            process.stderr.write(err);

            var source_full_fileName = path.basename(source_file_path);
            var filename = source_full_fileName.split(".")[0];
            var js_filename = filename + ".js";
            var output_js = DEFAULT_JS_OUTPUT_DIR_PATH + js_filename
            
            fs.writeFile(output_js, out, function(err) {
                if (err) {
                    throw err;
                }
                var jsCode = fs.readFileSync(output_js, "utf8");
                var ast = esprima.parse(jsCode, {
                    loc: true
                });

                if (callback){
                    callback(ast);
                    cleanUp(code, filename);
                }else{
                    if (JS_AST_OUTPUT_ENABLED) {
                        process.stdout.write(JSON.stringify(ast, null, 4));
                    }

                    if (JS_OUTPUT_FILE) {
                        mv(output_js, JS_OUTPUT_FILE, {
                            mkdirp: true
                        }, function(err) {
                            if (err instanceof Error)
                                throw err;
                            cleanUp(code, filename);
                        });
                    } else {
                        cleanUp(code, filename);
                    }
                }
            });
        });
    } else {
        console.log("golang file path is invalid");
    }
}


module.exports={
    parse: parse,
    wrap: wrap
}
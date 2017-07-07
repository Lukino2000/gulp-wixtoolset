"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var child_process_1 = require("child_process");
function candle(files, options, callback) {
    options = __assign({
        stdout: true,
        stderr: true
    }, options || {});
    callback = callback || function (e) { e && console.error(e.toString().trim()); };
    if (!Array.isArray(files) || files.length === 0) {
        callback('files must be an array of input files with at least one element');
        return;
    }
    var exe = path.join(__dirname, '../bin/candle.exe');
    var args = files.slice();
    if (options.useUI)
        args.push('-ext', 'WixUIExtension');
    if (options.useFirewall)
        args.push('-ext', 'WixFirewallExtension');
    if (options.outputDirectory)
        args.push('-o', path.normalize(options.outputDirectory) + path.sep);
    if (options.logCommand)
        console.log('Executing:', exe, args.join(' '));
    myspawn(exe, args, callback, !!options.stdout, !!options.stderr);
}
exports.candle = candle;
function light(files, outputFile, options, callback) {
    options = __assign({
        stdout: true,
        stderr: true
    }, options || {});
    callback = callback || function (e) { e && console.error(e.toString().trim()); };
    if (!Array.isArray(files) || files.length === 0) {
        callback('files must be an array of input files with at least one element');
        return;
    }
    var exe = path.join(__dirname, '../bin/light.exe');
    var args = files.concat([
        '-o',
        outputFile
    ]);
    if (options.useUI)
        args.push('-ext', 'WixUIExtension');
    if (options.useFirewall)
        args.push('-ext', 'WixFirewallExtension');
    if (options.sourceDirectory)
        args.push('-b', options.sourceDirectory);
    if (options.logCommand)
        console.log('Executing:', exe, args.join(' '));
    myspawn(exe, args, callback, !!options.stdout, !!options.stderr);
}
exports.light = light;
function harvestDirectory(inputDirectory, outputFile, options, callback) {
    options = __assign({
        stdout: true,
        stderr: true
    }, options || {});
    callback = callback || function (e) { e && console.error(e.toString().trim()); };
    var exe = path.join(__dirname, '../bin/heat.exe');
    var args = [
        'dir',
        inputDirectory,
        '-o',
        outputFile
    ];
    if (options.suppressFragment)
        args.push('-sfrag');
    if (options.compileTimeGuid)
        args.push('-ag');
    if (options.generateGuid)
        args.push('-gg');
    if (options.suppressBrackets)
        args.push('-g1');
    if (options.suppressRegistryInfo)
        args.push('-sreg');
    if (options.suppressCOMInfo)
        args.push('-scom');
    if (options.indent)
        args.push('-indent', options.indent.toString());
    if (options.suppressId)
        args.push('-suid');
    if (options.suppressRoot)
        args.push('-srd');
    if (options.directoryName)
        args.push('-dr', options.directoryName);
    if (options.componentGroup)
        args.push('-cg', options.componentGroup);
    if (options.transformFile)
        args.push('-t', options.transformFile);
    if (options.logCommand)
        console.log('Executing:', exe, args.join(' '));
    myspawn(exe, args, callback, !!options.stdout, !!options.stderr);
}
exports.harvestDirectory = harvestDirectory;
function myspawn(exe, args, callback, stdout, stderr) {
    var spawnOptions = { env: process.env };
    var child = child_process_1.spawn(exe, args, spawnOptions);
    child.stdout.on('data', function (data) {
        stdout && console.log(data.toString().trim());
    });
    child.stderr.on('data', function (data) {
        stderr && console.error(data.toString().trim());
    });
    child.on('exit', function (code) {
        if (code !== 0)
            callback('process exited with error code = ' + code);
        else
            callback();
    });
}

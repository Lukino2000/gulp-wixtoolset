import * as path from 'path'
import { existsSync } from 'fs'
import { spawn } from 'child_process'

import * as TYPES from './types'

export function candle(files: Array<string>, options?: TYPES.CandleOptions, callback?: TYPES.Callback) {
  options = {
    ...{
      stdout: true,
      stderr: true
    }, ...options || {}
  }
  callback = callback || function (e) { e && console.error(e.toString().trim()) }

  if (!Array.isArray(files) || files.length === 0) {
    callback('files must be an array of input files with at least one element')
    return
  }

  let exe: string = path.join(__dirname, '../bin/candle.exe')
  let args: Array<string> = [...files]

  if (options.useUI) args.push('-ext', 'WixUIExtension')
  if (options.useFirewall) args.push('-ext', 'WixFirewallExtension')
  if (options.outputDirectory) args.push('-o', path.normalize(options.outputDirectory) + path.sep)

  if (options.logCommand)
    console.log('Executing:', exe, args.join(' '))

  myspawn(exe, args, callback, !!options.stdout, !!options.stderr)
}

export function light(files: Array<string>, outputFile: string, options: TYPES.LightOptions, callback?: TYPES.Callback) {
  options = {
    ...{
      stdout: true,
      stderr: true
    }, ...options || {}
  }
  callback = callback || function (e) { e && console.error(e.toString().trim()) }

  if (!Array.isArray(files) || files.length === 0) {
    callback('files must be an array of input files with at least one element')
    return
  }

  let exe: string = path.join(__dirname, '../bin/light.exe')
  let args: Array<string> = [
    ...files,
    '-o',
    outputFile
  ]

  if (options.useUI) args.push('-ext', 'WixUIExtension')
  if (options.useFirewall) args.push('-ext', 'WixFirewallExtension')
  if (options.sourceDirectory) args.push('-b', options.sourceDirectory)

  if (options.logCommand)
    console.log('Executing:', exe, args.join(' '))
    
  myspawn(exe, args, callback, !!options.stdout, !!options.stderr)
}

export function harvestDirectory(inputDirectory: string, outputFile: string, options: TYPES.HeatOptions, callback?: TYPES.Callback) {
  options = {
    ...{
      stdout: true,
      stderr: true
    }, ...options || {}
  }
  callback = callback || function (e) { e && console.error(e.toString().trim()) }

  let exe: string = path.join(__dirname, '../bin/heat.exe')
  let args: Array<string> = [
    'dir',
    inputDirectory,
    '-o',
    outputFile
  ]

  if (options.suppressFragment) args.push('-sfrag')
  if (options.compileTimeGuid) args.push('-ag')
  if (options.generateGuid) args.push('-gg')
  if (options.suppressBrackets) args.push('-g1')
  if (options.suppressRegistryInfo) args.push('-sreg')
  if (options.suppressCOMInfo) args.push('-scom')
  if (options.indent) args.push('-indent', options.indent.toString())
  if (options.suppressId) args.push('-suid')
  if (options.suppressRoot) args.push('-srd')
  if (options.directoryName) args.push('-dr', options.directoryName)
  if (options.componentGroup) args.push('-cg', options.componentGroup)
  if (options.transformFile) args.push('-t', options.transformFile)

  if (options.logCommand)
    console.log('Executing:', exe, args.join(' '))

  myspawn(exe, args, callback, !!options.stdout, !!options.stderr)
}


function myspawn(exe: string, args: Array<string>, callback: TYPES.Callback, stdout: boolean, stderr: boolean) {
  var spawnOptions = { env: process.env }
  var child = spawn(exe, args, spawnOptions)

  child.stdout.on('data', function (data) {
    stdout && console.log(data.toString().trim())
  })

  child.stderr.on('data', function (data) {
    stderr && console.error(data.toString().trim())
  })

  child.on('exit', function (code) {
    if (code !== 0) callback('process exited with error code = ' + code)
    else callback()
  })
}
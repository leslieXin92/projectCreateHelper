#!/usr/bin/env node
const { Command } = require('commander')
const cabbage = require('./lib/core/cabbage')
const versionOptions = require('./lib/core/version')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

const program = new Command()

// 猫爪印
cabbage(program)

// 查看版本号
versionOptions(program)

// 帮助面板
helpOptions(program)

// create模块
createCommands(program)

program.parse(process.argv)

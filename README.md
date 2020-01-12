# ko

A project scaffolding CLI for the web

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@prismify/ko.svg)](https://npmjs.org/package/@prismify/ko)
[![Downloads/week](https://img.shields.io/npm/dw/@prismify/ko.svg)](https://npmjs.org/package/@prismify/ko)
[![License](https://img.shields.io/npm/l/@prismify/ko.svg)](https://github.com/prismify-co/ko/blob/master/package.json)

<!-- toc -->
* [ko](#ko)
* [About](#about)
* [ko.config.yml](#koconfigyml)
* [Limitations](#limitations)
* [Roadmap](#roadmap)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# About

ko is a project scaffolding tool that is meant to easily create or clone projects like Nuxt.js, Next.js, and Sapper.

### Example

1. Create the project

```bash
ko create
```

# Roadmap

- Support other projects like Next.js and Sapper
- Support ko tasks (see About)
- Support initialization of Git and Docker

# Usage

<!-- usage -->
```sh-session
$ npm install -g @prismify/ko
$ ko COMMAND
running command...
$ ko (-v|--version|version)
@prismify/ko/0.0.5 darwin-x64 node-v13.1.0
$ ko --help [COMMAND]
USAGE
  $ ko COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`ko clone REPOSITORY [DESTINATION]`](#ko-clone-repository-destination)
* [`ko create [NAME]`](#ko-create-name)
* [`ko create:next [NAME]`](#ko-createnext-name)
* [`ko create:nuxt [NAME]`](#ko-createnuxt-name)
* [`ko help [COMMAND]`](#ko-help-command)
* [`ko run`](#ko-run)

## `ko clone REPOSITORY [DESTINATION]`

clone an existing project

```
USAGE
  $ ko clone REPOSITORY [DESTINATION]

ARGUMENTS
  REPOSITORY   The repository url (e.g. org/repo, github:org/repo)
  DESTINATION  The destination to clone (optional)
```

_See code: [src/commands/clone.ts](https://github.com/prismify-co/ko/blob/v0.0.5/src/commands/clone.ts)_

## `ko create [NAME]`

create a new project

```
USAGE
  $ ko create [NAME]

ARGUMENTS
  NAME  name of the project

OPTIONS
  -f, --framework=nuxt|sapper|next
  -v, --version=version             [default: latest]
```

_See code: [src/commands/create.ts](https://github.com/prismify-co/ko/blob/v0.0.5/src/commands/create.ts)_

## `ko create:next [NAME]`

create a new next project

```
USAGE
  $ ko create:next [NAME]

ARGUMENTS
  NAME  name of the project

OPTIONS
  -v, --version=version  [default: latest]
```

_See code: [src/commands/create/next.ts](https://github.com/prismify-co/ko/blob/v0.0.5/src/commands/create/next.ts)_

## `ko create:nuxt [NAME]`

create a new nuxt project

```
USAGE
  $ ko create:nuxt [NAME]

ARGUMENTS
  NAME  name of the project

OPTIONS
  -v, --version=version  [default: latest]
```

_See code: [src/commands/create/nuxt.ts](https://github.com/prismify-co/ko/blob/v0.0.5/src/commands/create/nuxt.ts)_

## `ko help [COMMAND]`

display help for ko

```
USAGE
  $ ko help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `ko run`

start the configuration process

```
USAGE
  $ ko run
```

_See code: [src/commands/run.ts](https://github.com/prismify-co/ko/blob/v0.0.5/src/commands/run.ts)_
<!-- commandsstop -->

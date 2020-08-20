import { mkdir, rm } from 'shelljs'
import { join } from 'path'
import pkgm from '@ko/package-manager'
import Steps from '@ko/steps'
import Executor from '..'
import { exists, read, write } from '@ko/utils/fs'
import git from 'simple-git'
import { visit } from 'recast'

const OUTPUT_DIR = join(__dirname, 'output')
const NPM_DIR = join(OUTPUT_DIR, 'npm')
const FILE_DIR = join(OUTPUT_DIR, 'file')
const TRANSFORM_DIR = join(OUTPUT_DIR, 'transform')
const FIXTURES_DIR = join(__dirname, '__fixtures__')

describe('packages/executor', () => {
  beforeAll(() => {
    if (exists(OUTPUT_DIR)) {
      rm('-rf', OUTPUT_DIR)
    }

    mkdir('-p', OUTPUT_DIR)
    mkdir('-p', NPM_DIR)
    mkdir('-p', FILE_DIR)
    mkdir('-p', TRANSFORM_DIR)
  })
  beforeEach(() => process.chdir(OUTPUT_DIR))

  describe('addDependencyStep', () => {
    beforeAll(async () => {
      process.chdir(NPM_DIR)
      await git().init()
      await pkgm().init()
    })
    beforeEach(() => {
      process.chdir(NPM_DIR)
    })

    it('should install an npm package', async () => {
      const steps = new Steps()
      steps.addDependencyStep({
        name: 'dependency',
        packages: ['react'],
      })

      const executor = new Executor(steps.steps, { cwd: NPM_DIR })

      const startListener = jest.fn()
      const endListener = jest.fn()

      executor.subscribeOnce('start', startListener)
      executor.subscribeOnce('end', endListener)

      await executor.run()

      expect(startListener).toHaveBeenCalledTimes(1)
      expect(endListener).toHaveBeenCalledTimes(1)

      executor.unsubscribeAll()
      expect(exists(join(NPM_DIR, 'node_modules')))
    })
  })

  describe('addFileStep', () => {
    beforeAll(async () => {
      process.chdir(FIXTURES_DIR)
      await git().init()
    })

    it('should copy and interpolate file to target path', async () => {
      const steps = new Steps()

      steps.addFileStep({
        name: 'Copy and interpolate file',
        path: join(FIXTURES_DIR, 'test.txt'),
        target: FILE_DIR,
        context: {
          name: 'John Doe',
        },
      })

      const executor = new Executor(steps.steps, { cwd: FILE_DIR })

      const startListener = jest.fn()
      const endListener = jest.fn()

      executor.subscribeOnce('start', startListener)
      executor.subscribeOnce('end', endListener)

      await executor.run()

      expect(startListener).toHaveBeenCalledTimes(1)
      expect(endListener).toHaveBeenCalledTimes(1)

      executor.unsubscribeAll()
      expect(exists(join(FILE_DIR, 'test.txt'))).toEqual(true)
      expect(read(join(FILE_DIR, 'test.txt'))).toContain('John Doe')
    })

    it('should copy and interpolate multiple files to target path', async () => {
      const steps = new Steps()

      steps.addFileStep({
        name: 'Copy and interpolate file',
        path: join(FIXTURES_DIR, 'multi-file', '*.txt'),
        target: join(FILE_DIR, 'multi-file'),
        context: {
          name: 'John Doe',
        },
      })

      const executor = new Executor(steps.steps, { cwd: FILE_DIR })

      const startListener = jest.fn()
      const endListener = jest.fn()

      executor.subscribeOnce('start', startListener)
      executor.subscribeOnce('end', endListener)

      await executor.run()

      expect(startListener).toHaveBeenCalledTimes(1)
      expect(endListener).toHaveBeenCalledTimes(1)

      executor.unsubscribeAll()
      const files = ['a.txt', 'b.txt', 'c.txt']
      for (const file of files) {
        expect(exists(join(FILE_DIR, 'multi-file', file))).toEqual(true)
        expect(read(join(FILE_DIR, 'multi-file', file))).toContain('John Doe')
      }
    })
  })

  describe('addTransformStep', () => {
    beforeAll(() => {
      const file = join(TRANSFORM_DIR, 'test.txt')
      if (exists(file)) {
        rm('-f', file)
      }
      process.chdir(TRANSFORM_DIR)
      write(file, `const a = 1`)
    })

    it('should transform the file', async () => {
      const steps = new Steps()

      steps.addTransformStep({
        name: 'Transform file',
        files: [join(TRANSFORM_DIR, 'test.txt')],
        transform(ast) {
          visit(ast, {
            visitIdentifier(path) {
              if (path.node.name === 'a') {
                path.node.name = 'b'
              }
              return false
            },
          })
          return ast
        },
      })

      const executor = new Executor(steps.steps, { cwd: TRANSFORM_DIR })

      const startListener = jest.fn()
      const endListener = jest.fn()

      executor.subscribeOnce('start', startListener)
      executor.subscribeOnce('end', endListener)

      await executor.run()

      expect(startListener).toHaveBeenCalledTimes(1)
      expect(endListener).toHaveBeenCalledTimes(1)

      executor.unsubscribeAll()

      expect(read(join(TRANSFORM_DIR, 'test.txt'))).toEqual(`const b = 1`)
    })
  })
})

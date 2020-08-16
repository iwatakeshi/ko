import { Transformer } from '@ko/transformer/types'
import { NPMPackage } from '@ko/package-manager/types'

interface Context {
  [x: string]: string | number | boolean | Context
}

export interface ExecutorConfig {
  // id: string | number
  name: string
  type: 'dependency' | 'transform' | 'file'
  // a bit to display to the user to give context to the change
  explanation: string
}
export interface DependencyConfig extends ExecutorConfig {
  packages: (string | NPMPackage)[]
}

export interface FileConfig extends ExecutorConfig {
  /**
   * The target directory
   */
  target: string
  /**
   * The path of the template file
   */
  path: string
  /**
   * The handlebar context values
   */
  context?: Context
}

export interface TransformConfig extends ExecutorConfig {
  files: string[]
  transform: Transformer
}

export type StepsConfig =
  | ExecutorConfig
  | DependencyConfig
  | FileConfig
  | TransformConfig

export interface RecipeMeta {
  name: string
  description: string
  owner: string
  repo: RepoMeta
}

export interface RepoMeta {
  link: string
}
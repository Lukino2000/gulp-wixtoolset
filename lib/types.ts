export declare type Callback = (e?: Error | string) => void

export interface CandleOptions {
  stdout?: boolean,
  stderr?: boolean,
  logCommand?: boolean,
  outputDirectory?: string,
  useUI?: boolean,
  useFirewall?: boolean,
}

export interface HeatOptions {
  stdout?: boolean,
  stderr?: boolean,
  logCommand?: boolean,
  suppressFragment?: boolean,
  compileTimeGuid?: boolean,
  generateGuid?: boolean,
  suppressBrackets?: boolean,
  suppressRegistryInfo?: boolean,
  suppressCOMInfo?: boolean,
  indent?: number,
  suppressId?: boolean,
  suppressRoot?: boolean,
  directoryName?: string,
  componentGroup?: string,
  transformFile?: string,
}

export interface LightOptions {
  stdout?: boolean,
  stderr?: boolean,
  logCommand?: boolean,
  useUI?: boolean,
  useFirewall?: boolean,
  sourceDirectory?:string,
}
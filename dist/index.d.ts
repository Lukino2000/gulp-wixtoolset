import * as TYPES from './types';
export declare function candle(files: Array<string>, options?: TYPES.CandleOptions, callback?: TYPES.Callback): void;
export declare function light(files: Array<string>, outputFile: string, options: TYPES.LightOptions, callback?: TYPES.Callback): void;
export declare function harvestDirectory(inputDirectory: string, outputFile: string, options: TYPES.HeatOptions, callback?: TYPES.Callback): void;

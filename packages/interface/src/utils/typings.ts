export enum IUrlOptions {
  COLLECT_DATA = "collect-data",
  ANALYZE_DATA = "analyze-data",
  HOME = "home"
}

export interface IRouteOption {
  url: IUrlOptions;
}

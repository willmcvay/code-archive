export interface IStringMapToPromiseList {
  [key: string]: () => Promise<any>[]
}

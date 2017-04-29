export interface IStringMapToPromise {
  [key: string]: () => Promise<any>
}

export interface IStringMapToString {
  [key: string]: string
}

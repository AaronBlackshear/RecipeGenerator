type DataType =
  "bigint" |
  "boolean" |
  "function" |
  "number" |
  "object" |
  "string" |
  "symbol" |
  "undefined";

export function isArrayOf(data: any, dataType: DataType): boolean {
  return !!(
    Array.isArray(data) && data.every(value => typeof value === dataType)
  )
}
// @flow
export interface PropertyDescriptor {
  value?: any,
  initializer?: () => any,
  enumerable?: boolean,
  configurable?: boolean,
  writable?: boolean,
}
/** @format */
// @flow
// const Location = {
//   replace: 'Function',
//   assign: 'Function',
//   href: 'String',
//   ancestorOrigins: 'DOMStringList',
//   origin: 'String',
//   protocol: 'String',
//   host: 'String',
//   hostname: 'String',
//   port: 'String',
//   pathname: 'String',
//   search: 'String',
//   hash: 'String',
//   reload: 'Function',
//   toString: 'Function',
// }
type iURL = URL | string

export interface iLocation {
  replace(url: iURL): void;
  assign(url: iURL): void;
  reload(): void;
  href: string;
  ancestorOrigins: string[];
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  hash: string;
}

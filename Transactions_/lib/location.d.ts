/** @format */

type iURL = URL | DOMStringList | string

export interface iLocation {
  replace(url: iURL): void
  assign(url: DOMStringList): void
  reload(): void
  href: string
  ancestorOrigins: string[]
  origin: string
  protocol: string
  host: string
  hostname: string
  port: string
  pathname: string
  hash: string
}

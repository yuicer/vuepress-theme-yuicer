export const outboundRE = /^[a-z]+:/i

export function isExternal(path) {
  return outboundRE.test(path)
}

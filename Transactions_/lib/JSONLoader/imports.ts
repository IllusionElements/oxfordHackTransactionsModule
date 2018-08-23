/** @format */

export const importJSON = async (path: string[]) => {
  const fullPath = path.join('/')
  const json = (await fullPath.includes('.json')) ? import(fullPath) : import(`${fullPath}.json`)

  return { json: JSON.stringify(json) }
}

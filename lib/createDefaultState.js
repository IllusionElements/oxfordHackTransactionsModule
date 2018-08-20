/** @format */
// @flow
export const createDefaultState = (...fields: string[]) => (...values: any[]) =>
  fields.reduce(
    (state, field, index) => ({
      ...state,
      [field]: values[index],
    }),
    {}
  )

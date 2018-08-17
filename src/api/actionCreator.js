// @flow

export default (...actionNames: string[]) => (...actions: Array<{}>) => actionNames.reduce((action, actionName: string, i: number) => ({
  ...action,
  [actionName]: {
    type: actionName,
    payload: {
      ...actions[i]
    }
  }
}), {})
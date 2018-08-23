/** @format */

import { Component, ComponentType } from 'react'
import { EJSON } from 'meteor/ejson'
import invariant from 'invariant'
import { importJSON } from './imports'

const isValidEJSON = (value: any) => {
  try {
    return EJSON.parse(value)
  } catch (e) {}
  return false
}

const isEJSONDifferent = (a: string, b: string): boolean => {
  const A = EJSON.parse(a)
  const B = EJSON.parse(b)
  return !EJSON.equals(A, B)
}

interface JSONLoaderProps<JSONShape, P extends object = {}> {
  path?: string[]
  data?: string
  children(props: JSONShape & P): ComponentType<JSONShape & P>
}

interface JSONLoaderState<T> {
  json: T | object
}

export default class JSONLoader<Props extends object, DataShape> extends Component<
  JSONLoaderProps<DataShape, Props>,
  JSONLoaderState<DataShape>
  > {
  state = {
    json: {},
  }

  componentDidMount() {
    const { path, data } = this.props
    invariant(
      (data && !path) || (path && !data),
      'data and path cannot both be defined, either define a path to a json file or a pass a json string to data',
    )

    invariant(data || path, 'data OR path must be defined')
    if (path && !data) {
      (async () => {
        const { json: js } = await importJSON(path)
        const json = JSON.parse(js)

        this.setState({ json })
      })()
    } else if (data && !path) {
      this.setState({
        json: JSON.parse(data) as DataShape,
      })
    }
  }

  shouldComponentUpdate(prevProps: JSONLoaderProps<DataShape, Props>) {
    const { data: prevData = null, path: prevPath = null } = prevProps
    const { data = null, path = null } = this.props
    if(prevData && data) {
      return isValidEJSON(prevData) && isValidEJSON(data)
        ? isEJSONDifferent(prevData, data)
        : false
    }

    if(path && prevPath) {
      return path !== prevPath
    }

    return true
  }

  render() {
    const { data, path, ...props } = this.props
    const { json } = this.state
    return (this.props.children as any)({
      ...props,
      ...json
    })
  }
}

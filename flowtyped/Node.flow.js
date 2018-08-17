/** @format */

import type { Node as ReactNode, ComponentType } from 'react'

export type Node<P: {}> = ReactNode | ((...args: mixed[]) => ComponentType<P>)

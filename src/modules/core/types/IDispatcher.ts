import React from 'react'
import IEvent from './IEvent'

type IDispatcher<State> = React.Dispatch<IEvent<State>>;

export default IDispatcher
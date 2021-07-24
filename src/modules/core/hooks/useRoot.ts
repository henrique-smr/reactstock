import React from 'react'
import IDispatcher from '../types/IDispatcher'
import IRootState from '../types/IRootState'

import {RootStateContext, RootDispatchContext} from '../Provider'

export default function useRoot():[IRootState,IDispatcher<IRootState>]
{
	const state = React.useContext(RootStateContext);
	const dispatch = React.useContext(RootDispatchContext);
	return [state,dispatch]
}
import React from 'react'
import IDispatcher from '../types/IDispatcher'
import IRootDomains from '../types/IRootDomains'

import {DomainStateContext, DomainDispatchContext} from '../Provider'


export default function useDomains():[IRootDomains, IDispatcher<IRootDomains>]
{
	const state = React.useContext(DomainStateContext);
	const dispatch = React.useContext(DomainDispatchContext);
	return [state,dispatch]
}
import IRootState from '../types/IRootState'
import IEvent from '../types/IEvent'

import {ACTIONS} from '../consts'

import resolveDependencies from '../utils/resolveDependencies'

export default function RESOLVE_DEPENDENCIES() :IEvent<IRootState>{
	return ({dispatch,state})=>{
		const resolve_stack = resolveDependencies(state._resolve_);
		dispatch({
			domain:'root',
			type:ACTIONS.SET_RESOLVE_STACK,
			payload:resolve_stack
		})
	}
}
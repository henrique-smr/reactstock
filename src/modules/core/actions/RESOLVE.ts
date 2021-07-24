import IRootState from '../types/IRootState'
import IEvent from '../types/IEvent'

import {ACTIONS} from '../consts'

import RESOLVE_SUCCESS from './RESOLVE_SUCCESS';
import RESOLVE_FAILED from './RESOLVE_FAILED';
import UNSHIFT_ERROR from './UNSHIFT_ERROR';

import resolveDomain from '../utils/resolveDomain'

export default function RESOLVE():IEvent<IRootState> {
	return async ({state,dispatch,services,domainsDispatch}) => {
		const newStack = [...state._resolve_stack_];
		const node = newStack.shift();

		if(!node && newStack.length === 0)
		{
			if(state._errors_.length !> 0)
				dispatch(RESOLVE_SUCCESS())
			else
				dispatch(RESOLVE_FAILED())
			return
		}

		try {
			await resolveDomain(node.resolve,{state:state._domains_,services,dispatch:domainsDispatch});
		}
		catch(error)
		{
			console.error(error)
			if(!node.isCatchable)
				dispatch(UNSHIFT_ERROR(error))
		}

		dispatch({
			domain:'root',
			type:ACTIONS.SET_RESOLVE_STACK,
			payload:newStack
		})
	}
}

import React from 'react';

import useRoot from './useRoot'


import RESOLVE_STARTED from '../actions/RESOLVE_STARTED'
import RESOLVE_DEPENDENCIES from '../actions/RESOLVE_DEPENDENCIES'
import RESOLVE_BUILDING from '../actions/RESOLVE_BUILDING'
import RESOLVE from '../actions/RESOLVE'
import LOADED from '../actions/LOADED'

import {STATUS} from '../consts'

export default function useResolveInit():void {
	const [root,dispatch] = useRoot()


	React.useEffect(() => {

		switch (root._status_) {
			case STATUS.INIT_SUCCESS:
				dispatch(RESOLVE_STARTED())
				dispatch(RESOLVE_DEPENDENCIES());
				dispatch(RESOLVE_BUILDING());
				break;


			case STATUS.INIT_FAILED:
				var errorStack = [...root._errors_];
				errorStack.unshift(new Error("Um ou mais erros ocorreram na inicialização estados"))
				throw errorStack;


			case STATUS.RESOLVE_SUCCESS:
				dispatch(LOADED());
				break;

			case STATUS.RESOLVE_FAILED:
				var errorStack = [...root._errors_];
				errorStack.unshift(new Error("Um ou mais erros ocorreram no processo de resolução dos estados"))
				throw errorStack;


			default:
				break;
		}

	}, [root._status_])

	React.useEffect(() => {
		if (root._status_ === STATUS.RESOLVE_BUILDING) {
			dispatch(RESOLVE())
		}
	}, [root._resolve_stack_, root._status_])
}
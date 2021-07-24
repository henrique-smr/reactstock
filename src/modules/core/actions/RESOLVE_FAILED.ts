import IRootState from '../types/IRootState'
import IEvent from '../types/IEvent'

import {ACTIONS,STATUS} from '../consts'

export default function RESOLVE_FAILED():IEvent<IRootState>{
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.RESOLVE_FAILED
		})
	}
}

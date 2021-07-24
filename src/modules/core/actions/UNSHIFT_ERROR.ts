import IRootState from '../types/IRootState'
import IEvent from '../types/IEvent'

import {ACTIONS} from '../consts'

export default function UNSHIFT_ERROR(error:any) :IEvent<IRootState>{
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.UNSHIFT_ERROR,
			payload:error
		})
	}
}

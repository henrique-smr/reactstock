import {STATUS} from '../consts';
import IRootState from '../types/IRootState'

export default function getInitialRootState():IRootState {
	return {
		_domains_:{},
		_reducers_:{},
		_resolve_:{},
		_effects_:{},
		_resolve_stack_:[],
		_status_:STATUS.PRE_RUN,
		_errors_:[],
	}
}
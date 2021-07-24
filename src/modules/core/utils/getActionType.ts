import {IActionType} from '../types/IAction'

import {ERRORS} from '../consts';

export default function getActionType(type:IActionType):IActionType {
	if(typeof type !== 'string' && typeof type !== 'symbol')
		throw ERRORS.BAD_ACTION_TYPE;
	return type;
}

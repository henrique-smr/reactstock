import {IActionDomain,IActionType} from '../types/IAction'

export default function getDomainsAndActionTypeFromString(str:IActionDomain):[IActionDomain,IActionDomain,IActionType] {
	if(typeof str !== 'string')
		throw 'Esperado string como argumento em getDomainsAndActionTypeFromString'
	const path = str.split('/');
	return [path[0], path.slice(1,-1), path[path.length - 1]];	
}
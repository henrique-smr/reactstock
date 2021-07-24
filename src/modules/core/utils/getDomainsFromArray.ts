import {IActionDomain} from '../types/IAction'

import {ERRORS} from '../consts'

export default function getDomainsFromArray(array:IActionDomain):[IActionDomain,IActionDomain] {
	var rootDomain, subDomains

	if(!Array.isArray(array))
		throw 'Esperado string como argumento em getDomainsFromArray'

	if(array.some(v=>typeof v !== 'string'))
		throw ERRORS.BAD_ACTION_DOMAIN;

	[rootDomain, ...subDomains] = array;

	return [rootDomain, subDomains]
}

import {IActionDomain} from '../types/IAction'


export default function getDomainsFromString(str:IActionDomain):[IActionDomain,IActionDomain] {
	var rootDomain, subDomains
	if(typeof str !== 'string')
		throw 'Esperado string como argumento em getDomainsFromString'

	const path = str.split('/');
	[rootDomain, ...subDomains] = path;
	return [rootDomain, subDomains]
}
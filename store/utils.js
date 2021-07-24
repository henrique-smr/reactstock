import {ERRORS,STATUS} from './consts';

export function getActionType(type) {
	if(typeof type !== 'string' && typeof type !== 'symbol')
		throw ERRORS.BAD_ACTION_TYPE;
	return type;
}

export function getDomainsFromString(str) {
	var rootDomain, subDomains
	const path = str.split('/');
	[rootDomain, ...subDomains] = path;
	return [rootDomain, subDomains]
}

export function getDomainsFromArray(array) {
	var rootDomain, subDomains

	if(array.some(v=>typeof v !== 'string'))
		throw ERRORS.BAD_ACTION_DOMAIN;

	[rootDomain, ...subDomains] = array;

	return [rootDomain, subDomains]
}

export function getDomainsAndActionTypeFromString(str) {
	const path = str.split('/');
	return [path[0], path.slice(1,-1), path[path.length - 1]];	
}

export async function resolveDomain(resolve, {state, services, dispatch}) {
	if(resolve === null || resolve === undefined)
		return state;

	switch(resolve.constructor.name)
	{
		case 'AsyncFunction':
		case 'Function':
			return await resolve({state, services, dispatch});
		case 'Promise':
			return await resolve;
		case 'Object':
			return dispatch(resolve);
		default:
			return state;
	}
}

export function resolveDependencies(tree) {
	const visited = new Map();
	const ctrlList = [];
	const stack = [];

	const _keys = Object.entries(tree)
		.sort(([,A],[,B])=>{
			if(!Array.isArray(A.dependencies))
				return -1;
			else if(!Array.isArray(B.dependencies))
				return 1;
			else
				return A.dependencies.length - B.dependencies.length
		}).map(([k,v])=>k);

	var _index = 0;

	ctrlList.push(tree[_keys[_index]]);


	function cycle() {
		while(ctrlList.length > 0)
		{
			const node = ctrlList.pop();

			if(node && ! visited.has(node))
			{
				visited.set(node)
				if (Array.isArray(node.dependencies))
				{
					for (const dependency of node.dependencies) {
						if(!_keys.includes(dependency))
							throw new Error(`Dependencia ${dependency} não é um domínio definido`);

						ctrlList.push(tree[dependency])
					}
					cycle()
				}
				stack.push(node)
				if(ctrlList.length==0 && _index !== _keys.length-1)
					ctrlList.push(tree[_keys[++_index]]);
			}
		}
	}

	cycle()
	return stack;
}
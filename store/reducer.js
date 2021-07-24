import {ACTIONS,ERRORS} from './consts'

import {getActionType, getDomainsFromString, getDomainsFromArray, getDomainsAndActionTypeFromString} from './utils';


export default function rootReducer(state,action) {
	const {type, payload, domain} = action;

	
	
	var rootDomain, subDomains, actionType;
	
	if(typeof domain === 'string')
	{
		[rootDomain, subDomains] = getDomainsFromString(domain);
		actionType = getActionType(type);
	}
	else if(Array.isArray(domain))
	{
		[rootDomain, subDomains] = getDomainsFromArray(domain);
		actionType = getActionType(type);
	}
	else if(typeof type === 'string')
	{
		[rootDomain, subDomains, actionType] = getDomainsAndActionTypeFromString(type)
	}
	else
	{
		throw ERRORS.ACTION_MUST_HAVE_SOME_DOMAIN;
	}
	
	
	(process.env.NODE_ENV == "development") && logEvent();
	
	switch(rootDomain)
	{
		case 'root':
		{
				
			switch(actionType)
			{ 
				
				case ACTIONS.SET_STATUS:
					return {
						...state,
						_status_:payload
					}
				case ACTIONS.SET_RESOLVE_STACK:
				{
					return {
						...state,
						_resolve_stack_:[...payload]
					}
				}
				case ACTIONS.SET_EFFECT_STACK:
				{
					return {
						...state,
						_effect_stack_:[...payload]
					}
				}
				case ACTIONS.UNSHIFT_ERROR:
				{
					return {
						...state,
						_errors_:[...state._errors_, payload]
					}
				}
				default:
					return state;
			}
		}
		default:
		{

			if(rootDomain in state._domains_)
			{
				const subDomainAction = {
					type:[...subDomains, actionType],
					payload:payload
				}
				return {
					...state,
					_domains_:{
						...state._domains_,
						[rootDomain]:state._reducers_[rootDomain](state._domains_[rootDomain],subDomainAction)
					}
				}
			}
			else throw new Error(`O domínio específicado não existe: '${rootDomain}'. Esperado um de [${Object.keys(state._domains_)}] `);
		}
	}


	function logEvent() {
		var path = rootDomain;
		if(subDomains.length>0)
			path = [path, ...subDomains].join('.');

		const actionTypeStr = actionType.toString().replace('Symbol(','').replace(')','');
		if(rootDomain === 'root')
			console.debug(`[${path}.${actionTypeStr}]:`, {payload, state});
		else
			console.log(`[${path}.${actionTypeStr}]:`, { payload, state });
	}
}
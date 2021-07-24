import React from 'react'

import {STATUS} from 'modules/core/consts'
import Provider,{ProviderProps} from 'modules/core/Provider'
import Controller from 'modules/core/Controller'

import useDomains from 'modules/core/hooks/useDomains'
import useRoot from 'modules/core/hooks/useRoot'


export function Store ({domains, children, providers}:ProviderProps):JSX.Element
{
	return (
		<Provider domains={domains} providers={providers}>
			<Controller>
				{children}
			</Controller>
		</Provider>
	)
}

export function useStore(domain:string) {
	const [state, dispatch ] = useDomains()
	if(state === undefined || dispatch === undefined)
		throw "useStore deve ser filho de um <Store> component"

	if(domain)
	{
		if(!(domain in state))
			throw new Error("O caminho específicado em useStore é inválido.");
		return [state[domain],dispatch]
	}
	else
		return [state,dispatch]
	
}

export function useStoreStatus() {
	const [{_status_}] = useRoot();

	switch(_status_)
	{
		case STATUS.LOADED:
			return 'loaded';
		case STATUS.INIT_FAILED:
		case STATUS.RESOLVE_FAILED:
			return 'failed';
		default:
			return 'loading';
	}
}
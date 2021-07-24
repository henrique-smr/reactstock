import React from 'react';
import IDomain from './types/IDomain'
import IRootState from './types/IRootState'
import IRootDomains from './types/IRootDomains'
import IDispatcher from './types/IDispatcher'

import rootInitializer from './rootInitializer'
import rootReducer from './rootReducer'
import DispatcherFactory from './DispatcherFactory'

export const RootStateContext = React.createContext({} as IRootState)
export const RootDispatchContext = React.createContext({} as IDispatcher<IRootState>);
export const DomainStateContext = React.createContext({} as IRootDomains);
export const DomainDispatchContext = React.createContext({} as IDispatcher<IRootDomains>);

export interface ProviderProps{
	providers:{[key:string]:any},
	children:React.ReactNode,
	domains:Array<IDomain>
}

export default function Provider({children, domains,providers}:ProviderProps):JSX.Element {

	const [root, rootBasicDispatcher] = React.useReducer(rootReducer, domains, rootInitializer);

	let domainsDispatcher = DispatcherFactory<IRootDomains>(root._domains_, rootBasicDispatcher, providers);

	let rootDispatcher = DispatcherFactory<IRootState>(root, rootBasicDispatcher, { domainsDispatcher: domainsDispatcher });

	
	return <RootStateContext.Provider value={root}>
		<RootDispatchContext.Provider value={rootDispatcher}>
			<DomainStateContext.Provider value={root._domains_}>
				<DomainDispatchContext.Provider value={domainsDispatcher}>
					{children}
				</DomainDispatchContext.Provider>
			</DomainStateContext.Provider>
		</RootDispatchContext.Provider>
	</RootStateContext.Provider>
	
}
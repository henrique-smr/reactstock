import React from 'react';
import {useDispatchWithServices} from '@fat/utils/hooks';

import {ERRORS,STATUS} from './consts';

import {RESOLVE_STARTED, RESOLVE_DEPENDENCIES, RESOLVE_BUILDING, RESOLVE, LOADED} from './actions'

import rootReducer from './reducer';

function Init(domains) 
{
	console.time('StoreLoad');
	const _root = {
		_domains_:{},
		_reducers_:{},
		_resolve_:{},
		_effects_:{},
		_resolve_stack_:[],
		_status_:STATUS.PRE_RUN,
		_errors_:[],
	}

	if(!Array.isArray(domains))
		throw ERRORS.PROP_DOMAINS_MUST_BE_ARRAY;


	_root._status_ = STATUS.INIT_STARTED;
	for (var domain of domains)
	{
		const batch = {}
		const {name,reducer,initialState,resolve, Effects, catch:isCatchable} = domain;


		if(!typeof name === 'string')
		{
			initialState._errors_.push(ERRORS.DOMAIN_FIELD_NAME_MUST_BE_STRING);
			continue;
		}

		if(!reducer instanceof Function)
		{
			initialState._errors_.push(ERRORS.DOMAIN_FIELD_REDUCER_MUST_BE_FUNCTION);
			continue;
		}
		if(Array.isArray(resolve))
		{
			batch._resolve_ = {
				..._root._resolve_,
				[name]:{resolve:resolve[0],dependencies:resolve.slice(1),isCatchable:!!isCatchable,status:false},
			}
		}

		if (typeof Effects == 'function') {
			batch._effects_ = {
				..._root._effects_,
				[name]:Effects
			}
		}

		batch._reducers_ = {
			..._root._reducers_,
			[name]:reducer
		}

		batch._domains_ = {
			..._root._domains_,
			[name]:initialState
		}

		Object.assign(_root,batch)
	}

	if(_root._errors_.length>0)
		_root._status_ = STATUS.INIT_FAILED;
	else
		_root._status_ = STATUS.INIT_SUCCESS;

	return _root;
}


const RootStateContext = React.createContext();
const RootDispatchContext = React.createContext();
const DomainStateContext = React.createContext();
const DomainDispatchContext = React.createContext();

function Provider({children, domains}) {
	const [state, rootDispatcher] = React.useReducer(rootReducer, domains, Init);

	let domainsDispatch = useDispatchWithServices(state._domains_, rootDispatcher);
	let rootDispatch = useDispatchWithServices(state, rootDispatcher, { domainsDispatch: domainsDispatch });

	
	return <RootStateContext.Provider value={state}>
		<RootDispatchContext.Provider value={rootDispatch}>
			<DomainStateContext.Provider value={state._domains_}>
				<DomainDispatchContext.Provider value={domainsDispatch}>
					{children}
				</DomainDispatchContext.Provider>
			</DomainStateContext.Provider>
		</RootDispatchContext.Provider>
	</RootStateContext.Provider>
	

	
}

function Main({children}) {
	const state = React.useContext(RootStateContext);
	const rootDispatch = React.useContext(RootDispatchContext);

	React.useEffect(() => {

		switch (state._status_) {
			case STATUS.INIT_SUCCESS:
				rootDispatch(RESOLVE_STARTED())
				rootDispatch(RESOLVE_DEPENDENCIES());
				rootDispatch(RESOLVE_BUILDING());
				break;


			case STATUS.INIT_FAILED:
				var errorStack = [...state._errors_];
				errorStack.unshift(new Error("Um ou mais erros ocorreram na inicialização estados"))
				throw errorStack;


			case STATUS.RESOLVE_SUCCESS:
				rootDispatch(LOADED());
				break;

			case STATUS.RESOLVE_FAILED:
				var errorStack = [...state._errors_];
				errorStack.unshift(new Error("Um ou mais erros ocorreram no processo de resolução dos estados"))
				throw errorStack;


			default:
				break;
		}

	}, [state._status_])

	React.useEffect(() => {
		if (state._status_ === STATUS.RESOLVE_BUILDING) {
			rootDispatch(RESOLVE())
		}
	}, [state._resolve_stack_, state._status_])
	
	const domainsState = React.useContext(DomainStateContext);
	const domainsDispatch = React.useContext(DomainDispatchContext);

	for(var d in state._effects_)
	{
		state._effects_[d](domainsState, domainsDispatch);
	}

	const memoizedProviders = React.useMemo(() => children
	, [state._domains_, state._status_])

	return memoizedProviders;
}


export function Store ({domains, children})
{
	return (
		<Provider domains={domains}>
			<Main>
				{children}
			</Main>
		</Provider>
	)
}
export function useStore(domain) {
	const state = React.useContext(DomainStateContext);
	const dispatch = React.useContext(DomainDispatchContext);
	if(state === undefined || dispatch === undefined)
		throw "useStore deve ser filho de um <Store> component"

	if(domain)
	{
		if(!domain in state)
			throw new Error("O caminho específicado em useStore é inválido.");
		return [state[domain],dispatch]
	}
	else
		return [state,dispatch]

}

export function useStoreStatus() {
	const {_status_} = React.useContext(RootStateContext);
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
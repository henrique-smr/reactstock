import IReducer from './IReducer'
import IResolvePayload from './IResolvePayload'
import IEffects from './IEffects'
import IRootDomains from './IRootDomains'

export default interface IRootState {
	_domains_:IRootDomains,
	_reducers_:{[name:string]:IReducer},
	_resolve_:{[name:string]:IResolvePayload},
	_effects_:{[name:string]:IEffects},
	_resolve_stack_:IResolvePayload[],
	_status_:symbol|string,
	_errors_:Array<Error>,
}


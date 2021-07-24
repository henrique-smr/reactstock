import {ERRORS,STATUS} from './consts';
import IDomain from './types/IDomain'
import IRootState from './types/IRootState'
import getInitialRootState from './utils/getInitialRootState'


export default function rootInitializer(domains:Array<IDomain>):IRootState
{

	const _root:IRootState = getInitialRootState()

	if(!Array.isArray(domains))
		throw ERRORS.PROP_DOMAINS_MUST_BE_ARRAY;


	_root._status_ = STATUS.INIT_STARTED;
	for (var domain of domains)
	{

		const {name,reducer,initialState,resolve, Effects, catch:isCatchable} = domain;


		if(typeof name !== 'string')
		{
			initialState._errors_.push(ERRORS.DOMAIN_FIELD_NAME_MUST_BE_STRING);
			continue;
		}

		if(!(reducer instanceof Function))
		{
			initialState._errors_.push(ERRORS.DOMAIN_FIELD_REDUCER_MUST_BE_FUNCTION);
			continue;
		}
		if(Array.isArray(resolve))
		{
			const resolver = resolve[0];
			const dependencies = resolve.slice(1) as Array<string>

			_root._resolve_ = {
				..._root._resolve_,
				[name]:{resolve:resolver,dependencies:dependencies,isCatchable:!!isCatchable,status:false},
			}
		}

		if (typeof Effects == 'function') {
			_root._effects_ = {
				..._root._effects_,
				[name]:Effects
			}
		}

		_root._reducers_ = {
			..._root._reducers_,
			[name]:reducer
		}

		_root._domains_ = {
			..._root._domains_,
			[name]:initialState
		}

		// Object.assign(_root,batch)
	}

	if(_root._errors_.length>0)
		_root._status_ = STATUS.INIT_FAILED;
	else
		_root._status_ = STATUS.INIT_SUCCESS;

	return _root;
}

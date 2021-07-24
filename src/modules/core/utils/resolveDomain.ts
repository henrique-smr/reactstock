import IBasePayload,{IBasePayloadDispatcher} from '../types/IBasePayload'
import {IResolvePayloadDispatcher} from '../types/IResolvePayload'
import IAction from '../types/IAction'

export default async function resolveDomain(resolve:IResolvePayloadDispatcher, {state, dispatch, ...providers}:IBasePayload<any>) {
	if(resolve === null || resolve === undefined)
		return state;

	switch(resolve.constructor.name)
	{
		case 'AsyncFunction':
		case 'Function':
			return await (resolve as IBasePayloadDispatcher<any>)({state, dispatch, ...providers});
		case 'Promise':
			return await (resolve as Promise<any>);
		case 'Object':
			return dispatch(resolve as IAction);
		default:
			return state;
	}
}
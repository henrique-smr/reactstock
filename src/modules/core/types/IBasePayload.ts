import IDispatcher from './IDispatcher'

export interface IBasePayloadDispatcher<State> {
	(payload:IBasePayload<State>):any|Promise<any>
}

export default interface IBasePayload<State>{
	state:State,
	dispatch:IDispatcher<State>,
	[key:string]:any
}
import IEvent from './IEvent'

export type IResolvePayloadDispatcher =	IEvent<any>|Promise<any>;

export default interface IResolvePayload {
	resolve:IResolvePayloadDispatcher,
	dependencies:string[],
	isCatchable:boolean,
	status:boolean
}
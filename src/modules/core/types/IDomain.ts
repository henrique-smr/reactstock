import {IResolvePayloadDispatcher} from '../types/IResolvePayload'
import IEffects from '../types/IEffects'
import IReducer from '../types/IReducer'

export default interface IDomain{
	name:string,
	initialState:any,
	reducer:IReducer,
	catch?:boolean,
	resolve?:[IResolvePayloadDispatcher,...Array<string>],
	Effects?:IEffects,
}
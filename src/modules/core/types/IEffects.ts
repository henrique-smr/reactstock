import IDispatcher from './IDispatcher'

export default interface IEffects {
	(state:any, dispatch:IDispatcher):void
}
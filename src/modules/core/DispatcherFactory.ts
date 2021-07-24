import IBasicDispatcher from './types/IBasicDispatcher'
import IDispatcher from './types/IDispatcher'


const DispatcherFactory = <State>(state:State,dispatch:IBasicDispatcher,providers?:any):IDispatcher<State> =>{

	const dispatcher:IDispatcher<State> = (arg)=>{
		if(arg instanceof Function)
			return arg({dispatch:DispatcherFactory<State>(state,dispatch,providers),state,...providers})
		else
			return dispatch(arg)
	}

	return dispatcher
}


export default DispatcherFactory;

export {IBasicDispatcher, IDispatcher}
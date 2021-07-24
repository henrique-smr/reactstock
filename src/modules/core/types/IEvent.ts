import IAction from './IAction'
import {IBasePayloadDispatcher} from './IBasePayload'


type IEvent<State> = IAction | IBasePayloadDispatcher<State>


export default IEvent
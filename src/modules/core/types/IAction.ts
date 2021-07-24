export type IActionType = string|symbol|string[]|symbol[];
export type IActionDomain = string|Array<string>;
export type IActionPayload = any;

export default interface IAction {
	type: IActionType,
	domain?: IActionDomain,
	payload?: IActionPayload
}
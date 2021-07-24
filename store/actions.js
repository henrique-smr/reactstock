import React from 'react';
import {ACTIONS,STATUS} from './consts'
import {resolveDependencies, resolveDomain} from './utils';

export function LOADED(){
	return ({dispatch}) => {
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.LOADED
		})
	}
}

export function RESOLVE_STARTED() {
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.RESOLVE_STARTED
		})
	}
}

export function RESOLVE_BUILDING() {
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.RESOLVE_BUILDING
		})
	}
}

export function RESOLVE_SUCCESS(){
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.RESOLVE_SUCCESS
		})
	}
}
export function RESOLVE_FAILED(){
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.SET_STATUS,
			payload:STATUS.RESOLVE_FAILED
		})
	}
}


export function RESOLVE_DEPENDENCIES() {
	return ({dispatch,state})=>{
		const resolve_stack = resolveDependencies(state._resolve_);
		dispatch({
			domain:'root',
			type:ACTIONS.SET_RESOLVE_STACK,
			payload:resolve_stack
		})
	}
}

export function UNSHIFT_ERROR(error) {
	return ({dispatch})=>{
		dispatch({
			domain:'root',
			type:ACTIONS.UNSHIFT_ERROR,
			payload:error
		})
	}
}




export function RESOLVE(){
	return async ({state,dispatch,services,domainsDispatch}) => {
		const newStack = [...state._resolve_stack_];
		const node = newStack.shift();

		if(!node && newStack.length === 0)
		{
			if(!state._errors_.length > 0)
				dispatch(RESOLVE_SUCCESS())
			else
				dispatch(RESOLVE_FAILED())
			return
		}

		try {
			await resolveDomain(node.resolve,{state:state._domains_,services,dispatch:domainsDispatch});
		}
		catch(error)
		{
			console.error(error)
			if(!node.isCatchable)
				dispatch(UNSHIFT_ERROR(error))
		}

		dispatch({
			domain:'root',
			type:ACTIONS.SET_RESOLVE_STACK,
			payload:newStack
		})
	}
}

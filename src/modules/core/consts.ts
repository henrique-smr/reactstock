export const STATUS = {
	PRE_RUN:Symbol('PRE_RUN'),

	INIT_STARTED:Symbol('INIT_STARTED'),

	INIT_SUCCESS:Symbol('INIT_SUCCESS'),

	INIT_FAILED:Symbol('INIT_FAILED'),

	RESOLVE_STARTED:Symbol('RESOLVE_STARTED'),

	RESOLVE_BUILDING:Symbol('RESOLVE_BUILDING'),

	RESOLVE_SUCCESS:Symbol('RESOLVE_SUCCESS'),

	RESOLVE_FAILED:Symbol('RESOLVE_FAILED'),

	LOADED:Symbol('LOADED')

}

export const ACTIONS = {
	SET_STATUS:Symbol('SET_STATUS'),

	SET_RESOLVE_STACK:Symbol('SET_RESOLVE_STACK'),

	SET_EFFECT_STACK:Symbol('SET_EFFECT_STACK'),

	UNSHIFT_ERROR:Symbol('UNSHIFT_ERROR'),
}

export const ERRORS = {

	PROP_DOMAINS_MUST_BE_ARRAY:new Error("O prop 'domains' de Store deve ser uma array de objetos"),

	DOMAIN_FIELD_NAME_MUST_BE_STRING:new Error("O campo 'nome' de um domínio deve ser uma string."),

	DOMAIN_FIELD_REDUCER_MUST_BE_FUNCTION:new Error("O campo 'reducer' de um domínio deve ser uma função"),

	BAD_ACTION_TYPE:new Error('Toda ação simples despachada deve ter o campo "type", onde type:[string,symbol]'),

	BAD_ACTION_DOMAIN:new Error('o campo "domain" de uma ação deve ser do tipo domain:?[string, Array<string>]'),
	
	ACTION_MUST_HAVE_SOME_DOMAIN:new Error(`
		Toda ação simples despachada deve possuir um domínio específicado.\n
		Seja no campo type:string, onde os domínios/subdomínios/types são serpadaos por '/'.
		Ex.: \n
			{\n
				type:global/zIndex/increase\n
			}\n
		Ou no campo domain:[string,Array<string>], especificando um 'type'.\n
		Ex.: \n
			{\n
				type:Synbol.for('INCREASE')\n,
				domain:'global/zIndex'
			}\n
		Ex.: \n
			{\n
				type:decrease\n,
				domain:['global','zIndex']
			}\n
	`)
}
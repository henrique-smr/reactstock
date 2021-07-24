import React from 'react'
import useRoot from './hooks/useRoot'
import useResolver from './hooks/useResolver'
import useDomainsEffects from './hooks/useDomainsEffects'


export default function Controler({children}:{children:React.ReactNode}):JSX.Element {
	const [{_domains_,_status_}] = useRoot()

	useResolver()
	useDomainsEffects()

	const memoizedChildren = React.useMemo(() => children, [_domains_, _status_])

	return memoizedChildren as JSX.Element;
}
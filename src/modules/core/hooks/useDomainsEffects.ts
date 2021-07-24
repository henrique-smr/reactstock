import useDomains from './useDomains'
import useRoot from './useRoot'


export default function useDomainsEffects():void
{
	const [domains,domainsDispatch] = useDomains();
	const [{_effects_}] = useRoot();

	for(var d in _effects_)
	{
		_effects_[d](domains, domainsDispatch);
	}

}
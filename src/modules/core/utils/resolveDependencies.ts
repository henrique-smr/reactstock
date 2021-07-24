import IResolvePayload from '../types/IResolvePayload'


export default function resolveDependencies(tree:{[name:string]:IResolvePayload}) {
	const visited = new Map();
	const ctrlList:IResolvePayload[] = [];
	const stack:IResolvePayload[] = [];

	/*Ordena as dependencias por ordem de prioridade (mais dependentes primeiro / maior array de dependencies)*/
	const _keys = Object.entries(tree)
		.sort(([,A],[,B])=>{
			if(!Array.isArray(A.dependencies))
				return -1;
			else if(!Array.isArray(B.dependencies))
				return 1;
			else
				return A.dependencies.length - B.dependencies.length
		}).map(([k])=>k);

	var _index = 0;

	ctrlList.push(tree[_keys[_index]]);

	/*cria a ordem de melhor execução dos resolves*/
	function cycle() {
		while(ctrlList.length > 0)
		{
			const node = ctrlList.pop();

			if(node && ! visited.has(node))
			{
				visited.set(node,true)
				if (Array.isArray(node.dependencies))
				{
					for (const dependency of node.dependencies) {
						if(!_keys.includes(dependency))
							throw new Error(`Dependencia ${dependency} não é um domínio definido`);

						ctrlList.push(tree[dependency])
					}
					cycle()
				}
				stack.push(node)
				if(ctrlList.length==0 && _index !== _keys.length-1)
					ctrlList.push(tree[_keys[++_index]]);
			}
		}
	}

	cycle()
	return stack;
}
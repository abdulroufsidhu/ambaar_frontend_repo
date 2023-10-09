import { Route, Routes } from "react-router-dom";
import { Operation, IOperation } from '../../shared/models/operation';
import { ClientUrls } from "../../shared/routes";
import { OperationList } from './list';
import useAppContext from '../../shared/hooks/app-context';
import { useEffect, useState } from 'react';



export const OperationRoutes = () => {
	const [context, dispatch] = useAppContext();
	const branch = context.branch;
	const [operationsList, setOperationList] = useState<IOperation[]>([])

	useEffect(() => {

		if (branch && branch._id) {
			Operation.get({ "branch_id": branch._id })
				.then(res => { setOperationList(res.data ?? []) })
				.catch(error => console.error(error))
		}
	}, [branch])

	return (
		<Routes>
			<Route path={ClientUrls.operations.list} element={<OperationList list={operationsList} />} />
		</Routes>
	);
}


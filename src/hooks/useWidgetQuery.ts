import type { IWidgetTransport, WidgetQuery } from "@widy/sdk";
import { useCallback, useEffect, useRef, useState } from "react";

type QueryState<R> = {
	loading: boolean;
	error?: unknown;
	data?: R;
};

interface IConfig {
	skip?: boolean;
}

type UseWidgetQueryReturn<R> = QueryState<R> & {
	refetch: () => Promise<R | undefined>;
};

export function useWidgetQuery<A, R>({
	scope,
	transport,
	arg,
	config,
}: {
	scope: WidgetQuery;
	transport: IWidgetTransport;
	arg?: A;
	config?: IConfig;
}): UseWidgetQueryReturn<R> {
	const skip = !!config?.skip;
	const [state, setState] = useState<QueryState<R>>({ loading: !skip });

	const argKey = arg !== undefined ? JSON.stringify(arg) : undefined;

	const transportRef = useRef(transport);
	transportRef.current = transport;

	const requestIdRef = useRef(0);
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const refetch = useCallback(async (): Promise<R | undefined> => {
		const requestId = ++requestIdRef.current;
		const isActual = () =>
			mountedRef.current && requestId === requestIdRef.current;
		const argObj: A | undefined =
			argKey !== undefined ? JSON.parse(argKey) : undefined;

		setState((prev) => ({ ...prev, loading: true, error: undefined }));

		try {
			const data = await transportRef.current.action<A, R>(scope, argObj);
			if (isActual()) setState({ loading: false, data });
			return data;
		} catch (error) {
			if (isActual()) setState((prev) => ({ ...prev, loading: false, error }));
			return undefined;
		}
	}, [scope, argKey]);

	useEffect(() => {
		if (skip) return;
		refetch();
	}, [skip, refetch]);

	return { ...state, refetch };
}

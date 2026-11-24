import type { IWidgetTransport, WidgetMutation } from "@widy/sdk";
import { useCallback, useEffect, useRef, useState } from "react";

type MutationState<R> = {
	loading: boolean;
	error?: unknown;
	data?: R;
};

type UseWidgetMutationReturn<A, R> = MutationState<R> & {
	trigger: (arg?: A) => Promise<R>;
	reset: () => void;
};

export function useWidgetMutation<A, R>({
	scope,
	transport,
}: {
	scope: WidgetMutation;
	transport: IWidgetTransport;
}): UseWidgetMutationReturn<A, R> {
	const [state, setState] = useState<MutationState<R>>({ loading: false });

	const callIdRef = useRef(0);
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const trigger = useCallback(
		async (arg?: A): Promise<R> => {
			const callId = ++callIdRef.current;
			const isActual = () => mountedRef.current && callId === callIdRef.current;

			setState((prev) => ({ ...prev, loading: true, error: undefined }));

			try {
				const data = await transport.action<A, R>(scope, arg);
				if (isActual()) setState({ loading: false, data });
				return data;
			} catch (error) {
				if (isActual())
					setState((prev) => ({ ...prev, loading: false, error }));
				throw error;
			}
		},
		[scope, transport],
	);

	const reset = useCallback(() => {
		callIdRef.current++;
		setState({ loading: false });
	}, []);

	return { ...state, trigger, reset };
}

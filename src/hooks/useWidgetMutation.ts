import type { IWidgetTransport, WidgetMutation } from "@widy/sdk";
import { useCallback, useState } from "react";

type MutationState<R> = {
	loading: boolean;
	error?: unknown;
	data?: R;
};

type UseWidgetMutationReturn<A, R> = {
	trigger: (arg?: A) => Promise<R>;
	loading: boolean;
	error?: unknown;
	data?: R;
};

export function useWidgetMutation<A, R>({
	scope,
	transport
}: {
	scope: WidgetMutation;
	transport:IWidgetTransport
}): UseWidgetMutationReturn<A, R> {
	
	const [state, setState] = useState<MutationState<R>>({
		loading: false,
		error: undefined,
		data: undefined,
	});

	const trigger = useCallback(
		async (arg?: A): Promise<R> => {
			setState({ loading: true, error: undefined, data: undefined });
			try {
				const data = await transport.action<A, R>(scope, arg);
				setState({ loading: false, error: undefined, data });
				return data;
			} catch (error) {
				setState({ loading: false, error, data: undefined });
				throw error;
			}
		},
		[scope, transport],
	);

	return { trigger, ...state };
}

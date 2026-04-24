import type { WidgetMutation } from "@widy/sdk";
import { useCallback, useState } from "react";
import useBridge from "./useBridge";

type MutationState<R> = {
	loading: boolean;
	error: Error | null;
	data: R | null;
};

type UseWidgetMutationReturn<P, R> = {
	trigger: (payload?: P) => Promise<R>;
	loading: boolean;
	error: Error | null;
	data: R | null;
};

export function useWidgetMutation<P, R>({
	scope,
}: {
	scope: WidgetMutation;
}): UseWidgetMutationReturn<P, R> {
	const bridge = useBridge();
	const [state, setState] = useState<MutationState<R>>({
		loading: false,
		error: null,
		data: null,
	});

	const trigger = useCallback(
		async (payload?: P): Promise<R> => {
			setState({ loading: true, error: null, data: null });
			try {
				const result = await bridge.action<P, R>(scope, payload);
				setState({ loading: false, error: null, data: result });
				return result;
			} catch (err) {
				const error = err as Error;
				setState({ loading: false, error, data: null });
				throw error;
			}
		},
		[scope, bridge],
	);

	return { trigger, ...state };
}

import type { WidgetAction } from "@widy/sdk";
import { useCallback, useEffect, useState } from "react";
import useBridge from "./useBridge";

interface IConfig {
	skip?: boolean;
}

export function useWidgetAction<P, R>({
	scope,
	payload,
	config,
}: {
	scope: WidgetAction;
	payload?: P;
	config?: IConfig;
}) {
	const bridge = useBridge();
	const [data, setData] = useState<R>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error>();

	const fetch = useCallback(async () => {
		setLoading(true);
		try {
			const result = await bridge.action<P, R>(scope, payload);

			setData(result);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	}, [scope, payload, bridge]);

	useEffect(() => {
		if (config?.skip) return;
		fetch();
	}, [config, fetch]);

	return { data, loading, error, fetch };
}

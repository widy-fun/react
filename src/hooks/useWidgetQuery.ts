import type { WidgetQuery } from "@widy/sdk";
import { useCallback, useEffect, useState } from "react";
import useBridge from "./useBridge";

interface IConfig {
	skip?: boolean;
}

export function useWidgetQuery<P, R>({
	scope,
	payload,
	config,
}: {
	scope: WidgetQuery;
	payload?: P;
	config?: IConfig;
}) {
	const bridge = useBridge();
	const [data, setData] = useState<R>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error>();

	const refetch = useCallback(async () => {
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
		refetch();
	}, [config, refetch]);

	return { data, loading, error, fetch: refetch };
}

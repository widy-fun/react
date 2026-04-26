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

	const payloadKey = payload ? JSON.stringify(payload) : undefined;
	const skip = config?.skip;

	const refetch = useCallback(async () => {
		const payloadObj = payloadKey ? JSON.parse(payloadKey) : undefined;
		setLoading(true);
		try {
			const result = await bridge.action<P, R>(scope, payloadObj);
			setData(result);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	}, [scope, payloadKey, bridge]);

	useEffect(() => {
		if (skip) return;
		refetch();
	}, [skip, refetch]);

	return { data, loading, error, refetch };
}

import type { WidgetQuery } from "@widy/sdk";
import { useCallback, useEffect, useState } from "react";
import useBridge from "./useBridge";

interface IConfig {
	skip?: boolean;
}

export function useWidgetQuery<A, R>({
	scope,
	arg,
	config,
}: {
	scope: WidgetQuery;
	arg?: A;
	config?: IConfig;
}) {
	const bridge = useBridge();
	const [data, setData] = useState<R>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>();

	const argKey = arg ? JSON.stringify(arg) : undefined;
	const skip = config?.skip;

	const refetch = useCallback(async () => {
		const argObj = argKey ? JSON.parse(argKey) : undefined;
		setLoading(true);
		try {
			const result = await bridge.action<A, R>(scope, argObj);
			setData(result);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [scope, argKey, bridge]);

	useEffect(() => {
		if (skip) return;
		refetch();
	}, [skip, refetch]);

	return { data, loading, error, refetch };
}

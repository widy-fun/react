import type { IWidgetTransport, WidgetQuery } from "@widy/sdk";
import { useCallback, useEffect, useState } from "react";

interface IConfig {
	skip?: boolean;
}

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
}) {
	const [data, setData] = useState<R>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>();

	const argKey = arg ? JSON.stringify(arg) : undefined;
	const skip = config?.skip;

	const refetch = useCallback(async () => {
		const argObj = argKey ? JSON.parse(argKey) : undefined;
		setLoading(true);
		try {
			const result = await transport.action<A, R>(scope, argObj);
			setData(result);
			return result;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [scope, argKey, transport]);

	useEffect(() => {
		if (skip) return;
		refetch();
	}, [skip, refetch]);

	return { data, loading, error, refetch };
}

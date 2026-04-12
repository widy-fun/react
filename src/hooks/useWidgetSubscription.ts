import type { WidgetSubscription } from "@widy/sdk";
import { useEffect } from "react";
import useBridge from "./useBridge";

export function useWidgetSubscription<T>(
	scope: WidgetSubscription,
	handler: (msg: T) => void,
) {
	const bridge = useBridge();

	useEffect(() => {
		return bridge.subscribe<T>(scope, handler);
	}, [scope, bridge, handler]);
}

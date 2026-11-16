import type { IWidgetTransport, WidgetSubscription } from "@widy/sdk";
import { useEffect, useRef } from "react";

export function useWidgetSubscription<T>(
	scope: WidgetSubscription,
	transport: IWidgetTransport,
	handler: (msg: T) => void,
) {
	const handlerRef = useRef(handler);
	handlerRef.current = handler;
	useEffect(() => {
		return transport.subscribe<T>(scope, (msg) => handlerRef.current(msg));
	}, [scope, transport]);
}

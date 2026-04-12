import type { WidgetOutboundBridge } from "@widy/sdk";
import { createContext } from "react";

export const BridgeContext = createContext<WidgetOutboundBridge | null>(null);

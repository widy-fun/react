import { useContext } from "react";
import { BridgeContext } from "../context/BridgeContext";

const useBridge = () => {
	const bridge = useContext(BridgeContext);
	if (!bridge)
		throw new Error("useBridge must be used inside <BridgeProvider>");
	return bridge;
};
export default useBridge;

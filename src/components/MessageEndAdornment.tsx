import { Box } from "@mui/material";
import type { IClientMessage } from "@widy/sdk";
import {
	getServiceColorByServiceType,
	getServiceImageByServiceType,
	getServiceTypeByMessage,
} from "@widy/sdk";

const MessageEndAdornment = ({ message }: { message: IClientMessage }) => {
	const service = getServiceTypeByMessage(message);

	return (
		<Box
			sx={{
				width: "3rem",
				display: "grid",
				placeItems: "center",
				background: getServiceColorByServiceType(service),
				minHeight: "100%",
			}}
		>
			<Box
				component="img"
				src={getServiceImageByServiceType(service)}
				alt=""
				sx={{
					width: 30,
					height: 30,
					objectFit: "contain",
					borderRadius: 1,
					backgroundColor: "white",
					padding: "4px",
				}}
			/>
		</Box>
	);
};
export default MessageEndAdornment;

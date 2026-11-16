import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton } from "@mui/material";
import type { IClientMessage } from "@widy/sdk";
import {
	getColorByMediaType,
	getColorByMessageType,
	getMediaFromMessage,
} from "@widy/sdk";

const MessageStartAdornment = ({
	message,
	isMediaPlaying,
	isAlertPlaying,
	onReplayMedia,
}: {
	message: IClientMessage;
	isMediaPlaying: boolean;
	isAlertPlaying: boolean;
	onReplayMedia: () => void;
}) => {
	const media = getMediaFromMessage(message);
	return (
		<Box
			sx={{
				width: "3rem",
				display: "grid",
				placeItems: "center",
				background: media
					? getColorByMediaType(media.media_type)
					: getColorByMessageType(message.type),
				minHeight: "100%",
			}}
		>
			{media && !isMediaPlaying && !isAlertPlaying && (
				<IconButton onClick={onReplayMedia}>
					<ReplayIcon />
				</IconButton>
			)}
		</Box>
	);
};
export default MessageStartAdornment;

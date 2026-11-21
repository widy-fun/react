import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { IconButton } from "@mui/material";
import {
	formatTime,
	getColorByMediaType,
	getMediaFromMessage,
	type IClientMessage,
} from "@widy/sdk";

const MediaTile = ({
	message,
	pausedMediaId,
	onPlayMedia,
	onPauseMedia,
	onSkipMedia,
	isMediaPlaying,
}: {
	message: IClientMessage;
	pausedMediaId: string;
	onPlayMedia: () => void;
	onPauseMedia: () => void;
	onSkipMedia: () => void;
	isMediaPlaying: boolean;
}) => {
	const media = getMediaFromMessage(message);
	return (
		<>
			{isMediaPlaying && media && (
				<div
					style={{
						height: "100%",
						width: "100%",
						position: "absolute",
						display: "grid",
						placeItems: "center",
						zIndex: 1,
						top: 0,
						left: 0,
						background: getColorByMediaType(media.media_type),
					}}
				>
					<div
						style={{
							position: "absolute",
							top: 15,
							right: 15,
						}}
					>
						{formatTime({ milliseconds: (media.duration ?? 0) * 1000 })}
					</div>
					<div
						style={{
							position: "absolute",
							top: 15,
							left: 15,
							marginRight: 150,
						}}
					>
						{media.title}
					</div>
					<div style={{ position: "relative", display: "grid" }}>
						<IconButton
							onClick={() => {
								if (pausedMediaId === message.id) {
									onPlayMedia();
								} else {
									onPauseMedia();
								}
							}}
						>
							{pausedMediaId === message.id ? (
								<PlayArrowIcon sx={{ height: 50, width: 50 }} />
							) : (
								<PauseIcon sx={{ height: 50, width: 50 }} />
							)}
						</IconButton>

						<IconButton
							style={{
								position: "absolute",
								justifySelf: "center",
								alignSelf: "center",
								left: 70,
							}}
							onClick={onSkipMedia}
						>
							<SkipNextIcon />
						</IconButton>
					</div>
				</div>
			)}
		</>
	);
};
export default MediaTile;

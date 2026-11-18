import { Button, Card, Typography } from "@mui/material";
import type { IClientMessage,  } from "@widy/sdk";
import { getAlertFromMessage, getTtsFromMessage } from "@widy/sdk";
import type { TFunction } from "i18next";

import {
	type ComponentProps,
	memo,
	type ReactElement,
	type ReactNode,
} from "react";
import type MediaTile from "./MediaTile";
import MessageDate from "./MessageDate";
import type MessageText from "./MessageText";
import type MessageTitle from "./MessageTitle";

const MessageCard = ({
	message,
	isAlertPlaying,
	isTtsPlaying,
	onReplayAlert,
	onReplayTts,
	onSkipTts,
	onSkipAlert,
	title,
	text,
	startAdornment,
	endAdornment,
	messageMedia,
	t,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isTtsPlaying: boolean;
	onReplayAlert: () => void;
	onSkipAlert: () => void;
	onReplayTts: () => void;
	onSkipTts: () => void;
	title: ReactElement<ComponentProps<typeof MessageTitle>>;
	text: ReactElement<ComponentProps<typeof MessageText>>;
	startAdornment: ReactNode;
	endAdornment: ReactNode;
	messageMedia: ReactElement<ComponentProps<typeof MediaTile>>;
	t: TFunction;
}) => {
	const alert = getAlertFromMessage(message);
	const tts = getTtsFromMessage(message);

	return (
		<Card
			sx={(theme) => ({
				display: "flex",
				position: "relative",
				border: "2px solid",
				borderRadius: 3,
				boxSizing: "border-box",
				borderColor:
					isAlertPlaying || isTtsPlaying
						? theme.palette.primary.main
						: theme.palette.background.default,
				marginBottom: "5px",
				minHeight: "5.3rem",
				overflow: "hidden",
			})}
		>
			{messageMedia}
			{startAdornment}
			<div style={{ width: "100%", padding: 15, wordBreak: "break-word" }}>
				<div style={{ float: "right" }}>
					<MessageDate createdAt={message.created_at} />
				</div>
				<div>
					<Typography
						sx={(theme) => ({
							color: theme.palette.primary.main,
						})}
					>
						{title}
					</Typography>
				</div>
				<div>
					<span>{text}</span>
				</div>

				{alert && (
					<div
						style={{ display: "grid", gridAutoFlow: "column", marginTop: 10 }}
					>
						{!isAlertPlaying && (
							<Button
								size="small"
								sx={{
									justifySelf: "start",
									fontSize: 12,
								}}
								onClick={onReplayAlert}
							>
								{t("message.replay")}
							</Button>
						)}

						<Button
							size="small"
							sx={{
								justifySelf: "end",
								fontSize: 12,
							}}
							onClick={onSkipAlert}
						>
							{t("message.skip")}
						</Button>
					</div>
				)}
				{tts && (
					<div
						style={{ display: "grid", gridAutoFlow: "column", marginTop: 10 }}
					>
						{!isTtsPlaying && (
							<Button
								size="small"
								sx={{
									justifySelf: "start",
									fontSize: 12,
								}}
								onClick={onReplayTts}
							>
								{t("message.replay")}
							</Button>
						)}

						<Button
							size="small"
							sx={{
								justifySelf: "end",
								fontSize: 12,
							}}
							onClick={onSkipTts}
						>
							{t("message.skip")}
						</Button>
					</div>
				)}
			</div>
			{endAdornment}
		</Card>
	);
};
export default memo(MessageCard);

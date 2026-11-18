import {
	AssistantActionType,
	type IAlert,
	type IAssistantAction,
	type IChanelData,
	type IClientMessage,
	type ICommandAction,
	type IDonation,
	type IMedia,
	type IPinedMessageData,
	type IRedemption,
	type IUserData,
	MessageType,
} from "@widy/sdk";
import type { TFunction } from "i18next";

const MessageText = ({
	message,
	t,
}: {
	message: IClientMessage;
	t: TFunction;
}) => {
	switch (message.type) {
		case MessageType.Donation: {
			const donation = message.donation as IDonation;
			return <>{donation.text}</>;
		}
		case MessageType.Redemption: {
			const redemption = message.redemption as IRedemption;
			return <>{redemption.user_input}</>;
		}
		case MessageType.CommandAction: {
			const commandAction = message.command_action as ICommandAction;
			return <>{commandAction.user_input}</>;
		}
		case MessageType.AssistantAction: {
			const assistantAction = message.assistant_action as IAssistantAction;
			switch (assistantAction.type) {
				case AssistantActionType.PlayAlert: {
					const alert = message.assistant_action?.data as IAlert;
					return <>{alert.name}</>;
				}
				case AssistantActionType.BanUser: {
					const data = message.assistant_action?.data as IUserData;
					return (
						<>
							{t("message.assistant_ban_user", {
								user_name: data.name,
							})}
						</>
					);
				}
				case AssistantActionType.UnbanUser: {
					const data = message.assistant_action?.data as IUserData;
					return (
						<>
							{t("message.assistant_unban_user", {
								user_name: data.name,
							})}
						</>
					);
				}
				case AssistantActionType.PinMessage: {
					const data = message.assistant_action?.data as IPinedMessageData;
					return (
						<>
							{t("message.assistant_pin_message", {
								message: data.message,
							})}
						</>
					);
				}
				case AssistantActionType.ChangeChannelCategory: {
					const data = message.assistant_action?.data as IChanelData;
					return (
						<>
							{t("message.assistant_change_channel_category", {
								category: data.category,
							})}
						</>
					);
				}
				case AssistantActionType.ChangeChannelTitle: {
					const data = message.assistant_action?.data as IChanelData;
					return (
						<>
							{t("message.assistant_change_channel_title", {
								title: data.title,
							})}
						</>
					);
				}
				case AssistantActionType.AddEmotesMode: {
					return <>{t("message.assistant_add_emote_mode")}</>;
				}
				case AssistantActionType.RemoveEmotesMode: {
					return <>{t("message.assistant_remove_emote_mode")}</>;
				}
				case AssistantActionType.AddFollowMode: {
					return <>{t("message.assistant_add_follow_mode")}</>;
				}
				case AssistantActionType.RemoveFollowMode: {
					return <>{t("message.assistant_remove_follow_mode")}</>;
				}
				case AssistantActionType.AddSlowMode: {
					return <>{t("message.assistant_add_slow_mode")}</>;
				}
				case AssistantActionType.RemoveSlowMode: {
					return <>{t("message.assistant_remove_slow_mode")}</>;
				}
				case AssistantActionType.AddSubscribersMode: {
					return <>{t("message.assistant_add_subscribe_mode")}</>;
				}
				case AssistantActionType.RemoveSubscribersMode: {
					return <>{t("message.assistant_remove_subscribe_mode")}</>;
				}
				case AssistantActionType.PlayMedia: {
					const media = message.assistant_action?.data as IMedia;
					return <>{media.title}</>;
				}

				default:
					return <></>;
			}
		}
		default:
			return <></>;
	}
};
export default MessageText;

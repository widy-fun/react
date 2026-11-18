import {
	type IClientMessage,
	type ICommandAction,
	type IDonation,
	type IFollow,
	type IRaid,
	type IRedemption,
	type ISubscription,
	MessageType,
} from "@widy/sdk";
import type { TFunction } from "i18next";

const MessageTitle = ({
	message,
	t,
}: {
	message: IClientMessage;
	t: TFunction;
}) => {
	switch (message.type) {
		case MessageType.Donation: {
			const donation = message.donation as IDonation;
			return (
				<>
					{t("message.donated", {
						user_name: donation.user_name,
						currency: donation.currency,
						amount: donation.amount,
					})}
				</>
			);
		}
		case MessageType.Follow: {
			const follow = message.follow as IFollow;
			return <>{t("message.followed", { user_name: follow.user_name })}</>;
		}
		case MessageType.Subscription: {
			const subscription = message.subscription as ISubscription;
			return (
				<>
					{t("message.subscribed", {
						user_name: subscription.user_name,
					})}
				</>
			);
		}
		case MessageType.GiftSubscription: {
			const subscription = message.subscription as ISubscription;
			return (
				<>
					{t("message.gifted_subscriptions", {
						user_name: subscription.user_name,
						total: subscription.total,
					})}
				</>
			);
		}
		case MessageType.Raid: {
			const raid = message.raid as IRaid;
			return (
				<>
					{t("message.raided_with", {
						viewers: raid.viewers,
						user_name: raid.from_broadcaster_user_name,
					})}
				</>
			);
		}
		case MessageType.Redemption: {
			const redemption = message.redemption as IRedemption;
			return (
				<>
					{t("message.redemption", {
						user_name: redemption.user_name,
						title: redemption.title,
						cost: redemption.cost,
					})}
				</>
			);
		}
		case MessageType.CommandAction: {
			const commandAction = message.command_action as ICommandAction;
			return (
				<>
					{t("message.command_action", {
						user_name: commandAction.user_name,
						command_name: commandAction.command_name,
					})}
				</>
			);
		}
		case MessageType.AssistantAction: {
			return <>{t("ai_assistant")}</>;
		}
		default:
			return <></>;
	}
};
export default MessageTitle;

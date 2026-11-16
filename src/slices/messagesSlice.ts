import { createSlice } from "@reduxjs/toolkit";
import type { IMessagesFilter } from "@widy/sdk";

interface MessagesState {
	filter: IMessagesFilter;
	playingTtsId: string;
	playingAlertId: string;
	playingMediaId: string;
	pausedMediaId: string;
}

const initialState: MessagesState = {
	filter: {
		exclude_donations: false,
		exclude_follows: false,
		exclude_subscriptions: false,
		exclude_raids: false,
		exclude_redemptions: false,
		exclude_commands_actions: false,
		exclude_assistant_actions: false,
	},
	playingTtsId: "",
	playingAlertId: "",
	playingMediaId: "",
	pausedMediaId: "",
};

export const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setFilter: (
			state,
			action: {
				payload: IMessagesFilter;
			},
		) => {
			state.filter = action.payload;
		},
		setPlayingTtsId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.playingTtsId = action.payload;
		},
		setPlayingAlertId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.playingAlertId = action.payload;
		},
		setPlayingMediaId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.playingMediaId = action.payload;
		},
		setPausedMediaId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.pausedMediaId = action.payload;
		},
	},
});

export const {
	setFilter,
	setPlayingTtsId,
	setPlayingAlertId,
	setPlayingMediaId,
	setPausedMediaId,
} = messagesSlice.actions;

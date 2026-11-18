import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox, FormGroup, IconButton, Menu, MenuItem } from "@mui/material";
import type { IMessagesFilter } from "@widy/sdk";
import type { TFunction } from "i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../slices/messagesSlice";

const MessagesFilter = ({
	filter,
	t,
}: {
	filter: IMessagesFilter;
	t: TFunction;
}) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<IconButton onClick={handleClick}>
					<FilterAltIcon></FilterAltIcon>
				</IconButton>
			</div>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<FormGroup>
					{Object.entries(filter).map(([key]) => (
						<MenuItem
							key={key}
							onClick={() =>
								dispatch(
									setFilter({
										...filter,
										[key]: !filter[key as keyof IMessagesFilter],
									}),
								)
							}
						>
							<div>
								<Checkbox checked={filter[key as keyof IMessagesFilter]} />
								<span>{t(`filter.${key}`)}</span>
							</div>
						</MenuItem>
					))}
				</FormGroup>
			</Menu>
		</>
	);
};
export default MessagesFilter;

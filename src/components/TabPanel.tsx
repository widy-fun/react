const TabPanel = ({
	children,
	index,
	value,
}: {
	children?: React.ReactNode;
	index: number;
	value: number;
}) => {
	return (
		<div hidden={value !== index}>{value === index && <>{children}</>}</div>
	);
};
export default TabPanel;

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Grid } from '@material-ui/core';
import TabPanelsContainer from '../containers/TabPanelsContainer';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles(theme => ({
	horizontalTabs: {
		height: '100%',
		overflowX: 'auto',
	},
	horizontalContainer: {
		display: 'block',
	},
	tabPanelSmall: {
		overflowX: 'auto',
		maxHeight: '320px',
		width: '100%',
		backgroundColor: theme.palette.secondary.grey.light,
	},
}));

function AnimalInfoHorizontal() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Grid className={clsx(classes.horizontalContainer, 'small-view')} container>
			<Grid className='small-view' item xs={12}>
				<Tabs
					variant='scrollable'
					scrollButtons='on'
					value={value}
					onChange={handleChange}
					aria-label='Horizontal Tabs'
					className={classes.horizontalTabs}>
					<Tab label='Details' {...a11yProps(0)} />
					<Tab label='Shelter' {...a11yProps(1)} />
					<Tab label='Displayed Paintings' {...a11yProps(2)} />
					<Tab label='Canvas Photo' {...a11yProps(3)} />
				</Tabs>
			</Grid>
			<Grid
				className={clsx(classes.tabPanelSmall, 'small-view')}
				item
				xs={12}
				sm={9}>
				<TabPanelsContainer value={value} />
			</Grid>
		</Grid>
	);
}

export default AnimalInfoHorizontal;

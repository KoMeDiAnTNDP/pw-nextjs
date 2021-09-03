import React, { ChangeEvent, useState, ReactNode } from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '70%',
  }
});

const tabProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({ children, index, value }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
  >
    {value === index && children}
  </div>
);

export const Authorization = () => {
  const styles = useStyles();
  const [value, setValue] = useState(0);

  const handleTabsChange = (event: ChangeEvent<{}>, value: number) => setValue(value);

  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <Tabs value={value} onChange={handleTabsChange} variant="fullWidth">
          <Tab label="Sign In" {...tabProps(0)} />
          <Tab label="Registration" {...tabProps(1)} />
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={setValue}>
          <TabPanel index={0} value={value}>
            Sign in
          </TabPanel>
          <TabPanel index={1} value={value}>
            Registration
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  )
};

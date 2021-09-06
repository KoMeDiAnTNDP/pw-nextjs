import React, { ChangeEvent, useState, ReactNode } from 'react';
import { Tabs, Tab, Card, CardContent, makeStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { Registration } from './Registration';

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
      <Card raised style={{
        width: '60%'
      }}>
        <CardContent style={{padding: 0}}>
          <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" style={{
            backgroundColor: '#cf5ce2'
          }}>
            <Tab label="Sign In" {...tabProps(0)} />
            <Tab label="Sign Up" {...tabProps(1)} />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={setValue}>
            <TabPanel index={0} value={value}>
              <Registration />
            </TabPanel>
            <TabPanel index={1} value={value}>
              Sign Up
            </TabPanel>
          </SwipeableViews>
        </CardContent>
      </Card>
      {/*<div className={styles.authContainer}>*/}
      {/*  */}
      {/*</div>*/}
    </div>
  )
};

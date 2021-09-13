import React from 'react';
import Image from 'next/image';
import { AppBar as MaterialAppBar, IconButton, Typography, makeStyles } from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import parrot from '../public/parrot.svg';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#9c27b0',
    padding: 10
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  websiteLogoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
  },
  title: {
    marginLeft: 8
  },
  exitIcon: {
    color: '#000',
    transform: 'rotate(180deg)',
  }
});

type Props = {
  isAuthorized?: boolean;
};

export const AppBar = ({ isAuthorized }: Props) => {
  const styles = useStyles();

  return (
    <MaterialAppBar className={styles.appBar}>
      <div className={styles.container}>
        <div className={styles.websiteLogoContainer}>
          <Image src={parrot} alt="parrot" width={60} height={60} />
          <Typography variant="h4" className={styles.title} >Parrot Wings</Typography>
        </div>
        {isAuthorized && (<div>
          <IconButton>
            <ExitToAppIcon className={styles.exitIcon}/>
          </IconButton>
        </div>)}
      </div>
    </MaterialAppBar>
  )
}

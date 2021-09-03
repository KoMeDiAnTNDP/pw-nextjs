import React from 'react';
import Image from 'next/image';
import { AppBar as MaterialAppBar, Typography, makeStyles } from '@material-ui/core';

import parrot from '../public/parrot.svg';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#9400d3',
    padding: 10
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  websiteLogoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginLeft: 8
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
      </div>
    </MaterialAppBar>
  )
}

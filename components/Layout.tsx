import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

type Props = {
  title?: string;
};

export const Layout: FC<Props> = (
  {
    title = 'PW: Parrot Wings',
    children
  }: PropsWithChildren<Props>) =>
  (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer} />
    </div>
  );

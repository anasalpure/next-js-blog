import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const NotFound = () => {

  return (
    <div className="page-404">
      <Head>
        <title>404 | newsifier</title>
        <meta name="description" content="description here" />
        <meta name="keywords" content="keywords,here" />
      </Head>

      <div className="container text-center">
        <h1>404</h1>
        <p>The page you are looking for isn’t here</p>
        <h2 className="title">
          <Link href="/">
            <a>
							Homepage
            </a>
          </Link>
        </h2>
      </div>

    </div>
  );
};

export default NotFound;

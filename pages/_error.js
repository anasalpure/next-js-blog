import React from 'react'

function Error({ statusCode }) {
  return (
    <p className="w-full text-3xl text-center text-gray-400 my-12">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
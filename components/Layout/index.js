// @flow

import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Navigation from 'components/Navigation'
import selectStateJS from 'pages/App/selectors'

class Layout extends React.Component {
  props: {
    children: Node,
  }
  store: any;

  static defaultProps = {
  }

  render() {
    const { children } = this.props
    return (
      <div className="bg-light-gray">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.6.1/css/tachyons.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/static/custom.css" />
        </Head>
        <Navigation />
        <div
          className="mw8 center"
          style={{ paddingTop: 100 }}
        >
          {children}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return selectStateJS()(state)
}

export default connect(mapStateToProps)(Layout)

// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Layout from 'components/Layout'
import ArticleCardList from 'components/ArticleCardList'
import * as actions from './actions'
import selectStateJS from './selectors'

const Home = ({ articles, loadArticles }: {
  articles: Array<Article>,
  loadArticles: () => void,
}) => (
  <Layout>
    <div>
      <button onClick={() => loadArticles()}>Reload</button>
      <ArticleCardList articles={articles} />
    </div>
  </Layout>
)

function mapStateToProps(state) {
  return selectStateJS()(state)
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

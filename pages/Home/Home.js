// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Layout from 'components/Layout'
import ArticleCardList from 'components/ArticleCardList'
import * as actions from './actions'
import selectStateJS from './selectors'

const sources = require('./sources.json')

const Home = ({ articles, isLoading, loadArticles }: {
  articles: Array<Article>,
  isLoading: boolean,
  loadArticles: () => void,
}) => (
  <Layout>
    <div>
      <select onChange={(e: any) => loadArticles(e.target.value)}>
        {sources.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      {isLoading && <div>Loading</div>}
      {!isLoading && <ArticleCardList articles={articles} />}
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

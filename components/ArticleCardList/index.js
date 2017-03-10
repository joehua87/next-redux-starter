// @flow

import React from 'react'
import ArticleCard from 'components/ArticleCard'

export default function ({ articles }: {
  articles: Array<Article>,
}) {
  return (
    <div className="cf pa2">
      {articles.map(article => (
        <div className="fl w-50 w-25-m w-20-l pa2 h5" key={article.url}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  )
}

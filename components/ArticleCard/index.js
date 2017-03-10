// @flow

import React from 'react'
import Link from 'components/Link'

export default function ({ article }: {
  article: Article,
}) {
  return (
    <Link href={article.url} class="db link dim tc">
      <img src={article.urlToImage} alt={article.title} className="w-100 db outline black-10" />
      <dl className="mt2 f6 lh-copy">
        <dt className="clip">Title</dt>
        <dd className="ml0 black truncate w-100">{article.title}</dd>
        <dt className="clip">Author</dt>
        <dd className="ml0 gray truncate w-100">{article.author}</dd>
      </dl>
    </Link>
  )
}

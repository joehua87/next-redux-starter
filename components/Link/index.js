// @flow

import React from 'react'
import BaseLink from 'next/link'
import { themr } from 'react-css-themr'
import cx from 'classnames'

const styles = {
  root: 'link gray',
}

function Link({ href, as, children, className, theme }: {
  theme: { [key: string]: string },
  className?: string,
  href: string,
  as: string,
  children: Node,
}) {
  return (
    <BaseLink
      data-component="Link"
      href={href}
      as={as}
    >
      <a className={cx(theme.root, className)}>
        {children}
      </a>
    </BaseLink>
  )
}

Link.defaultProps = {
  className: undefined,
}

export default themr('Link', styles, { composeTheme: 'softly' })(Link)

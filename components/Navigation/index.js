// @flow

import React from 'react'
import Link from 'components/Link'

export default function Navigation() {
  return (
    <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        <Link className="link dim white dib mr3" href="/Home" as="/" title="Home">Home</Link>
        <Link className="link dim white dib mr3" href="/About" as="/about" title="About">About</Link>
        <Link className="link dim white dib" href="/Contact" as="/contact" title="Contact">Contact</Link>
      </nav>
    </header>
  )
}

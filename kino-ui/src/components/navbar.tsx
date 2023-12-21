import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

type NavbarItemProps = {
  to: string
  label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, label }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `text-lg font-medium text-gray-500 hover:text-gray-700 ${
          isActive ? 'opacity-100' : 'opacity-70'
        } `
      }
      to={to}
    >
      {label}
    </NavLink>
  )
}

const items: NavbarItemProps[] = [
  {
    to: '/',
    label: 'Catalog',
  },
  {
    to: '/ratings',
    label: 'Ratings',
  },
  {
    to: '/about',
    label: 'About',
  },
]

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <div className="flex items-center py-4">
        <FontAwesomeIcon size="2xl" icon={faFilm} />
        <span className="ml-4 text-3xl font-bold">Kino</span>
      </div>
      <nav className="ml-auto flex gap-4">
        {items.map((item) => (
          <NavbarItem key={item.to} {...item} />
        ))}
      </nav>
    </header>
  )
}

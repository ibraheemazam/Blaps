import { BsMusicNoteBeamed } from "react-icons/bs";
import { IconContext } from "react-icons";
import Image from "next/image";
import NextLink from "next/link";
import {
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdMusic,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorite',
  },
];

const playlists = new Array(100).fill(1).map((m, i) => `Playlist ${i + m}`);

function Linky({ children, route = "/" }) {
  return (
    <LinkBox>
      <NextLink href={route} passHref>
        <LinkOverlay className="linkOverlay">{children}</LinkOverlay>
      </NextLink>
    </LinkBox>
  );
}

function Menu({ items }) {
  return (
    <ul className="menu">
      {items.map((m) => (
        <li className="menuItem" key={m.name}>
          <Linky route={m.route}>
            <IconContext.Provider value={{ color: "white" }}>
              <m.icon className="menuIcon" />
            </IconContext.Provider>
            {m.name}
          </Linky>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <div className="logoContainer">
          <Image src="/logo.svg" width={120} height={60} />
        </div>
        <div className="navMenuContainer">
          <Menu items={navMenu} />
        </div>
        <div className="musicMenuContainer">
          <Menu items={musicMenu} />
        </div>
        <div className="menuDividerContainer">
          {/* figure out how to center this divider */}
          <hr className="menuDivider" />
        </div>
        <div className="playlistsContainer">
          <ul>
            {playlists.map((p) => (
              <li className="playlistItem" key={p}>
                <Linky>{p}</Linky>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
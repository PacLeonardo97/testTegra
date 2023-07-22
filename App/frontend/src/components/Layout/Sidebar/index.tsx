import { useState, Fragment } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { FaTimes } from 'react-icons/fa';

import { routes } from '@/helper/routes';

import {
  Container,
  Content,
  SidebarLink,
  SidebarLabel,
  DropdownLink
} from './styles';

export interface IProps {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setSidebar, sidebar }: IProps) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <Container $sidebar={sidebar}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        {routes.map(item => (
          <Fragment key={item.index}>
            <SidebarLink href={item.path} onClick={item.subNav && showSubnav}>
              <div className="nav-title">
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </div>
              <div>
                {item.subNav && subnav
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </div>
            </SidebarLink>
            {subnav &&
              item?.subNav?.map((item, index) => {
                return (
                  <DropdownLink href={item.path} key={index}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </DropdownLink>
                );
              })}
          </Fragment>
        ))}
      </Content>
    </Container>
  );
};

export default Sidebar;

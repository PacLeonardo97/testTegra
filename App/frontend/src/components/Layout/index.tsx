'use client';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

import Sidebar from './Sidebar';
import { Container, ContainerTop } from './styles';

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <ContainerTop>
        <FaBars onClick={() => setSidebar(oldValue => !oldValue)} />
      </ContainerTop>
      <Container $sidebar={sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <section className="page__left">{children}</section>
      </Container>
    </>
  );
}

export default Layout;

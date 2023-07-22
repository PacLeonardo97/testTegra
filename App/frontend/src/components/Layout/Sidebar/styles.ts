import Link from 'next/link';

import styled from 'styled-components';

export const Container = styled.div<{ $sidebar: boolean }>`
  background-color: #171923;
  position: fixed;
  height: 100vh;
  top: 0px;
  z-index: 1;
  width: ${props => (props.$sidebar ? '300px' : '0')};
  visibility: ${props => (props.$sidebar ? 'visible' : 'hidden')};
  opacity: ${props => (props.$sidebar ? '1' : '0')};
  transition:
    visibility 0s linear 0s,
    opacity 300ms;
  @media (max-width: 800px) {
    width: ${props => (props.$sidebar ? '100%' : '0')};
  }

  > svg {
    position: fixed;
    color: white;
    width: 32px;
    height: 32px;
    margin-top: 32px;
    margin-left: 32px;
    overflow: auto;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 80px;
  overflow: auto;
  position: fixed;
  width: 300px;
  height: 85%;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3b4f78;
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
  .nav-title {
    display: flex;
    align-items: center;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 16px;
`;

export const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 8px;
  margin: 0 8px 8px 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

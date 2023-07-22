import Link from 'next/link';

import { EColorTypePokemon } from '@/enum';
import styled from 'styled-components';

interface ILink {
  $ispage: boolean;
}

interface ICardPokemon {
  $type: string;
}

export const Container = styled.section`
  width: 1024px;
  margin: 32px auto;
  display: grid;
  grid-template-columns: 160px 160px 160px 160px 160px;
  gap: 32px;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    place-content: space-around;
    gap: 32px;
  }
`;

export const ContainerLink = styled.header`
  display: flex;
  width: 1024px;
  margin: 32px auto;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    width: 100%;
    gap: 16px;
    place-content: center;
  }
`;

export const ContainerPokemon = styled.div`
  position: relative;
  border-radius: 5px;
  padding: 16px;
  width: 160px;
  height: 264px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    height: 56px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }
`;

export const LinkGeneration = styled(Link)<ILink>`
  &:hover {
    border-bottom: 2px solid #54b752;
  }
  border-bottom: ${props => (props.$ispage ? '2px solid #54b752' : '')};
`;

export const CardTypePokemon = styled.div<ICardPokemon>`
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  width: 96px;
  background: ${props =>
    EColorTypePokemon[props.$type as keyof typeof EColorTypePokemon]};
`;

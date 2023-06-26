import styled from "styled-components";
import { Link } from "react-router-dom";

interface ILink {
  IsPage: boolean;
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
  border-radius: 5px;
  padding: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LinkGeneration = styled(Link)<ILink>`
  &:hover {
    border-bottom: 2px solid #54b752;
  }
  border-bottom: ${(props) => (props.IsPage ? "2px solid #54b752" : "")};
`;

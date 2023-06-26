import { Container, ContainerPokemon, LinkGeneration, ContainerLink } from "./styles";
import { usePokemon } from "../../hooks/pokemon";

function Home() {
  const { listPokemon, isLoading, generation } = usePokemon();

  return (
    <>
      <ContainerLink>
        {[...Array(9)].map((_, i) => (
          <LinkGeneration IsPage={i + 1 === generation} to={`/?generation=${i + 1}`} key={i + 1}>
            Geração {i + 1}
          </LinkGeneration>
        ))}
      </ContainerLink>
      <Container>
        {isLoading
          ? [...Array(20)].map((_, i) => (
              <ContainerPokemon
                key={i}
                className="skeleton"
                style={{ width: "160px", height: "165px" }}
              />
            ))
          : listPokemon?.map((v) => (
              <ContainerPokemon key={v.id}>
                <p>
                  {v.id} - {v.name}
                </p>
                <img alt={v.name} src={v.img} />
                <p>{v.types.toString()}</p>
              </ContainerPokemon>
            ))}
      </Container>
    </>
  );
}

export default Home;

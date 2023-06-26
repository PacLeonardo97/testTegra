import React from 'react';
import {usePokemon} from '../../hooks/pokemon';
import {View, Image, Text} from 'react-native';
import {style} from './styles';

function Home() {
  const {listPokemon, isLoading, generation} = usePokemon();

  return (
    <>
      <View>
        {[...Array(9)].map((_, i) => (
          <View
            // to={`/?generation=${i + 1}`}
            key={i + 1}>
            <Text>Geração {i + 1}</Text>
          </View>
        ))}
      </View>
      <View>
        {isLoading
          ? [...Array(20)].map((_, i) => (
              <View key={i} style={style.boxPokemon} />
            ))
          : listPokemon?.map(v => (
              <View style={style.boxPokemon} key={v.id}>
                <Text>
                  {v.id} - {v.name}
                </Text>
                <Image alt={v.name} source={{uri: v.img}} />
                <Text>{v.types.toString()}</Text>
              </View>
            ))}
      </View>
    </>
  );
}

export default Home;

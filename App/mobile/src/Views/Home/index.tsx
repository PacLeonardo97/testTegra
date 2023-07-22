import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import Skeleton from '../../components/skeleton';
import { usePokemon } from '../../hooks/pokemon';
import { style } from './styles';

function Home() {
  const { listPokemon, isLoading, generation, setGeneration } = usePokemon();
  return (
    <View style={{ padding: 16 }}>
      <View style={style.sectionTitle}>
        {[...Array(9)].map((_, i) => (
          <TouchableOpacity
            style={{
              borderBottomColor: generation === i + 1 ? '#54b752' : '',
              borderBottomWidth: generation === i + 1 ? 2 : 0
            }}
            onPress={() => setGeneration(i + 1)}
            key={i + 1}
          >
            <Text>Geração {i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={style.sectionPokemon}>
        {isLoading
          ? [...Array(20)].map((_, i) => (
              <Skeleton
                width={160}
                height={128}
                key={i}
                style={style.boxPokemon}
              />
            ))
          : listPokemon?.map(v => (
              <View style={style.boxPokemon} key={v.id}>
                <Text style={{ color: '#000000' }}>
                  {v.id} - {v.name}
                </Text>
                <Image
                  alt={v.name}
                  source={{ uri: v.img }}
                  width={68}
                  style={{ aspectRatio: 1 }}
                />
                <Text style={{ color: '#000000' }}>{v.types.toString()}</Text>
              </View>
          ))}
      </View>
    </View>
  );
}

export default Home;

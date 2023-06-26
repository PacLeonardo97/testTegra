import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  boxPokemon: {
    width: 160,
    height: 128,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
  },
  sectionTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 16,
    marginTop: 16,
  },
  sectionPokemon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 16,
    marginTop: 32,
  },
});

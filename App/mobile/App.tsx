import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

import Home from './src/Views/Home';

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: '#c0c0c0' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#c0c0c0" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: '#c0c0c0' }}
      >
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

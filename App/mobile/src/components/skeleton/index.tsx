import React, { memo, useEffect } from 'react';
import { Animated } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

interface IProps {
  height: number;
  width: number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton = ({ height, width, style }: IProps) => {
  const opacity = React.useRef(new Animated.Value(0.2));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 700
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 800
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: opacity.current,
          height,
          width,
          backgroundColor: '#666666'
        }
      ]}
    />
  );
};

export default memo(Skeleton);

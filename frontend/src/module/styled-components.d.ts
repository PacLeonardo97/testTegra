import 'styled-components';

import Theme from '../globalStyles/theme'

declare module 'styled-components' {
  export type DefaultTheme = typeof Theme
}
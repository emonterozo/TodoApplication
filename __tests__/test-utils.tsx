import { type ReactNode, type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';


const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationContainer>{children}</NavigationContainer>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };

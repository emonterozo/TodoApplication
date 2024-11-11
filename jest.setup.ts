import React from 'react';
import 'react-native-gesture-handler/jestSetup';

const mockedNavigate = jest.fn();
const mockedReplace = jest.fn();
const mockedGoBack = jest.fn();
const mockedListener = jest.fn();
const mockUseRoute = jest.spyOn(require('@react-navigation/native'), 'useRoute');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    goBack: mockedGoBack,
    addListener: mockedListener,
    replace: mockedReplace,
  }),
}));

global.React = React;

export { mockedNavigate, mockedGoBack, mockUseRoute, mockedReplace };

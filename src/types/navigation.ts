import { StackScreenProps } from '@react-navigation/stack';
import { Todo } from './context';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Todo: { todo?: Todo | undefined };
};

export type NavigationProp = StackScreenProps<RootStackParamList>['navigation'];

export type TodoRouteProp = RouteProp<RootStackParamList, 'Todo'>;

import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { Todo } from 'src/types/context';

const GlobalContext = createContext({
  todo: {} as Todo[],
  setTodo: {} as Dispatch<SetStateAction<Todo[]>>,
});

export default GlobalContext;

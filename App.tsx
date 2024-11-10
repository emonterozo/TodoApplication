import React, { useMemo, useState } from 'react';

import Navigation from './src/navigation/Navigation';
import GlobalContext from './src/context/context';
import { Todo } from './src/types/context';

const App = () => {
  const [todo, setTodo] = useState<Todo[]>([])
  const initialContext = useMemo(
    () => ({
      todo,
      setTodo
    }),
    [todo, setTodo]
  );
  
  return (
    <GlobalContext.Provider value={initialContext}>
      <Navigation />
    </GlobalContext.Provider>
  )
};

export default App;

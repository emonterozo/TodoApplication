import { Todo } from 'src/types/context';
import GlobalContext from '../src/context/context';
import { render } from './test-utils';

export const mockTodo = [];
export const mockSetTodo = jest.fn();

type renderMockGlobalContextProviderProps = {
  todo?: Todo[];
  setTodo?: jest.Mock<any, any>;
  children: JSX.Element;
};

export const renderMockGlobalContextProvider = ({
  todo = mockTodo,
  setTodo = mockSetTodo,
  children,
}: renderMockGlobalContextProviderProps) => {
  return render(
    <GlobalContext.Provider
      value={{
        todo,
        setTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>,
  );
};

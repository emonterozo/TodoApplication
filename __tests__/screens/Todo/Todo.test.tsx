import { useRoute } from '@react-navigation/native';

import { act, fireEvent, screen, waitFor } from '../../test-utils';
import { mockSetTodo, renderMockGlobalContextProvider } from '../../context-utils';
import { Todo } from '@app/screens';
import { mockedGoBack } from '../../../jest.setup';


describe('Todo Screen', () => {
  it('should matches the snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        todo: undefined,
      },
    });
    renderMockGlobalContextProvider({
      children: <Todo />,
    });
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should add new todo', async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        todo: undefined,
      },
    });
    renderMockGlobalContextProvider({
      children: <Todo />,
    });

    fireEvent.changeText(screen.getByTestId('title-input'), 'Sample Todo');

    fireEvent(screen.getByTestId('add-edit-todo'), 'press');

    await waitFor(() => {
      expect(mockedGoBack).toHaveBeenCalledWith();
    });
  });

  it('should update todo', async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        todo: { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
      },
    });
    renderMockGlobalContextProvider({
      children: <Todo />,
      todo: [
        { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
      ],
    });

    fireEvent.changeText(screen.getByTestId('title-input'), 'Sample Todo');
    fireEvent.changeText(screen.getByTestId('due-date-input'), '11/12/2024');
    fireEvent(screen.getByTestId('selection-Completed'), 'press');

    fireEvent(screen.getByTestId('add-edit-todo'), 'press');

    await waitFor(() => {
      expect(mockSetTodo).toHaveBeenCalledWith([
        { id: '1234', title: 'Sample Todo', dueDate: '11/12/2024', status: 'Completed' },
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
      ]);
      expect(mockedGoBack).toHaveBeenCalledWith();
    });
  });

  it('should delete todo', async () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        todo: { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
      },
    });
    renderMockGlobalContextProvider({
      children: <Todo />,
      todo: [
        { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
      ],
    });

    fireEvent(screen.getByTestId('delete-todo'), 'press');

    await waitFor(() => {
      expect(mockSetTodo).toHaveBeenCalledWith([
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
      ]);
      expect(mockedGoBack).toHaveBeenCalledWith();
    });
  });
});

import { fireEvent, screen, waitFor } from '../../test-utils';
import { renderMockGlobalContextProvider } from '../../context-utils';
import { Home } from '@app/screens';
import { mockedNavigate } from '../../../jest.setup';

describe('Home Screen', () => {
  it('should matches the snapshot', () => {
    renderMockGlobalContextProvider({
      children: <Home />,
    });
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should navigate to Todo screen', async () => {
    renderMockGlobalContextProvider({
      children: <Home />,
    });

    const button = screen.getByTestId('add-todo');

    fireEvent(button, 'press');

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Todo', {
        todo: undefined,
      });
    });
  });

  it('should filter todo if search input is not empty', async () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [
        { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
      ],
    });

    fireEvent.changeText(screen.getByTestId('search'), 'First Todo');

    await waitFor(() => {
      expect(screen.getByText('First Todo')).toBeTruthy();
      expect(screen.queryByText('Second Todo')).toBeNull();
    });
  });

  it('should filter todo if by status', async () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [
        { id: '1234', title: 'First Todo', dueDate: '11/11/2024', status: 'Pending' },
        { id: '1235', title: 'Second Todo', dueDate: '11/11/2024', status: 'Completed' },
        { id: '1236', title: 'Third Todo', dueDate: '11/11/2024', status: 'In Progress' },
      ],
    });

    fireEvent(screen.getByTestId('selection-Pending'), 'press');

    await waitFor(() => {
      expect(screen.getByText('First Todo')).toBeTruthy();
      expect(screen.queryByText('Second Todo')).toBeNull();
    });

    // shall removed filter once same status is clicked
    fireEvent(screen.getByTestId('selection-Pending'), 'press');

    await waitFor(() => {
      expect(screen.getByText('First Todo')).toBeTruthy();
      expect(screen.queryByText('Second Todo')).toBeTruthy();
    });
  });
});

describe('Todo List', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-11-03'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render item if todo is not empty', () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [{ id: '1234', title: 'Sample Todo', dueDate: '11/11/2024', status: 'Pending' }],
    });

    expect(screen.getByTestId('todo-1234').props.style.backgroundColor).toEqual('#fff');

    expect(screen.getByTestId('todo-1234')).toBeDefined();
  });

  it('should todo status background will be orange if status is not Completed', () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [{ id: '1234', title: 'Sample Todo', dueDate: '11/11/2024', status: 'Pending' }],
    });

    const bgStyles = screen.getByTestId('todo-status-1234').props.style;

    expect(bgStyles[1].backgroundColor).toEqual('orange');
  });

  it('should todo status background will be green if status is Completed', () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [{ id: '1234', title: 'Sample Todo', dueDate: '11/11/2024', status: 'Completed' }],
    });

    const bgStyles = screen.getByTestId('todo-status-1234').props.style;

    expect(bgStyles[1].backgroundColor).toEqual('green');
  });

  it('should navigate to Todo screen once todo item clicked', async () => {
    renderMockGlobalContextProvider({
      children: <Home />,
      todo: [{ id: '1234', title: 'Sample Todo', dueDate: '11/11/2024', status: 'Completed' }],
    });

    const button = screen.getByTestId('todo-1234');

    fireEvent(button, 'press');

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Todo', {
        todo: { id: '1234', title: 'Sample Todo', dueDate: '11/11/2024', status: 'Completed' },
      });
    });
  });
});

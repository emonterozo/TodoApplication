import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { Button } from '@app/components';
import { NavigationProp, TodoRouteProp } from 'src/types/navigation';
import { Status } from 'src/types/context';
import GlobalContext from '../../context/context';
import { StatusSelections } from '../../utils/constant';

const Todo = () => {
  const { todo, setTodo } = useContext(GlobalContext);
  const route = useRoute<TodoRouteProp>();
  const selectedTodo = route.params.todo;

  const navigation = useNavigation<NavigationProp>();
  const [description, setDescription] = useState(selectedTodo?.title ?? '');
  const [dueDate, setDueDate] = useState(selectedTodo?.dueDate ?? format(new Date(), 'MM/dd/yyy'));
  const [selectedStatus, setSelectedStatus] = useState(selectedTodo?.status ?? 'Pending');

  const toggleStatus = (status: string) => {
    setSelectedStatus(status as Status);
  };

  const handlePressAddEdit = () => {
    if (selectedTodo) {
      const updatedTodo = todo.map((item) =>
        item.id === selectedTodo.id
          ? { ...item, title: description, status: selectedStatus as Status, dueDate }
          : item,
      );
      setTodo(updatedTodo);
    } else {
      setTodo([
        ...todo,
        {
          id: Date.now().toString(),
          title: description,
          status: selectedStatus as Status,
          dueDate,
        },
      ]);
    }
    navigation.goBack();
  };

  const handlePressDelete = () => {
    const updatedTodo = todo.filter((item) => item.id !== selectedTodo?.id);
    setTodo(updatedTodo);
    navigation.goBack()
  };

  const isButtonDisabled = () => description === '' || dueDate === '';

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={description}
          placeholder="Enter description"
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          value={dueDate}
          placeholder="Due date (MM/DD/YYYY)"
          onChangeText={setDueDate}
        />
        <View style={styles.selection}>
          {StatusSelections.map((status) => (
            <Button
              key={status.id}
              testID={`selection-${status.title}`}
              title={status.title}
              fontSize={18}
              buttonColor={status.title === selectedStatus ? 'green' : 'white'}
              textColor={status.title === selectedStatus ? 'white' : undefined}
              onPress={() => toggleStatus(status.title)}
            />
          ))}
        </View>
        <Button
          disabled={isButtonDisabled()}
          testID="add-edit-todo"
          title={selectedTodo ? 'Update' : 'Add'}
          onPress={handlePressAddEdit}
        />
        {selectedTodo && (
          <Button
            disabled={isButtonDisabled()}
            testID="delete-todo"
            title="Delete"
            buttonColor="red"
            textColor="white"
            onPress={handlePressDelete}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginVertical: 12,
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Todo;

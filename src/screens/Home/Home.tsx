import React, { useContext, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, isAfter, parse, toDate } from 'date-fns';

import { Button } from '@app/components';
import { NavigationProp } from 'src/types/navigation';
import GlobalContext from '../../context/context';
import { Todo } from 'src/types/context';
import { StatusSelections } from '../../utils/constant';

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { todo } = useContext(GlobalContext);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState('');

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? '' : status));
  };

  const handlePressAddTodo = () => navigation.navigate('Todo', { todo: undefined });

  const isDue = (date: string) => {
    const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
    return isAfter(new Date(), parsedDate);
  };

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <TouchableOpacity
        testID={`todo-${item.id}`}
        style={[styles.card, { backgroundColor: isDue(item.dueDate) ? '#add8e6' : '#fff' }]}
        onPress={() => navigation.navigate('Todo', { todo: item })}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
          <View
            testID={`todo-status-${item.id}`}
            style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Completed' ? 'green' : 'orange' },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filterTodo = () => {
    if (selectedStatus !== '') {
      return todo.filter((item) => item.status === selectedStatus);
    } else if (search !== '') {
      return todo.filter((item) => item.title.toLowerCase() === search.toLocaleLowerCase());
    } else {
      return todo;
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        testID="search"
        style={styles.input}
        value={search}
        placeholder="Search title"
        onChangeText={setSearch}
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
      <FlatList
        data={filterTodo()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <Button testID="add-todo" title="Add Todo" onPress={handlePressAddTodo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default Home;

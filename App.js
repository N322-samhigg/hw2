import { useState } from 'react';
import { Dimensions, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const width = Dimensions.get('window').width;

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    if (item.trim().length === 0) return;

    setList([...list, {id: Date.now().toString(), name: item}]);
    setItem("");
  }
  const removeItem = (id) => {
    setList(list.filter((g) => g.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder='To-Do Item' 
          style={styles.textInput}
          value={item}
          onChangeText={setItem}>
        </TextInput>

        <Button title='Add' onPress={addItem} style={styles.button} />
      </View>

      <FlatList
      data = {list}
      keyExtractor={(g) => g.id}
      renderItem={({ item }) => { return(
        <View style={styles.itemRow}>
          <Text style={styles.itemText}> {item.name} </Text>
          <Pressable onPress={() =>removeItem(item.id)}>
            <Text style={styles.deleteButton}>X</Text>
          </Pressable>
        </View>
          );
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ddd",

    marginBottom: 15,
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  textInput: {
    borderColor: "#000",
    borderWidth: 2.5,
    borderRadius: 7.5,

    color: "#ddd",

    padding: 8,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#28d",
    color: "#222",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#333",

    width: width - 50,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },

  itemText: {
    color: "#ddd",
    fontSize: 16,
  },

  deleteButton: {
    fontSize: 18,
    color: "#d22",
  },
});

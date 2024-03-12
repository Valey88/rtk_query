import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useDataUsersQuery,
  useAddUsersMutation,
  useDeleteUsersMutation,
} from "./redux/dataApi";

function App() {
  const [count, setCount] = useState("");
  const [newUser, setNewUser] = useState("");
  const { data = [], isLoading } = useDataUsersQuery(count);
  const [addUser, { isError }] = useAddUsersMutation();
  const [deleteUser] = useDeleteUsersMutation();

  const addUserHandle = async () => {
    if (newUser) {
      await addUser({ name: newUser }).unwrap();
      setNewUser("");
    }
  };

  const deleteUsers = async (id) => {
    await deleteUser(id).unwrap();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="app">
      <div>
        <input type="text" onChange={(e) => setNewUser(e.target.value)} />
        <button onClick={addUserHandle}>Добавить пользователя</button>
        <h2>Фильтрация</h2>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">Все пользователи</option>
          <option value="1">1 пользователь</option>
          <option value="2">2 пользователя</option>
          <option value="3">3 пользователя</option>
          <option value="4">4 пользователя</option>
        </select>
      </div>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              {item.name}
              <button onClick={(e) => deleteUsers(item.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default App;

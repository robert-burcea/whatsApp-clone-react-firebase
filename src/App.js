import React, {useState, useEffect} from 'react'
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import db from './firebase'
import { 
    collection, onSnapshot
  } from 'firebase/firestore'
  import Login from './Login'
  import UserContext, {
    useUser, useSetUser
} from './UserContext'

function App() {
  const user = useUser();
  const changeUser = useSetUser();
  const [dataReady, setDataReady] = useState(false);

  const [rooms, setRooms] = useState([]);
  //fetch the rooms collection from db, real time collection data
  const dataFetch = () => {
        
    const colRef = collection(db, 'rooms')

    onSnapshot(colRef, (snapshot) => {
        let roomsCopy = [];
        snapshot.docs.forEach((doc) => {
            roomsCopy.push({...doc.data(), id:doc.id})
        })
        console.log(rooms);
        setRooms(roomsCopy);
    })
  }

useEffect(() => {
    dataFetch();
},[])

  return (
    <div className="app">
      {!dataReady ? (
      <Login setDataReady={setDataReady}/>
      ) : (
      <div className="app__body">
        <Router>
          <Sidebar rooms={rooms}/>
          <Routes>

            <Route path="/rooms/:roomId" 
            element={<Chat rooms={rooms}/>} />

            <Route path="/" 
            element={<Chat rooms={rooms}/>} />

          </Routes>
        </Router>

      </div>)}
    </div>
  );
}

export default App;

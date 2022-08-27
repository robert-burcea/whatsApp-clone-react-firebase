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
        console.log(snapshot.docs)
        snapshot.docs.forEach((doc) => {
          let messagesCopy = [];
          console.log("ASTA E DATA MAI:", doc.data())
          //checking the doc for a messages collection and saving them if there is one
            const subCollectionRef = collection(db, 'rooms', doc.id, 'messages');
            if(subCollectionRef) {
              onSnapshot(subCollectionRef, (subSnapshot) => {
                subSnapshot.forEach((subDoc) => {
                  messagesCopy.push({...subDoc.data()})
                  console.log('MessagesCopy inside:', messagesCopy)
                })
              })
            }
            console.log('Messages at exit:',messagesCopy)
            roomsCopy.push({...doc.data(), id:doc.id, messages: messagesCopy})
        })
        console.log('What i get:',roomsCopy);
        setRooms(roomsCopy);
        console.log(rooms);
    })
  }

useEffect(() => {
    dataFetch();
},[])

  return (
    <div className="app">
      {!dataReady ? (
      <Login setDataReady={setDataReady}/>
      ) : rooms ? (
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

      </div>) : <p>loading...</p>}
    </div>
  );
}

export default App;

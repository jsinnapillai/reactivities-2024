/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react"
import { Header, List } from "semantic-ui-react";

 

function App() {
 const [activities, setActivities] = useState([]);

 useEffect(()=>{
   axios.get("http://localhost:5000/api/activities")
   .then((response:any) => {
    setActivities(response.data)
   })
 },[])

  return (
    <>
       <Header as ="h2" icon="users" content="Reactivities"/>
       <List>
        {activities.map((activity:any,index:number) =>  (
          <List.Item key={index}>{activity.title}</List.Item>
        ))}
       </List>
    </>
  )
}

export default App

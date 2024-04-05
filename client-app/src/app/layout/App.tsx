/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode,setEditMode]= useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ?  handleSelectActivity(id) : handleCancelSelectedActivity(); 
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrSubmitActivity = (activity : Activity) => {
    activity.id ? setActivities([...activities.filter(x => x.id == activity.id),activity]) :
    setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false);
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    console.log(id)
    setActivities([...activities.filter(x => x.id !== id)])

  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity = {handleCancelSelectedActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createorEdit = {handleCreateOrSubmitActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;

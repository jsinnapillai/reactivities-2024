/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode,setEditMode]= useState<boolean>(false);
  const [loading,setLoading]= useState<boolean>(true);
  const [submitting,setSubmitting]= useState<boolean>(false);



  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities : Activity[]  = [];
        response.forEach((activity: Activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
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


  /* Submitting Form start*/

  const handleCreateOrSubmitActivity = (activity : Activity) => {
    setSubmitting(true)
    if(activity.id)
    {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id == activity.id),activity]) 
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false)
      })
    }
    else
    {
      activity.id  = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities,{...activity }])
        setSelectedActivity(activity)
        setEditMode(false);
        setSubmitting(false)
      })

      // setActivities([...activities,{...activity,id:uuid()}])
    }
    
     /* Submitting Form end*/

  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id)
    .then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
 
   

  }

  if(loading) return <LoadingComponents />

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
          submitting= {submitting}
        />
      </Container>
    </>
  );
}

export default App;

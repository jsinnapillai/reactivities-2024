import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models";
import ActicityList from "./ActicityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean | undefined;
  openForm: (id: string) => void;
  closeForm: () => void;
  createorEdit : (activity : Activity) => void;
  deleteActivity:(id: string) => void;
  submitting : boolean;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createorEdit,
  deleteActivity,
  submitting
}: Props) => {


  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActicityList  Activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting = {submitting} />
      </Grid.Column>
      <Grid.Column width={"6"}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}

        {editMode && (
          <ActivityForm  activity={selectedActivity} closeForm={closeForm} createorEdit ={createorEdit}  submitting = {submitting}/>
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;

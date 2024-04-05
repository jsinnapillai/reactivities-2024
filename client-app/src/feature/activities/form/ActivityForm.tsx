import { Button, Form, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models";
import { ChangeEvent, useState } from "react";

interface Props{
    activity :Activity | undefined;
    closeForm: () => void;
    createorEdit : (activity : Activity) => void;
    submitting:boolean
}

const ActivityForm = ({activity:selectedActivity,closeForm,createorEdit,submitting}:Props) => {

    const initialState:Activity =  selectedActivity ?? {
        id:"",
        title:"",
        description:"",
        category:"",
        date:"",
        city:"",
        venue:"" 


    }

    const [activity,setActivity] = useState<Activity>(initialState);

    const handleSubmit = () =>{
        createorEdit(activity);
    }

    const handleinputChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ) => {

            const {name,value} = event.target;
            // console.log(name ,'-',value);
            setActivity({...activity,  [name]: value})
    }
 
  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input placeholder = "Title" value={activity.title} name = "title" onChange={handleinputChange} />
            <Form.TextArea placeholder = "Description" value={activity.description} name = "description" onChange={handleinputChange} />
            <Form.Input placeholder = "Category" value={activity.category} name = "category" onChange={handleinputChange} />
            <Form.Input type="date" placeholder = "Date" value={activity.date} name = "date" onChange={handleinputChange} />
            <Form.Input placeholder = "City" value={activity.city} name = "city" onChange={handleinputChange} />
            <Form.Input placeholder = "Venue" value={activity.venue} name = "venue" onChange={handleinputChange} />
            <Button loading={submitting}  floated="right" positive type="submit" content="Submit"  />
            <Button basic floated="right" type="button" content="Cancel" onClick={closeForm} />
 

        </Form>
    </Segment>
  )
}
export default ActivityForm
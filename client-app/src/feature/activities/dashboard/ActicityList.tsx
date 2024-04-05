import { Button, Item, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models"
import { SyntheticEvent, useState } from "react";

interface Props {
    Activities:Activity[]
    selectActivity:(id:string) => void;
    deleteActivity:(id: string) => void;
    submitting: boolean
}

const ActicityList = ({Activities,selectActivity,deleteActivity,submitting }:Props) => {
    const [target,setTarget] = useState('');

    const handleActivityDelete = (e:SyntheticEvent<HTMLButtonElement>,id:string) =>{
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }



  return (
    <Segment>
        <Item.Group divided>
        {Activities.map((activity:Activity ) => (
            <Item key={activity.id}>
                <Item.Content>
                    <Item.Header as ='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description> 
                    <div>{activity.description}</div>
                    <div>{activity.city}</div>
                    <div>{activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button floated="right" content="View" color="blue"  onClick={() => selectActivity(activity.id)}/>
                        <Button name={activity.id} loading={submitting && target === activity.id } floated="right" content="Delete" color="red"  onClick={(e) => handleActivityDelete(e,activity.id)}/>

                        <Button basic content={activity.category}   />
                    </Item.Extra>
                </Item.Content>
            </Item>
        ))
}
        </Item.Group>
    </Segment>
  )
}
export default ActicityList
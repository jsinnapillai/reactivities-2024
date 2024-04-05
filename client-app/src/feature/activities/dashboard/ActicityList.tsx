import { Button, Item, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models"

interface Props {
    Activities:Activity[]
    selectActivity:(id:string) => void;
    deleteActivity:(id: string) => void;
}

const ActicityList = ({Activities,selectActivity,deleteActivity }:Props) => {
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
                        <Button floated="right" content="Delete" color="red"  onClick={() => deleteActivity(activity.id)}/>

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
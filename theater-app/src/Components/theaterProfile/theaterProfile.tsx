import { useContext, useEffect, useState } from "react"
import { Button, Form, Icon, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/AuthContext"
import { db } from "../../firebase";

type AuditionsType = {
    title?: string;
    dates?: string;
    callbacks?: string;
    image?: string;
    address?: string;
    signUp?: string;
}

type PerformancesType = {
    title?: string;
    dates?: string;
    image?: string;
    address?: string;
    buyTickets?: string;
}

type TheaterType = {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    zipCode?: string;
    theater_uid?: string;
    upcomingAuditions?: AuditionsType[];
    upcomingPerformances?: PerformancesType[];
}


export function TheaterProfile() {

    const [theaterInfo, setTheaterInfo] = useState<TheaterType>()
    const [addAudition, setAddAudition] = useState<boolean>()
    const [addPerformance, setAddPerformance] = useState<boolean>()

    const user = useContext(AuthContext)
    const uid = user?.uid;
    // console.log("User UID", uid);

    let theaterData: TheaterType | undefined;
    let docRef = db.collection("theaters").doc(uid)

    useEffect(() => {
        async function getdata() {
            const theaterObject = await docRef.get().then(doc => {
                // console.log("docref data", doc.data())
                theaterData = { ...doc.data() };
            }).catch(error => {
                console.log(error)
            })
            setTheaterInfo({
                ...theaterData
            })
        }
        getdata()
    }, [user, setTheaterInfo])

    console.log("Theater Name", theaterInfo?.name)

    function handleAddAudition() {
        setAddAudition(true)
    }

    function handleSubmitNewAudition() {
        setAddAudition(false)
    }
    function handleAddPerformance() {
        setAddPerformance(true)
    }

    function handleSubmitNewPerformance() {
        setAddPerformance(false)
    }

    return (
        <div>
            <h1>Welcome, {theaterInfo?.name}</h1>
            <Segment raised>Email: {theaterInfo?.email}</Segment>
            <Segment raised>Zip Code: {theaterInfo?.zipCode}</Segment>
            <Segment raised>Phone Number: {theaterInfo?.phone}</Segment>
            <Segment raised>Website: {theaterInfo?.website}</Segment>
            <Segment raised>
                {addAudition ? <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Audition Dates</label>
                        <input type="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Callback Date</label>
                        <input type="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Add an Image URL</label>
                        <input type="url" placeholder="https://your_image_url_here.jpg" />
                    </Form.Field>
                    <Form.Field>
                        <label>Add a Link to Sign Up for Auditions</label>
                        <input type="url" placeholder="https://your_audition_webpage_here.com" />
                    </Form.Field>
                    <Button onClick={handleSubmitNewAudition} type="submit">Add Audition</Button>
                </Form> :
                    <Button onClick={handleAddAudition}><Icon name="add" />Add an Upcoming Audition</Button>}
            </Segment>
            <Segment raised>
                {addPerformance ? <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Opening Performance Data</label>
                        <input type="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Closing Performance Data</label>
                        <input type="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Add an Image URL</label>
                        <input type="url" placeholder="https://your_image_url_here.jpg" />
                    </Form.Field>
                    <Form.Field>
                        <label>Add a Link to Buy Tickets for Your Performances</label>
                        <input type="url" placeholder="https://your_performance_webpage_here.com" />
                    </Form.Field>
                    <Button onClick={handleSubmitNewPerformance} type="submit">Add Performance</Button>
                </Form> :
                    <Button onClick={handleAddPerformance}><Icon name="add" />Add an Upcoming Performance</Button>}
            </Segment>
        </div>
    )
}
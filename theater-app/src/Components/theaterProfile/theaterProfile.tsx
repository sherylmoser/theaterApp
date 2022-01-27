import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { Button, Form, Icon, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/AuthContext"
import { db } from "../../firebase";
import firebase from "firebase";

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
}


export function TheaterProfile() {
    // Page and global state
    const [theaterInfo, setTheaterInfo] = useState<TheaterType>()
    const [addAudition, setAddAudition] = useState<boolean>()
    const [addPerformance, setAddPerformance] = useState<boolean>()

    const { user } = useContext(AuthContext)
    const uid = user?.uid;
     // Audition form state
     const [auditionTitle, setAuditionTitle] = useState<string | ''>('')
     const [auditionStartDate, setAuditionStartDate] = useState('')
     const [auditionEndDate ,setAuditionEndDate] = useState('')
     const [auditionCallbackDate, setAuditionCallbackDate] = useState('')
     const [auditionImage, setAuditionImage] = useState('')
     const [auditionWebsite, setauditionWebsite] = useState('')
     const [auditionAddress, setauditionAddress] = useState('')
     // Performance form state 
     const [performanceTitle, setPerformanceTitle] = useState<string | ''>('')
     const [performanceStartDate, setPerformanceStartDate] = useState('')
     const [performanceEndDate ,setPerformanceEndDate] = useState('')
     const [performanceImage, setPerformanceImage] = useState('')
     const [performanceWebsite, setPerformanceWebsite] = useState('')
     const [performanceAddress, setPerformanceAddress] = useState('')
 
    let theaterData: TheaterType | undefined;
    let docRef = db.collection("theaters").doc(uid)

    useEffect(() => {
        async function getdata() {
            const theaterObject = await docRef.get().then(doc => {
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

    // Page view show hide form handlers
    function handleAddAudition() {
        setAddAudition(true)
    }
    function handleAddPerformance() {
        setAddPerformance(true)
    }
    
    // Audition form handler and update firebase collection
    async function handleSubmitNewAudition(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const startDate = new Date(auditionStartDate);
            const startMonth = startDate?.toLocaleString('en-US', { month: 'short' });
            const startDay = startDate?.toLocaleString('en-US', { day: '2-digit' });
            const startYear = startDate?.getFullYear();
    
            const endDate = new Date(auditionEndDate);
            const endMonth = endDate?.toLocaleString('en-US', { month: 'short' });
            const endDay = endDate?.toLocaleString('en-US', { day: '2-digit' });
            const endYear = endDate?.getFullYear();
    
            const callbackDate = new Date(auditionCallbackDate)
            const callbackMonth = callbackDate?.toLocaleString('en-US', { month: 'short' });
            const callbackDay = callbackDate?.toLocaleString('en-US', { day: '2-digit' });
            const callbackYear = callbackDate?.getFullYear();
    
            console.log(`${startMonth} ${startDay} - ${endMonth} ${endDay}`,`${callbackMonth} ${callbackDay} ${callbackYear}` )
            // Moving form data to firebase
            await firebase.firestore().collection('upcomingAuditions').doc(auditionTitle)
                    .set({
                        address: auditionAddress,
                        callbacks: `${callbackMonth} ${callbackDay}`,
                        dates: `${startMonth} ${startDay}-${endDay}`,
                        image: auditionImage,
                        signUp: auditionWebsite,
                        theater_name: user?.displayName,
                        theater_uid: uid,
                        title: auditionTitle
                    })
            setAuditionTitle('')
            setAuditionStartDate('')
            setAuditionEndDate('')
            setAuditionCallbackDate('')
            setauditionAddress('')
            setAuditionImage('')
            setauditionWebsite('')
            setAddAudition(false)
        } catch(e) {
            alert(e)
        }
    }
    // Performance form handler and update firebase collection
    async function handleSubmitNewPerformance(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const startDate = new Date(performanceStartDate);
            const startMonth = startDate?.toLocaleString('en-US', { month: 'short' });
            const startDay = startDate?.toLocaleString('en-US', { day: '2-digit' });
            const startYear = startDate?.getFullYear();
    
            const endDate = new Date(performanceEndDate);
            const endMonth = endDate?.toLocaleString('en-US', { month: 'short' });
            const endDay = endDate?.toLocaleString('en-US', { day: '2-digit' });
            const endYear = endDate?.getFullYear();        
    
            await firebase.firestore().collection('upcomingPerformances').doc(performanceTitle)
            .set({
                address: performanceAddress,
                buyTickets: performanceWebsite ,
                endDate: `${endMonth} ${endDay}`,
                image: performanceImage,
                startDate: `${startMonth} ${startDay}`,
                theater_name: user?.displayName,
                theaer_uid: uid,
                title: performanceTitle
            })
            setPerformanceTitle('')
            setPerformanceStartDate('')
            setPerformanceEndDate('')
            setPerformanceAddress('')
            setPerformanceImage('')
            setPerformanceWebsite('')
            setAddPerformance(false)
        } catch(e) {
            alert(e)
        }
    }
    // Audition form handlers
    function auditionTitleHandler(e:ChangeEvent<HTMLInputElement>) {
        setAuditionTitle(e.target.value)
    }
    function auditionStartDateHandler(e:ChangeEvent<HTMLInputElement>) {
        setAuditionStartDate(e.target.value)
    }
    function auditionEndDateHandler(e:ChangeEvent<HTMLInputElement>) {
        setAuditionEndDate(e.target.value)
    }
    function auditionCallbackDateHandler(e:ChangeEvent<HTMLInputElement>) {
        setAuditionCallbackDate(e.target.value)
    }
    function auditionAddressHandler(e:ChangeEvent<HTMLInputElement>) {
        setauditionAddress(e.target.value)
    }
    function auditionImageHandler(e:ChangeEvent<HTMLInputElement>) {
        setAuditionImage(e.target.value)
    }
    function auditionWebsiteHandler(e:ChangeEvent<HTMLInputElement>) {
        setauditionWebsite(e.target.value)
    }
    // Performance form handlers
    function performanceTitleHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceTitle(e.target.value)
    }
    function performanceStartDateHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceStartDate(e.target.value)
    }
    function performanceEndDateHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceEndDate(e.target.value)
    }
    function performanceAddressHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceAddress(e.target.value)
    }
    function performanceImageHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceImage(e.target.value)
    }
    function performanceWebsiteHandler(e:ChangeEvent<HTMLInputElement>) {
        setPerformanceWebsite(e.target.value)
    }
    return (
        <div>
            <h2>Welcome, {theaterInfo?.name}</h2>
            <Segment raised>Email: {theaterInfo?.email}</Segment>
            <Segment raised>Zip Code: {theaterInfo?.zipCode}</Segment>
            <Segment raised>Phone Number: {theaterInfo?.phone}</Segment>
            <Segment raised>Website: {theaterInfo?.website}</Segment>
            <Segment raised>
                {addAudition ? <Form onSubmit={handleSubmitNewAudition}>
                    <Form.Field>
                        <label>Title</label>
                        <input required onChange={auditionTitleHandler} value={auditionTitle} type="text" placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Audition Start Date</label>
                        <input required onChange={auditionStartDateHandler} type="date" value={auditionStartDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Audition End Date</label>
                        <input required onChange={auditionEndDateHandler} type="date" value={auditionEndDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Callback Date</label>
                        <input required onChange={auditionCallbackDateHandler} type="date" value={auditionCallbackDate} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input required onChange={auditionAddressHandler} type="text" placeholder="Address" value={auditionAddress} />
                    </Form.Field>
                    <Form.Field>
                        <label>Add an Image URL</label>
                        <input onChange={auditionImageHandler} type="url" placeholder="https://your_image_url_here.jpg" value={auditionImage} />
                    </Form.Field>
                    <Form.Field>
                        <label>Add a Link to Sign Up for Auditions</label>
                        <input required onChange={auditionWebsiteHandler} type="url" placeholder="https://your_audition_webpage_here.com" value={auditionWebsite} />
                    </Form.Field>
                    <Button type="submit">Add Audition</Button>
                </Form> :
                    <Button onClick={handleAddAudition}><Icon name="add" />Add an Upcoming Audition</Button>}
            </Segment>
            <Segment raised>
                {addPerformance ? <Form onSubmit={handleSubmitNewPerformance}>
                <Form.Field>
                        <label>Title</label>
                        <input required onChange={performanceTitleHandler} value={performanceTitle} type="text" placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Opening Performance Data</label>
                        <input required onChange={performanceStartDateHandler} type="date" value={performanceStartDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Closing Performance Data</label>
                        <input required onChange={performanceEndDateHandler} type="date" value={performanceEndDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input required onChange={performanceAddressHandler} type="text" placeholder="Address" value={performanceAddress} />
                    </Form.Field>
                    <Form.Field>
                        <label>Add an Image URL</label>
                        <input onChange={performanceImageHandler} type="url" placeholder="https://your_image_url_here.jpg" value={performanceImage} />
                    </Form.Field>
                    <Form.Field>
                        <label>Add a Link to Buy Tickets for Your Performances</label>
                        <input required onChange={performanceWebsiteHandler} type="url" placeholder="https://your_performance_webpage_here.com" value={performanceWebsite}/>
                    </Form.Field>
                    <Button type="submit">Add Performance</Button>
                </Form> :
                    <Button onClick={handleAddPerformance}><Icon name="add" />Add an Upcoming Performance</Button>}
            </Segment>
        </div>
    )
}
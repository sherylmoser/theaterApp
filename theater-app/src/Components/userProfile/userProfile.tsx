import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Button, Form, Icon, Input, Label, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/AuthContext"
import { db } from "../../firebase";

type UserType = {
    firstName?: string;
    lastName?: string;
    zipCode?: string;
    user_uid?: string;
    connectedTheaters?: string[];
}


export function UserProfile() {

    const [userInfo, setUserInfo] = useState<UserType>()
    const [edit, setEdit] = useState<boolean>()
    const [email, setEmail] = useState('')
    const { user } = useContext(AuthContext)
    const uid = user?.uid;
    // console.log("User UID", uid);

    let userData: UserType | undefined;
    let docRef = db.collection("users").doc(uid)

    useEffect(() => {
        async function getdata() {
            const userObject = await docRef.get().then(doc => {
                // console.log("docref data", doc.data())
                userData = { ...doc.data() };
            }).catch(error => {
                console.log(error)
            })
            setUserInfo({
                ...userData
            })
        }
        getdata()
    }, [user, setUserInfo])

    console.log("userName", userInfo?.firstName)

    function handleEdit() {
        edit ? setEdit(false) : setEdit(true);
    }

    function handleSubmit() {
        console.log("submitted info", userInfo)
    }

    function firstNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, firstName: e.target.value });
    }

    function lastNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, lastName: e.target.value });
    }

    function emailHandler(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }
    function zipCodeHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, zipCode: e.target.value });
    }

    return (
        <div>
            <h2 className="profile-header">Welcome, {userInfo?.firstName}</h2>
            {edit ?
                <div>
                    <Button onClick={() => { handleEdit(); handleSubmit() }}>Submit Edit</Button>
                    <Form>
                        <Form.Field>
                            <Label pointing="below">First Name</Label>
                            <input type='text' name="firstName" onChange={firstNameHandler} value={userInfo?.firstName} />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Last Name</Label>
                            <input type='text' name="lastName" onChange={lastNameHandler} value={userInfo?.lastName} />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Email</Label>
                            {/* the email input value is having type issues I can't figure out how to solve */}
                            <input type='text' name="email" onChange={emailHandler} value={email} />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Zip Code</Label>
                            <input type='text' name="zipCode" onChange={zipCodeHandler} value={userInfo?.zipCode} />
                        </Form.Field>
                    </Form>
                </div>
                :
                <div>
                    <Button onClick={handleEdit}>Edit Profile</Button>
                    <Segment>First Name: {userInfo?.firstName}</Segment>
                    <Segment>Last Name: {userInfo?.lastName}</Segment>
                    <Segment>Email: {user?.email}</Segment>
                    <Segment>Zipcode: {userInfo?.zipCode}</Segment>
                </div>
            }

        </div>
    )
}
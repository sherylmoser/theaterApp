import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Button, Form, Icon, Input, Label, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/AuthContext"
import { auth, db } from "../../firebase";

type UserType = {
    firstName?: string;
    lastName?: string;
    email?: string;
    zipCode?: string;
    user_uid?: string;
    connectedTheaters?: string[];
}

export function UserProfile() {

    const [userInfo, setUserInfo] = useState<UserType>()
    const [edit, setEdit] = useState<boolean>()
    const { user } = useContext(AuthContext)
    const uid = user?.uid;

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

    function handleEdit() {
        setEdit(!edit)
    }

    async function handleSubmit() {
        try {
            if (userInfo?.email && userInfo?.email != user?.email) {
                await auth.currentUser?.updateEmail(userInfo?.email);
                await docRef.set({
                    firstName: userInfo?.firstName,
                    lastName: userInfo?.lastName,
                    zipCode: userInfo?.zipCode,
                    email: userInfo?.email
                })
             } else {
                await docRef.set({
                    firstName: userInfo?.firstName,
                    lastName: userInfo?.lastName,
                    zipCode: userInfo?.zipCode,
                    email: userInfo?.email
                })
             } 
        } catch(e:any)
         {
            alert(e.code)
        }
         handleEdit()
    }

    function firstNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, firstName: e.target.value });
    }
    function lastNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, lastName: e.target.value });
    }
    function emailHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, email: e.target.value });
    }
    function zipCodeHandler(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, zipCode: e.target.value });
    }

    return (
        <div>
            <h2 className="profile-header">Welcome, {userInfo?.firstName}</h2>
            {edit ?
                <div>
                    <Button onClick={handleEdit}>Profile</Button>
                    <Form onSubmit={handleSubmit}>
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
                            <input type='email' name="email" onChange={emailHandler} value={userInfo?.email} />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Zip Code</Label>
                            <input type='text' name="zipCode" onChange={zipCodeHandler} value={userInfo?.zipCode} />
                        </Form.Field>
                        <input type="submit" value="Add Changes" />
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
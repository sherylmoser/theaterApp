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

    function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, firstName: e.target.value })
    }

    function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setUserInfo({ ...userInfo, lastName: e.target.value })
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    return (
        <div>
            <h2 className="profile-header">Welcome, {userInfo?.firstName}</h2>
            <Button onClick={handleEdit}>{edit ? 'Submit Edit' : 'Edit Profile'}</Button>
            {edit ?
                <Form>

                </Form>
                :
                <div>
                    <Segment>First Name: {userInfo?.firstName}</Segment>
                    <Segment>Last Name: {userInfo?.lastName}</Segment>
                    <Segment>Email: {userInfo?.lastName}</Segment>
                </div>
            }

        </div>
    )
}
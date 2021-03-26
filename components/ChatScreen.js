import { Avatar, Icon, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import MoreVertIcon from '@material-ui/icons/MoreVert'

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import styled from "styled-components"
import { auth, db } from "../firebase";
import Message  from "./Message";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import firebase from "firebase"

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);

    const [input,setInput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', "asc"));

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                key = { message.id}
                user = { message.data.user }
                message = {{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ))
        }
        else {
            return JSON.parse(messages).map(message => (
                <Message key={ message.id } user={ message.user }
                message={ message} />
            ))
        }
    }

    return (
        <Container>
            <Header>
                <Avatar/>
                <HeaderInformation>
                    <h3>Email</h3>
                    <p>Last Seen ...</p>
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}

                <EndOfMessage/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon/>
                <Input value = {input} onChange={e => setInput(e.target.value) } />
                <button hidden disabled={!input} type = "submit" onClick={sendMessage} >Send Message</button>
                <MicIcon/>
            </InputContainer>

        </Container>
    )
}

const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, {merge: true})
    db.collection("chats").doc(router.query.id).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email, 
        photoURL: user.photoURL,
    })

    setInput("");
}

export default ChatScreen

const Container = styled.div`
`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color:white;
z-index: 100;
`;

const Input = styled.input`
flex: 1;
outline: 0;
border-radius: 10px;
padding: 20px;
background-color:whitesmoke;
border: none;
margin-left: 15px;
margin-right: 15px;
`;

const Header = styled.div`
    position:sticky;
    background-color:white;
    z-index:100;
    top: 0;
    display:flex;
    padding: 11px;
    height:80px;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3{
        margin-bottom: 3px;
    }

    >p {
        font-size: 14px;
        color: gray;
    }
`
const MessageContainer = styled.div`
    padding:30px;
    background-color:#e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div``;

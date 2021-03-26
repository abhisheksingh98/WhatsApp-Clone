import Head from "next/head";
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";

function Chat() {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>

            <ChatContainer>
                <ChatScreen/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    //PREP the messages on the server
    const messagesRes = await ref.collection("messages").order("timestamp","asc").get();
}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height:100vh;

    ::-webkit-scrollbar {
        display: none;
    }

    --ms-overflow-style: none; /*IE and Edge */
    scrollbar-width: none; /*FireFox */
`
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/Chat/Action";
import { LockClosedIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

const ChatBox = ({ userRole}) => {
  const [messages, setMessages] = useState("");
  const [change, setChange] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { chat, auth, subscription } = useSelector((store) => store);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (e) => setMessages(e.target.value);

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat) {
      dispatch(fetchChatMessages(chat.chat?.id));
    }
  }, [chat.chat, change, dispatch]);

  const handleSendMessage = () => {
    if (messages.trim()) {
      dispatch(
        sendMessage({
          message: {
            senderId: auth.user?.id,
            projectId: id,
            content: messages,
          },
          sendToServer: sendMessageToServer,
        })
      );
      setMessages("");
    }
  };

  // ---------------code for websocket------------------

  useEffect(() => {
    const connect = () => {
      const sock = new SockJS("http://localhost:5054/ws");
      const client = Stomp.over(sock);

      client.connect({}, function () {
        client.subscribe(`/chatroom/public`, (message) => {
          //console.log("to receive message: ", message);
          const receivedMessage = JSON.parse(message.body);
          setChange(receivedMessage);
        });
      });

      setStompClient(client);
      setIsConnected(true);

      return () => {
        client.disconnect();
        setIsConnected(false);
      };
    };

    connect();
  }, []);

  const sendMessageToServer = (message) => {
    //console.log("to send message: ", message);
    if (stompClient && message.trim()) {
      stompClient.send(`/app/message`, {}, JSON.stringify(message));
      sendMessageToServer("");
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, change]);

  return (
    <div className="sticky top-[100px] bg-background">
      <div className="border rounded-lg">
        <h1 className="border-b p-5 text-base font-semibold">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item, index) =>
            item?.sender.id !== auth?.user.id ? (
              <div key={item.id || index} className="flex gap-2 mb-4">
                <Avatar className="mt-auto">
                  <AvatarFallback>{item?.sender.fullName[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl bg-background`}
                >
                  <p className="text-gray-300 font-semibold">
                    {item.sender?.fullName}
                  </p>
                  <p className="text-gray-400">{item?.content}</p>
                </div>
              </div>
            ) : (
              <div key={item} className="flex mb-4 gap-2 justify-end ">
                <div
                  className={`space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl bg-background`}
                >
                  <p className="text-gray-300 font-semibold">
                    {item.sender?.fullName}
                  </p>
                  <p className="text-gray-400">{item?.content}</p>
                </div>
                <Avatar className="mt-auto">
                  <AvatarFallback>{item?.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
          <div ref={chatContainerRef}></div>
        </ScrollArea>
        <div className="relative p-0">
          {(subscription.userSubscription?.subscriptiontype === "PAID" || userRole === "OWNER" || userRole === "MANAGER") ? (
            <>
              <Input
                value={messages}
                onChange={handleMessageChange}
                onKeyUp={(e) => {
                  if (e.key == "Enter" || e.key == 13) {
                    handleSendMessage();
                  }
                }}
                placeholder="type message..."
                className="py-7 border-t outline-none border-inherit focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
              />
              <Button
                onClick={handleSendMessage}
                className="absolute right-2 top-3 rounded-full"
                size="icon"
                variant="ghost"
              >
                <PaperPlaneIcon />
              </Button>
            </>
          ) : (
            <div className="flex gap-2 items-center justify-center text-red-400 py-5 border-t border-inherit">
              <span>please upgrade your plan to start chatting</span>
              <LockClosedIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

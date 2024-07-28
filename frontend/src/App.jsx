/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Auth/Action";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetails from "./pages/Project/ProjectDetails";
import IssueDetails from "./pages/Issue/IssueDetails";
import UpdateProjectForm from "./pages/Project/UpdateProjectForm";
import Loader from "./pages/Loader/Loader";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
import Subscription from "./pages/subscription/Subscription";
import UpgradeSuccess from "./pages/subscription/UpgradeSuccess";
import { getUserSubscription } from "./redux/Subscription/Action";
import UpgradeFailure from "./pages/subscription/UpgradeFailure";
import { fetchProjects } from "./redux/Project/Project.Action";
import AuthPage from "./pages/Auth/AuthPage";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [change, setChange] = useState(0);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")));
    dispatch(fetchProjects({}));
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    const connect = () => {
      const sock = new SockJS("http://localhost:5054/ws");
      const client = Stomp.over(sock);

      client.connect({}, function () {
        client.subscribe(`/all/public`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          toast({ description: receivedMessage });
          //console.log("Received Message: ", receivedMessage);
          setChange(Math.random() * 100);
        });
      });

      setStompClient(client);
      setIsConnected(true);

      return () => {
        client.disconnect();
        setIsConnected(false);
      };
    };

    if (auth.user !== null) {
      connect();
    }
  }, [auth.user, change]);

  const sendRefresh = (message) => {
    //console.log("to send message: ", message);
    if (stompClient && message.trim()) {
      stompClient.send(
        `/app/refresh`,
        {},
        JSON.stringify(`${message} at ${new Date()}`)
      );
      setChange(Math.random() * 100);
      sendRefresh("");
    }
  };

  return (
    <>
      {auth.loading ? (
        <Loader />
      ) : auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home change={change} sendRefresh={sendRefresh} />}
            ></Route>
            <Route
              path="/project/:id"
              element={
                <ProjectDetails change={change} sendRefresh={sendRefresh} />
              }
            ></Route>
            <Route
              path="/project/update/:id"
              element={
                <UpdateProjectForm change={change} sendRefresh={sendRefresh} />
              }
            ></Route>
            <Route
              path="/project/:projectId/issue/:issueId"
              element={
                <IssueDetails change={change} sendRefresh={sendRefresh} />
              }
            ></Route>
            <Route
              path="/accept_invitation"
              element={
                <AcceptInvitation change={change} sendRefresh={sendRefresh} />
              }
            ></Route>
            <Route path="/upgrade_plan" element={<Subscription />}></Route>
            <Route
              path="/upgrade_plan/success"
              element={<UpgradeSuccess />}
            ></Route>
            <Route path="/upgrade_plan/failure" element={<UpgradeFailure />} />
          </Routes>
          <Toaster />
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;

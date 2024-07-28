/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { acceptInvitation } from "@/redux/Project/Project.Action";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AcceptInvitation = ({ sendRefresh }) => {
  const dipatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAcceptInvitation = () => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    //console.log("token ", token);
    dipatch(acceptInvitation({ invitationToken: token, navigate }));
    sendRefresh("New Member Added to Project !");
  };
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center absolute mt-24 w-full">
      <div className="flex flex-col items-center">
        <h1 className="py-5 font-semibold text-xl">
          you are invited to join the project
        </h1>
        <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
      </div>
    </div>
  );
};

export default AcceptInvitation;

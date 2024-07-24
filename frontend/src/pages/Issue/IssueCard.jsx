/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { deleteIssue } from "@/redux/Issue/Issue.action";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditIssueForm from "./EditIssueForm";

const IssueCard = ({
  item,
  setIsEdited,
  isEdited,
  labels,
  deadline,
  change,
  sendRefresh,
  userRole,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { project, auth } = useSelector((store) => store);
  const handleDelete = () => {
    dispatch(deleteIssue(item.id));
    sendRefresh("refresh");
  };
  return (
    <Card className="rounded-md py-2 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer text-base font-medium hover:text-gray-300"
            onClick={() => navigate(`/project/${id}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>
          {(auth.user?.id === project.projectDetails?.owner.id ||
            userRole === "OWNER" ||
            userRole === "MANAGER") && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <Button
                  className="rounded-full focus:outline-none"
                  variant="ghost"
                  size="icon"
                >
                  <DotsVerticalIcon />{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <EditIssueForm
                      issue={item}
                      isEdited={isEdited}
                      setIsEdited={setIsEdited}
                      labels={labels}
                      deadline={deadline}
                      change={change}
                      sendRefresh={sendRefresh}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-gray-400" style={{ wordBreak: "break-word" }}>
            {item.description}
          </p>

          <DropdownMenu className="w-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button
                className="bg-gray-900 border border-inherit hover:text-black text-white rounded-full"
                size="icon"
              >
                <Avatar>
                  <AvatarFallback>
                    {item.assignee?.fullName[0].toUpperCase() || (
                      <PersonIcon className="text-[#ea580c]" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList
                issueDetails={item}
                change={change}
                sendRefresh={sendRefresh}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;

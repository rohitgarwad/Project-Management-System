/* eslint-disable react/prop-types */
import { ScrollArea } from "@/components/ui/scroll-area";
import { IssueList } from "../Issue/IssueList";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllUsersProjectRoles,
  fetchProjectById,
  fetchUserProjectRole,
  updateUsersProjectRole,
} from "@/redux/Project/Project.Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LockClosedIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteUserForm from "./InviteUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/custome/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectDetails = ({ change, sendRefresh }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const [isRoleUpdated, setIsRoleUpdated] = useState(false);
  const { issue, project, auth, subscription } = useSelector((store) => store);

  const authUserId = auth?.user?.id;

  const userRole = project?.userProjectRole?.roleType;

  const teamSize = project?.projectDetails?.team?.length;

  useEffect(() => {
    dispatch(fetchProjectById(id));
    dispatch(fetchAllUsersProjectRoles(id));
    dispatch(fetchUserProjectRole(id, authUserId));
    // console.log("issue: ", issue);
    // console.log("project: ", project);
    // console.log("auth: ", auth);
  }, [
    id,
    issue.issues.length,
    isEdited,
    dispatch,
    authUserId,
    change,
    teamSize,
  ]);

  //console.log("project team size: ", project?.projectDetails?.team?.length);

  const handleRoleChange = (value, userId, oldRoleType) => {
    // console.log("newRoleType: ", value);
    // console.log("userId: ", userId);
    // console.log("oldRoleType: ", oldRoleType);
    const updateRoleData = {
      projectId: id,
      userId: userId,
      oldRoleType: oldRoleType,
      newRoleType: value,
    };
    // console.log("updateRoleData: ", updateRoleData);
    dispatch(updateUsersProjectRole(updateRoleData));
    setIsRoleUpdated(isRoleUpdated ? false : true);
    sendRefresh("Role Changed !");
  };

  return (
    <>
      <div className="mt-16 h-[93vh] w-full pt-10 pb-5 px-2 lg:px-10 absolute bg-background">
        <div className="xl:flex gap-5 h-full justify-between text-sm">
          <ScrollArea className="xl:w-[69%] pr-2 bg-background">
            <p className="pb-5 border-b text-xl tracking-wider font-bold text-gray-200">
              Project Details
            </p>
            <div className="text-gray-400 pt-5 pb-10 w-full">
              <h1 className="text-xl text-gray-200 pb-5">
                {project.projectDetails?.name}
              </h1>

              <div className="flex justify-between flex-col lg:flex-row">
                <div className="space-y-5 pb-10 lg:min-w-[50%]">
                  <p className="w-full md:max-w-lg lg:max-w-xl">
                    {project.projectDetails?.description}
                  </p>
                  <div className="flex">
                    <p className="w-36 font-black text-gray-300">
                      Project Lead{" "}
                    </p>
                    <p>{project.projectDetails?.owner?.fullName}</p>
                  </div>
                  <div className="flex  text-gray-300">
                    <p className="w-36 font-black text-gray-300">Members </p>
                    <div className="flex items-center gap-2">
                      <>
                        {project.projectRoles?.map((item, index) => (
                          <Avatar
                            className={`cursor-pointer text-white`}
                            key={item?.id || index}
                          >
                            <AvatarFallback
                              className={`${
                                item?.roleType === "OWNER"
                                  ? "bg-orange-700"
                                  : item?.roleType === "MANAGER"
                                  ? "bg-yellow-600"
                                  : "bg-blue-600"
                              }`}
                            >
                              {item?.user?.fullName[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </>
                      <>
                        {subscription.userSubscription?.planType === "FREE" &&
                        (userRole === "OWNER" || userRole === "MANAGER") &&
                        teamSize >= 3 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <LockClosedIcon className="text-red-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  you can invite only 3 members with free plan,
                                  please upgrade your plan
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <>
                            {(auth.user?.id ===
                              project.projectDetails?.owner.id ||
                              userRole === "OWNER" ||
                              userRole === "MANAGER") && (
                              <Dialog>
                                <DialogTrigger>
                                  <DialogClose>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="ml-2 border-inherit"
                                    >
                                      <span className="pr-1">Invite</span>
                                      <PlusIcon />
                                    </Button>
                                  </DialogClose>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Invite User</DialogTitle>
                                  </DialogHeader>
                                  <InviteUserForm
                                    projectId={id}
                                    change={change}
                                    sendRefresh={sendRefresh}
                                  />
                                </DialogContent>
                              </Dialog>
                            )}
                          </>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="flex">
                    <p className="w-36 font-black text-gray-300">Category </p>
                    <p>{project.projectDetails?.category}</p>
                  </div>
                  <div className="flex">
                    <p className="w-36 font-black text-gray-300">Deadline </p>
                    <p>
                      {project.projectDetails
                        ? new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "full",
                          }).format(new Date(project.projectDetails.deadline))
                        : project.projectDetails?.deadline}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-36 font-black text-gray-300">Status </p>
                    {project?.projectDetails?.status == "done" ? (
                      <Badge className={`bg-green-400`}>
                        {project?.projectDetails?.status}
                      </Badge>
                    ) : (
                      <Badge className={`bg-orange-400`}>
                        {project?.projectDetails?.status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex">
                    <p className="min-w-36 font-black text-gray-300">
                      Technologies{" "}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {project?.projectDetails?.tags?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* team members */}
                <div className="lg:min-w-[50%] pb-10 px-4">
                  <div className="flex items-center justify-center [&>div]:w-full">
                    <Card>
                      <CardHeader className="border-b">
                        <h3 className="font-semibold leading-none">
                          Team Members
                        </h3>
                        <CardDescription>
                          Invite your team members to collaborate
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[25vh]">
                          <div className="p-6 pl-0 pb-0 grid gap-6">
                            {project?.projectRoles?.map(
                              (projectRole, index) => (
                                <div
                                  key={projectRole?.id || index}
                                  className="flex items-center justify-between space-x-4"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center gap-2">
                                      <Avatar className={`cursor-pointer`}>
                                        <AvatarFallback
                                          className={`${
                                            projectRole?.roleType === "OWNER"
                                              ? "bg-orange-700"
                                              : projectRole?.roleType ===
                                                "MANAGER"
                                              ? "bg-yellow-600"
                                              : "bg-blue-600"
                                          }`}
                                        >
                                          {projectRole?.user?.fullName[0]}
                                        </AvatarFallback>
                                      </Avatar>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium leading-none">
                                        {projectRole?.user?.fullName}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {projectRole?.user?.email}
                                      </p>
                                    </div>
                                  </div>
                                  {userRole === "OWNER" &&
                                  projectRole?.roleType !== "OWNER" ? (
                                    <Select
                                      value={`${projectRole?.roleType}`}
                                      onValueChange={(value) =>
                                        handleRoleChange(
                                          value,
                                          projectRole?.user?.id,
                                          projectRole?.roleType
                                        )
                                      }
                                    >
                                      <SelectTrigger
                                        className={`${
                                          projectRole?.roleType === "MANAGER"
                                            ? "bg-yellow-600 w-[110px]"
                                            : "bg-blue-600 w-[110px]"
                                        }`}
                                      >
                                        <SelectValue
                                          placeholder={`${projectRole?.roleType}`}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>Role</SelectLabel>

                                          {projectRole?.roleType !==
                                            "OWNER" && (
                                            <SelectItem value="MANAGER">
                                              MANAGER
                                            </SelectItem>
                                          )}
                                          {projectRole?.roleType !==
                                            "OWNER" && (
                                            <SelectItem value="EMPLOYEE">
                                              EMPLOYEE
                                            </SelectItem>
                                          )}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger
                                            asChild
                                            className="w-[110px]"
                                          >
                                            <Button
                                              className={`${
                                                projectRole?.roleType ===
                                                "EMPLOYEE"
                                                  ? "bg-blue-600"
                                                  : projectRole?.roleType ===
                                                    "MANAGER"
                                                  ? "bg-yellow-600"
                                                  : "bg-orange-700"
                                              }`}
                                            >
                                              {projectRole?.roleType}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            {userRole !== "OWNER" ? (
                                              <p>
                                                You are not Authorized to
                                                perform this action.
                                              </p>
                                            ) : (
                                              <p>Cannot degrade OWNER role</p>
                                            )}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Issues Section */}
              <section>
                <p className="py-5 border-b text-xl tracking-wider font-bold text-gray-200">
                  Tasks
                </p>
                <div className="lg:flex-wrap lg:justify-evenly lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList
                    status="pending"
                    title={"Todo List"}
                    labels={project?.projectDetails?.tags}
                    deadline={project?.projectDetails?.deadline}
                    isEdited={isEdited}
                    setIsEdited={setIsEdited}
                    change={change}
                    sendRefresh={sendRefresh}
                    userRole={userRole}
                  />

                  <IssueList
                    status="in-progress"
                    title={"In Progress"}
                    labels={project?.projectDetails?.tags}
                    deadline={project?.projectDetails?.deadline}
                    isEdited={isEdited}
                    setIsEdited={setIsEdited}
                    change={change}
                    sendRefresh={sendRefresh}
                    userRole={userRole}
                  />

                  <IssueList
                    status="done"
                    title={"Done"}
                    labels={project?.projectDetails?.tags}
                    deadline={project?.projectDetails?.deadline}
                    isEdited={isEdited}
                    setIsEdited={setIsEdited}
                    change={change}
                    sendRefresh={sendRefresh}
                    userRole={userRole}
                  />
                </div>
              </section>
            </div>
          </ScrollArea>

          <div className="xl:w-[30%] rounded-md relative">
            <ChatBox userRole={userRole} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

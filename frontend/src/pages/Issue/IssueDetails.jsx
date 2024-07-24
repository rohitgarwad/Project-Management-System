/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateCommentForm } from "./CreateCommentForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CommentCard from "./CommentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchIssueById, updateIssueStatus } from "@/redux/Issue/Issue.action";
import { useParams } from "react-router-dom";
import { fetchComments } from "@/redux/Comment/comment.action";
import { Badge } from "@/components/ui/badge";
import {
  fetchAllUsersProjectRoles,
  fetchProjectById,
  fetchUserProjectRole,
} from "@/redux/Project/Project.Action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const IssueDetails = ({ change, sendRefresh }) => {
  const { issueId, projectId } = useParams();
  const dispatch = useDispatch();
  const { project, issue, comment, auth } = useSelector((store) => store);

  const userRole = project?.userProjectRole?.roleType;
  const authUserId = auth?.user?.id;

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
    dispatch(fetchProjectById(projectId));
    dispatch(fetchUserProjectRole(projectId, authUserId));
    dispatch(fetchAllUsersProjectRoles(projectId));
  }, [dispatch, issueId, projectId, change, authUserId]);

  //console.log("projectDetails----------", project?.projectDetails?.owner.fullName);
  const handleUpdateIssueStatus = (value) => {
    dispatch(updateIssueStatus({ id: issueId, status: value }));
    sendRefresh("refresh");
  };

  return (
    <>
      <div className="px-20 py-8 text-gray-400 mt-20 w-full absolute bg-background">
        <div className="flex justify-between border p-10 rounded-lg flex-col space-y-20 text-sm lg:space-y-0 lg:flex-row overflow-hidden bg-background">
          <div className="h-full w-full lg:w-[60%] lg:h-[70vh] ">
            <p className="pb-5 border-b text-xl tracking-wider font-bold text-gray-200">
              Issue Details
            </p>
            <div className="py-5">
              <h1 className="text-xl text-gray-200">
                {issue.issueDetails?.title}
              </h1>

              <div className="py-5">
                <h2 className="font-bold text-gray-300">Description</h2>
                <p className="text-gray-400 text-sm mt-3">
                  {issue.issueDetails?.description}
                </p>
              </div>
              <div className="mt-5 space-y-5">
                <h1 className="pb-3 border-b text-xl tracking-wider font-bold text-gray-200">
                  Activity
                </h1>
                <Tabs defaultValue="comments" className="w-full">
                  <TabsList className="mb-5">
                    <TabsTrigger className="hidden" value="all">
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      className="border border-inherit text-base font-semibold"
                      value="comments"
                    >
                      Comments
                    </TabsTrigger>
                    <TabsTrigger className="hidden" value="history">
                      History
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    All make changes to your account here.
                  </TabsContent>
                  <TabsContent value="comments">
                    <CreateCommentForm
                      issueId={issueId}
                      change={change}
                      sendRefresh={sendRefresh}
                    />
                    <ScrollArea className="w-full h-[28vh]">
                      <div className="w-[65%] mt-8 space-y-6">
                        {comment.comments.toReversed().map((item, index) => (
                          <CommentCard
                            item={item}
                            key={index}
                            change={change}
                            sendRefresh={sendRefresh}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="history">
                    History Change your password here.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%] space-y-4 sticky">
            <p className="text-white text-base font-semibold">Update Status</p>
            {auth?.user?.id === project?.projectDetails?.owner?.id ||
            userRole === "OWNER" ||
            userRole === "MANAGER" ||
            auth?.user?.id === issue?.issueDetails?.assignee?.id ? (
              <Select
                value={issue.issueDetails?.status}
                onValueChange={handleUpdateIssueStatus}
              >
                <SelectTrigger className="w-[180px] border-inherit">
                  <SelectValue placeholder={issue.issueDetails?.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="w-[110px]">
                    <Button
                      className={`${
                        issue.issueDetails?.status == "in-progress"
                          ? "bg-orange-500"
                          : issue.issueDetails?.status == "done"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {issue?.issueDetails?.status}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You are not Authorized to perform this action.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <div className="border rounded-lg">
              <p className="border-b py-3 px-5 text-base text-gray-200 font-bold">
                Details
              </p>

              <div className="p-5">
                <div className="space-y-7">
                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem] text-gray-300 font-semibold">
                      Assigned To
                    </p>
                    {issue.issueDetails?.assignee ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 text-xs">
                          <AvatarFallback>
                            {issue.issueDetails?.assignee?.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                      </div>
                    ) : (
                      <p>Unassigned</p>
                    )}
                  </div>
                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem] text-gray-300 font-semibold">
                      Priority
                    </p>
                    <span
                      className={`${
                        issue.issueDetails?.priority == "low"
                          ? "text-yellow-500"
                          : issue.issueDetails?.priority == "medium"
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {issue.issueDetails?.priority}
                    </span>
                  </div>
                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem] text-gray-300 font-semibold">
                      Status
                    </p>
                    <Badge
                      className={`${
                        issue.issueDetails?.status == "in-progress"
                          ? "bg-orange-500"
                          : issue.issueDetails?.status == "done"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {issue.issueDetails?.status}
                    </Badge>
                  </div>
                  <div className="flex gap-10">
                    <p className="min-w-[7rem] text-gray-300 font-semibold">
                      Labels
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {issue?.issueDetails?.labels?.map((label, index) => (
                        <Badge variant="outline" key={label.id || index}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem] text-gray-300 font-semibold">
                      Due Date
                    </p>
                    <div className="flex items-center gap-3">
                      {issue.issueDetails
                        ? new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "full",
                          }).format(new Date(issue.issueDetails.dueDate))
                        : issue.issueDetails?.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem] text-gray-300 font-semibold">
                      Report To
                    </p>
                    {project?.projectRoles
                      ?.filter((role) => role?.roleType !== "EMPLOYEE")
                      .map((role, index) => (
                        <div
                          className="flex items-center gap-3"
                          key={role?.id || index}
                        >
                          <Avatar className="h-8 w-8 text-xs">
                            <AvatarFallback>
                              {role?.user?.fullName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <p>{`${role?.user?.fullName}(${role?.roleType})`}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueDetails;

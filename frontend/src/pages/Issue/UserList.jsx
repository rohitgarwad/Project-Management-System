/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/Issue/Issue.action";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserList = ({ issueDetails, sendRefresh }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, auth, issue } = useSelector((store) => store);

  const userRole = project?.userProjectRole?.roleType;
  //console.log("issuedetails ", issueDetails);

  const handleIssueAssigne = (userId) => {
    if (
      auth?.user?.id === project?.projectDetails?.owner?.id ||
      userRole === "MANAGER"
    ) {
      dispatch(
        assignedUserToIssue({
          userId,
          issueId: issueDetails.id,
          sendRefresh,
        })
      );
    }
  };

  return (
    <Fragment>
      {!issue.loading ? (
        <>
          {auth?.user?.id === project?.projectDetails?.owner?.id ||
          userRole === "MANAGER" ? (
            <div className="space-y-2">
              <div className="border rounded-md">
                <p className="py-2 px-3">
                  {issueDetails.assignee?.fullName || "Unassigned"}
                </p>
              </div>
              {project.projectRoles?.map((item, index) => (
                <div
                  onClick={() => handleIssueAssigne(item?.user?.id || index)}
                  key={item?.id || index}
                  className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
                >
                  <Avatar className="">
                    <AvatarFallback
                      className={`${
                        item?.roleType === "OWNER"
                          ? "bg-orange-700 group-hover:bg-gray-400"
                          : item?.roleType === "MANAGER"
                          ? "bg-yellow-600 group-hover:bg-gray-400"
                          : "bg-blue-600 group-hover:bg-gray-400"
                      }`}
                    >
                      {item?.user?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className=" space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item?.user?.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @
                      {item?.user?.fullName?.toLowerCase().split(" ").join("_")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="border rounded-md">
                <p className="py-2 px-3">
                  {issueDetails?.assignee?.fullName || "Unassigned"}
                </p>
              </div>
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {issueDetails?.assignee !== null && (
                        <div className="py-2 group hover:bg-slate-800 flex items-center space-x-4 rounded-md border px-4">
                          <Avatar className="">
                            <AvatarFallback className="group-hover:bg-gray-400">
                              {issueDetails?.assignee?.fullName[0]}
                            </AvatarFallback>
                          </Avatar>

                          <div className=" space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {issueDetails?.assignee?.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              @
                              {issueDetails?.assignee?.fullName
                                ?.toLowerCase()
                                .split(" ")
                                .join("_")}
                            </p>
                          </div>
                        </div>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You are not Authorized to perform this action.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="p-1">
            <Skeleton className="border rounded-md h-[2rem]"></Skeleton>
            {project.projectDetails?.team.map((item, index) => (
              <Skeleton key={item.id || index} className="w-full h-[2rem]">
                <Skeleton className=""></Skeleton>

                <Skeleton className=" space-y-1">
                  <Skeleton className="text-sm font-medium leading-none"></Skeleton>
                  <Skeleton className="text-xs text-muted-foreground"></Skeleton>
                </Skeleton>
              </Skeleton>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserList;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import IssueCard from "./IssueCard";
import { CreateIssueForm } from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchIssues } from "@/redux/Issue/Issue.action";

export function IssueList({
  title,
  status,
  setIsEdited,
  isEdited,
  labels,
  deadline,
  change,
  sendRefresh,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { issue, project } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id, change, dispatch]);

  return (
    <div>
      {!issue?.loading && (
        <Dialog>
          <Card className="w-full md:w-[300px] lg:w-[310px] ">
            <CardHeader className="text-base font-semibold">
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {issue.issues
                  .filter((item) => item.status == status)
                  .map((item, index) => (
                    <IssueCard
                      item={item}
                      key={item.id || index}
                      isEdited={isEdited}
                      setIsEdited={setIsEdited}
                      labels={labels}
                      deadline={deadline}
                      change={change} sendRefresh={sendRefresh}
                    />
                  ))}
              </div>
            </CardContent>
            <CardFooter className="px-2">
              <DialogTrigger>
                <Button
                  className="w-full border-inherit flex items-center gap-2"
                  variant="outline"
                >
                  <PlusIcon /> <span>Create Issue</span>
                </Button>
              </DialogTrigger>
            </CardFooter>
          </Card>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
            </DialogHeader>
            <CreateIssueForm
              status={status}
              labels={labels}
              deadline={deadline}
              change={change} sendRefresh={sendRefresh}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

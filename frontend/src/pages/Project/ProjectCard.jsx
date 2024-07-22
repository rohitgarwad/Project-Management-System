/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "@/redux/Project/Project.Action";

const ProjectCard = ({ item, sendRefresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, project } = useSelector((store) => store);

  //console.log("item---------", item);

  const handleDeleteProject = () => {
    dispatch(deleteProject({ projectId: item.id }));
    sendRefresh("refresh");
  };

  return (
    <>
      {!project?.loading && (
        <Card className="p-5 w-full lg:max-w-3xl">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <h1
                    onClick={() => navigate(`/project/${item.id}`)}
                    className=" cursor-pointer font-bold text-lg "
                  >
                    {item.name}
                  </h1>
                  <DotFilledIcon />
                  <p className="text-sm text-gray-400">{item.category}</p>
                  {item?.status == "done" ? (
                    <Badge className={`bg-green-400`}>{item?.status}</Badge>
                  ) : (
                    <Badge className={`bg-orange-400`}>{item?.status}</Badge>
                  )}
                </div>
                {auth.user?.id === item?.owner?.id && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          className="rounded-full"
                          variant="ghost"
                          size="icon"
                        >
                          <DotsVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => navigate(`/project/update/${item.id}`)}
                        >
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteProject}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {item.tags.map((tag, index) => (
                <Badge key={tag.id || index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ProjectCard;

/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteWorkUpload } from "@/redux/WorkUpload/workUpload.action";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";

const WorkUploadCard = ({ item, sendRefresh }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleDeleteWorkUpload = () => {
    dispatch(deleteWorkUpload(item.id));
    sendRefresh("WorkUpload Deleted !");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              {item.user.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-gray-300">{item.user.fullName}</p>
            <a href={item.content} target="blank">{item.content}</a>
          </div>
        </div>
        {auth?.user?.id === item?.user?.id && (
          <Button
            onClick={handleDeleteWorkUpload}
            className="rounded-full"
            variant="ghost"
            size="icon"
          >
            <TrashIcon className="text-red-600" />
          </Button>
        )}
      </div>
    </>
  );
};

export default WorkUploadCard;

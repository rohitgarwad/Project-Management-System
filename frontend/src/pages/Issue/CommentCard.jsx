/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/redux/Comment/comment.action";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({ item, sendMessageToServer }) => {
  const { auth, comment } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    dispatch(deleteComment(item.id));
    sendMessageToServer("refresh");
  };
  return (
    <>
      {!comment?.loading && (
        <div className="flex justify-between border-r">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {item.user.fullName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-gray-300">{item.user.fullName}</p>
              <p>{item.content}</p>
            </div>
          </div>
          {auth?.user?.id === item?.user?.id && (
            <Button
              onClick={handleDeleteComment}
              className="rounded-full"
              variant="ghost"
              size="icon"
            >
              <TrashIcon />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default CommentCard;

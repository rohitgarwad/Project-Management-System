import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../Project/CreateProjectForm";
import { logout } from "@/redux/Auth/Action";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="border-b  py-4 px-5 flex items-center justify-between fixed top-0 z-10 w-full bg-background backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="text-container">
          <div className="text-effect-wrapper">
            <h1 className="text-neon" onClick={() => navigate("/")}>
              Project Management
            </h1>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger>
            <Button
              variant="secondary"
              className=" text-base text-gray-200 font-bold"
            >
              New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-popover">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => navigate("/upgrade_plan")}
          variant="destructive"
          className="text-base text-gray-200 font-bold"
        >
          Upgrade
        </Button>
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              className="rounded-full border-2 border-[#ea580c]"
              variant="outline"
              size="icon"
            >
              <PersonIcon className="h-4 w-4 text-[#ea580c] " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="lg:block hidden text-base text-gray-200 font-semibold">
          {auth?.user?.fullName}{" "}
        </p>
      </div>
    </div>
  );
};

export default Navbar;

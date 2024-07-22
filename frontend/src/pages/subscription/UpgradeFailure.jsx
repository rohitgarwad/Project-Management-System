import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const UpgradeFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center absolute mt-24 w-full">
      <Card className="mt-20 space-y-5 flex flex-col items-center p-5">
        <div className="flex items-center gap-4">
          <CrossCircledIcon className="h-9 w-9 text-red-500" />
          <p className="text-xl">Plan Upgrade Failure</p>
        </div>
        <div className="space-y-3">
          <p className="text-red-500">please try again.</p>
        </div>
        <Button onClick={() => navigate("/upgrade_plan")}>Try Again</Button>
      </Card>
    </div>
  );
};

export default UpgradeFailure;

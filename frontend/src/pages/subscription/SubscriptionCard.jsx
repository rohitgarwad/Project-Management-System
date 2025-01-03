/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

import { createPayment } from "@/redux/Payment/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpgrade = () => {
    if (data.planType !== "FREE") {
      dispatch(
        createPayment({
          planType: data.planType,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  };

  return (
    <div className="rounded-xl bg-card shadow-[#14173b] shadow-2xl p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p className="">
        <span className="text-xl font-semibold">₹{data.price}/</span>{" "}
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUALLY" && <p className="text-green-500">30% off</p>}
      <Button
        disabled={
          data.planName === "Free" ||
          data.buttonName === "Current Plan" ||
          data.currentPlan === "ANNUALLY"
            ? true
            : false
        }
        className="w-full"
        onClick={handleUpgrade}
      >
        {data.buttonName}
      </Button>
      <div>
        {data.features.map((item, index) => (
          <div key={item.id || index} className="flex items-center gap-2">
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;

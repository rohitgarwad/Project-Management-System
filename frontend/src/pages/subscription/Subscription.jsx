import { useEffect } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector, useDispatch } from "react-redux";
import { getUserSubscription } from "@/redux/Subscription/Action";

const paidPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Integration Support",
  "Training and Resources",
  "High Access Control",
];

const annualPlan = [
  "Add unlimited project",
  "Access to live chat",
  "Add unlimited team member",
  "Advanced Reporting",
  "Priority Support",
  "Everything monthly plan has",
];

const freePlan = [
  "Add only 3 projects",
  "Basic Task Management",
  "Project Collaboration",
  "Basic Reporting",
  "Email Notifications",
  "Basic Access Control",
];

const Subscription = () => {
  const { auth, subscription } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt, dispatch]);

  return (
    <div className="p-10 absolute mt-24 w-full">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: 0,
            currentPlan: subscription.userSubscription?.planType,
            buttonName:
              subscription.userSubscription?.planType == "FREE"
                ? "Current Plan"
                : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: 799,
            currentPlan: subscription.userSubscription?.planType,
            buttonName:
              subscription.userSubscription?.planType == "MONTHLY"
                ? "Current Plan"
                : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "ANNUALLY",
            price: 6711,
            currentPlan: subscription.userSubscription?.planType,
            buttonName:
              subscription.userSubscription?.planType == "ANNUALLY"
                ? "Current Plan"
                : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;

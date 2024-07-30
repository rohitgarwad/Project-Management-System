/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendIssueReport } from "@/redux/Issue/Issue.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  senderEmail: z.string().email("Invalid email address"),
  receiverEmail: z.string().email("Invalid email address"),
  issueTitle: z.string(),
  issueStatus: z.string(),
  reportMessage: z.string(),
});

const SendReportForm = ({ senderEmail, receiverEmail, issueStatus, issueTitle,  sendRefresh }) => {

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      issueTitle: issueTitle,
      issueStatus: issueStatus,
      reportMessage: "",
    },
  });

  const onSubmit = (data) => {
    // console.log("sendReportFormData: ", data);
    dispatch(sendIssueReport(data));
    sendRefresh("Report Sent !");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="reportMessage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-inherit py-5 px-5"
                    placeholder="enter report message..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type="submit" className="w-full py-5">
              SEND REPORT
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default SendReportForm;

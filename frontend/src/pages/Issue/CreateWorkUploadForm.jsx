/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createWorkUpload } from "@/redux/WorkUpload/workUpload.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().url({
    message: "workUpload must be a url",
  }),
});

const CreateWorkUploadForm = ({ issueId, sendRefresh }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    //console.log("comment data ", data);
    dispatch(createWorkUpload({ content: data.content, issueId }));
    form.reset();
    sendRefresh("WorkUpload Created !");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <div>
                  <Avatar>
                    <AvatarFallback>
                      {auth.user.fullName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <FormControl>
                  <Input
                    className="w-[20rem] border-inherit"
                    placeholder="add a link..."
                    {...field}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">upload</Button>
      </form>
    </Form>
  );
};

export default CreateWorkUploadForm;

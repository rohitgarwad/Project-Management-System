/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custome/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { updateIssue } from "@/redux/Issue/Issue.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { array, string, z } from "zod";

const formSchema = z.object({
  issueName: z.string().min(2, {
    message: "issue name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  labels: array(string()),
  priority: z.string(),
  dueDate: z.date(),
  status: z.string().min(2),
});

const EditIssueForm = ({ issue, setIsEdited, isEdited, labels, deadline }) => {
  //console.log("existing issue details: ", issue);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Set form default values once project data is fetched
    if (issue) {
      form.reset({
        issueName: issue.title,
        description: issue.description,
        labels: issue.labels,
        priority: issue.priority,
        dueDate: new Date(issue.dueDate),
        status: issue.status,
      });
    }
  }, [issue, form]);

  const handleLabelsChange = (newValue) => {
    const currentLabels = form.getValues("labels");

    const updatedLabels = currentLabels.includes(newValue)
      ? currentLabels.filter((label) => label !== newValue)
      : [...currentLabels, newValue];
    form.setValue("labels", updatedLabels);
  };

  const onSubmit = (data) => {
    const updatedData = {
      title: data.issueName,
      projectId: issue.projectID,
      status: data.status,
      labels: data.labels,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
    };
    //console.log("update issue data: ", updatedData);
    dispatch(updateIssue(issue.id, updatedData));
    setIsEdited(!isEdited);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="issueName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Name</FormLabel>
              <FormControl>
                <Input
                  className="border-inherit"
                  placeholder="what needs to be done?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description </FormLabel>
              <FormControl>
                <Input
                  className="border-inherit"
                  placeholder="describe your task..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"labels"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labels</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    handleLabelsChange(value);
                  }}
                  multiple
                >
                  <SelectTrigger className="w-full border-inherit">
                    <SelectValue placeholder="Technologies & Tools" />
                  </SelectTrigger>
                  <SelectContent>
                    {labels?.map((label, index) => (
                      <SelectItem key={label.id || index} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="flex gap-1 flex-wrap">
                {field.value?.map((item, index) => (
                  <div
                    onClick={() => handleLabelsChange(item)}
                    key={item.id || index}
                    className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                  >
                    <span className="text-sm">{item}</span>
                    <Cross1Icon className="h-3 w-3" />
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  defaultValue="medium"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full border-inherit">
                    <SelectValue placeholder="select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal flex border-inherit",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2"
                  >
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => (addDays(date, 1) < new Date()) || date > new Date(deadline)}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  defaultValue="pending"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full border-inherit">
                    <SelectValue placeholder="select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit">Edit Issue</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default EditIssueForm;

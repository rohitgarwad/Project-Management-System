/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { array, date, object, string } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  updateProject,
} from "@/redux/Project/Project.Action";
import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { SelectGroup, SelectLabel } from "@/components/custome/select";
import { data } from "./data";

const formSchema = object({
  name: string().min(1),
  description: string().min(1),
  category: string().min(1),
  tags: array(string()),
  deadline: date(),
});

const UpdateProjectForm = ({ change, sendRefresh }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);

  const languages = data.Languages;
  const webTechnologies = data["Web-Technologies"];
  const mobileTechnologies = data["Mobile-Technologies"];
  const operatingSystem = data["Operating-System"];
  const databases = data.Databases;
  const webServers = data["Web-Servers"];
  const cloud_deployment = data["Cloud & Deployment"];
  const ai_ml = data["AI/ML"];

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id, change]);

  //console.log("existing project data: ", project?.projectDetails);

  useEffect(() => {
    // Set form default values once project data is fetched
    if (project.projectDetails) {
      form.reset({
        name: project.projectDetails.name,
        description: project.projectDetails.description,
        category: project.projectDetails.category,
        tags: project.projectDetails.tags,
        deadline: new Date(project.projectDetails.deadline),
      });
    }
  }, [project.projectDetails, form, change]);

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");

    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];

    form.setValue("tags", updatedTags);
  };

  const onSubmit = (data) => {
    dispatch(updateProject({ updatedData: data, projectId: id }));
    //console.log("update project", data);
    sendRefresh("refresh");
    navigate("/");
  };

  return (
    <>
      {!project?.loading && (
        <div className="min-h-[85vh] flex flex-col justify-center items-center px-5 absolute mt-24 w-full bg-background">
          {project.projectDetails ? (
            <div className="border w-full flex flex-col justify-center lg:h-[75vh] p-10 lg:w-[30vw] bg-card">
              <h1 className="text-center pb-9 text-lg font-semibold">
                Update Project
              </h1>
              <Form className="" {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border w-full border-inherit py-5 px-5"
                            placeholder="project name..."
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
                        <FormControl>
                          <Input
                            {...field}
                            className="border w-full border-inherit py-5 px-5"
                            placeholder="project description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger className="w-full border-inherit">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fullstack">
                                Full Stack
                              </SelectItem>
                              <SelectItem value="frontend">Frontend</SelectItem>
                              <SelectItem value="backend">Backend</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"tags"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              handleTagsChange(value);
                            }}
                            multiple
                          >
                            <SelectTrigger className="w-full border-inherit">
                              <SelectValue placeholder="Technologies & Tools" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Languages
                                </SelectLabel>
                                {languages?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Web-Technologies
                                </SelectLabel>
                                {webTechnologies?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Mobile-Technologies
                                </SelectLabel>
                                {mobileTechnologies?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Operating-System
                                </SelectLabel>
                                {operatingSystem?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Databases
                                </SelectLabel>
                                {databases?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Web-Servers
                                </SelectLabel>
                                {webServers?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  Cloud & Deployment
                                </SelectLabel>
                                {cloud_deployment?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="bg-red-500">
                                  AI/ML
                                </SelectLabel>
                                {ai_ml?.map((items, index) => (
                                  <SelectItem
                                    key={items.id || index}
                                    value={items}
                                  >
                                    {items}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <div className="flex gap-1 flex-wrap">
                          {field.value?.map((item, index) => (
                            <div
                              onClick={() => handleTagsChange(item)}
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
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover modal={true}>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal w-full border-inherit",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a deadline date</span>
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
                                  disabled={(date) =>
                                    addDays(date, 1) < new Date()
                                  }
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full py-5">
                    Update Project
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <p>Loading project data...</p>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProjectForm;

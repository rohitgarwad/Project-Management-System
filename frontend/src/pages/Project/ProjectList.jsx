/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/redux/Project/Project.Action";
import { useLocation, useNavigate } from "react-router-dom";
import { filterData } from "./filterData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterSheet from "./FilterSheet";

const ProjectList = ({ change, sendRefresh }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");

  const { project } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchProjects({ category, tag }));
    //console.log("projectsList: ", project);
  }, [category, dispatch, tag, change]);

  const handleFilterChange = (section, value) => {
    //console.log(value, section);

    if (value === "all") {
      searchParams.delete(section);
    } else {
      searchParams.set(section, value);
    }
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value) {
      dispatch(searchProjects(e.target.value));
    }
  };
  return (
    <>
      <div className="px-5 h-[93vh] lg:px-0 lg:flex gap-5 justify-center pt-10 pb-5 bg-background">
        <section className="hidden lg:block">
          <Card className="p-5 sticky h-[95%] top-[100px]">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl tracking-wider">filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-5 ">
              <div className="space-y-7 h-[70vh] text-center">
                <div>
                  <h1 className="pb-3 text-gray-400 text-base border-b">
                    Category
                  </h1>
                  <ScrollArea className="pt-5 h-[20vh]">
                    <RadioGroup
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                      className="space-y-3"
                      defaultValue={category || "all"}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fullstack" id="r1" />
                        <Label htmlFor="r1">Fullstack</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Frontend" id="r2" />
                        <Label htmlFor="r2">Frontend</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Backend" id="r3" />
                        <Label htmlFor="r3">Backend</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Desktop Application" id="r4" />
                        <Label htmlFor="r4">Desktop Application</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mobile Application" id="r5" />
                        <Label htmlFor="r5">Mobile Application</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cloud Computing" id="r6" />
                        <Label htmlFor="r6">Cloud Computing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Data Science" id="r7" />
                        <Label htmlFor="r7">Data Science</Label>
                      </div>
                    </RadioGroup>
                  </ScrollArea>
                </div>

                <div className="pt-3">
                  <h1 className="pb-3 text-gray-400 text-base border-b">
                    Technologies & Tools
                  </h1>

                  <ScrollArea className="h-[35vh]">
                    <RadioGroup
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                      className="space-y-3 pt-5 text-sm"
                      defaultValue={tag || "all"}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r-all" />
                        <Label htmlFor="r-all">All</Label>
                      </div>
                      {filterData.map((item, index) => (
                        <Fragment key={item?.id || index}>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            {item.Title}
                          </p>
                          {item.Tags.sort().map((tag, index) => (
                            <div
                              key={tag?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={tag} id={`r-${tag}`} />
                              <Label htmlFor={`r-${tag}`}>{tag}</Label>
                            </div>
                          ))}
                        </Fragment>
                      ))}
                    </RadioGroup>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <ScrollArea className="w-full pr-4 lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                className="w-[40%] rounded-fulls px-9 border-inherit"
                placeholder="search project..."
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4 " />
            </div>

            <Sheet className=" lg:hidden">
              <SheetTrigger>
                <Button className="" variant="ghost" size="icon">
                  <MixerHorizontalIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <FilterSheet />
              </SheetContent>
            </Sheet>
          </div>
          <div>
            {project.projects.length > 0 ? (
              <div className="space-y-5 min-h-[74vh]">
                {keyword
                  ? project.searchProjects.map((item, index) => (
                      <ProjectCard
                        change={change}
                        sendRefresh={sendRefresh}
                        item={item}
                        key={item.id || index}
                      />
                    ))
                  : project.projects.map((item, index) => (
                      <ProjectCard
                        change={change}
                        sendRefresh={sendRefresh}
                        item={item}
                        key={item.id || index}
                      />
                    ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[70vh]">
                <h1>No projects...</h1>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ProjectList;

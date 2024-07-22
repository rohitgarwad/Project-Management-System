/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
import { tags } from "./filterData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterSheet from "./FilterSheet";
import { data } from "./data";

const ProjectList = ({ change, sendRefresh }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");

  const { project, auth } = useSelector((store) => store);

  const languages = data.Languages;
  const webTechnologies = data["Web-Technologies"];
  const mobileTechnologies = data["Mobile-Technologies"];
  const operatingSystem = data["Operating-System"];
  const databases = data.Databases;
  const webServers = data["Web-Servers"];
  const cloud_deployment = data["Cloud & Deployment"];
  const ai_ml = data["AI/ML"];

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
      {!project?.loading && (
        <div className="px-5 h-[90vh] lg:px-0 lg:flex gap-5 justify-center py-5 bg-background">
          <section className="hidden lg:block">
            <Card className="p-5 sticky h-full top-[100px]">
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
                    <div className="pt-5">
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
                          <RadioGroupItem value="fullstack" id="r1" />
                          <Label htmlFor="r1">Full Stack</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="frontend" id="r2" />
                          <Label htmlFor="r2">Frontend</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="backend" id="r3" />
                          <Label htmlFor="r3">Backend</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="pt-3">
                    <h1 className="pb-3 text-gray-400 text-base border-b">
                      Technologies & Tools
                    </h1>

                    <ScrollArea className="h-[40vh]">
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
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Languages
                          </p>
                          {languages.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Web-Technologies
                          </p>
                          {webTechnologies.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Mobile-Technologies
                          </p>
                          {mobileTechnologies.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Operating-System
                          </p>
                          {operatingSystem.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Databases
                          </p>
                          {databases.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Web-Servers
                          </p>
                          {webServers.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            Cloud & Deployment
                          </p>
                          {cloud_deployment.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
                        <>
                          <p className="text-gray-500 font-black text-base border-l-2 bg-[#c5692730]">
                            AI/ML
                          </p>
                          {ai_ml.sort().map((item, index) => (
                            <div
                              key={item?.id || index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={item} id={`r-${item}`} />
                              <Label htmlFor={`r-${item}`}>{item}</Label>
                            </div>
                          ))}
                        </>
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
                        <ProjectCard change={change} sendRefresh={sendRefresh} item={item} key={item.id || index} />
                      ))
                    : project.projects.map((item, index) => (
                        <ProjectCard change={change} sendRefresh={sendRefresh} item={item} key={item.id || index} />
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
      )}
    </>
  );
};

export default ProjectList;

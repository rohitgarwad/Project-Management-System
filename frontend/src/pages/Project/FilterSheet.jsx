/* eslint-disable no-unused-vars */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { tags } from "./filterData";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { data } from "./data";

const FilterSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  const languages = data.Languages;
  const webTechnologies = data["Web-Technologies"];
  const mobileTechnologies = data["Mobile-Technologies"];
  const operatingSystem = data["Operating-System"];
  const databases = data.Databases;
  const webServers = data["Web-Servers"];
  const cloud_deployment = data["Cloud & Deployment"];
  const ai_ml = data["AI/ML"];

  const handleFilterChange = (section, value) => {
    console.log(value, section);

    if (value === "all") {
      searchParams.delete(section);
    } else {
      searchParams.set(section, value);
    }
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };
  return (
    <div>
      <SheetClose>
        <div className="p-5 sticky top-10">
          <div className="flex justify-between lg:w-[20rem]">
            <p className="text-xl tracking-wider">filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent className="mt-5 ">
          <ScrollArea className="space-y-7 h-[85vh]">
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

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 text-base border-b">
                    Technologies & Tools
                  </h1>

                  <RadioGroup
                    onValueChange={(value) => handleFilterChange("tag", value)}
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
                </div>
              </ScrollArea>
          </CardContent>
        </div>
      </SheetClose>
    </div>
  );
};

export default FilterSheet;

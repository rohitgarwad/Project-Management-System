/* eslint-disable no-unused-vars */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { Fragment } from "react";
import { filterData } from "./filterData";
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

  const handleFilterChange = (section, value) => {
    // console.log(value, section);

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
            <div className="space-y-7 h-[85vh]">
              <div>
                <h1 className="pb-3 text-gray-400 text-base border-b">
                  Category
                </h1>
                <ScrollArea className="pt-5 h-[25vh]">
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

              <div className="pt-9">
                <h1 className="pb-3 text-gray-400 text-base border-b">
                  Technologies & Tools
                </h1>

                <ScrollArea className="h-[45vh]">
                  <RadioGroup
                    onValueChange={(value) => handleFilterChange("tag", value)}
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
        </div>
      </SheetClose>
    </div>
  );
};

export default FilterSheet;

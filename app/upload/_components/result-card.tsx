"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useLenticularStore } from "@/store/useLenticularStore";

export function Result() {
  const { result, downloadResult } = useLenticularStore();
  if (!result) return null;
  return (
    <CardContainer className="">
      <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-auto h-auto rounded-xl p-6  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Lenticular Images
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Use a Lens (lenticular sheet) to view the image from different angles
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={result}
            height="1000"
            width="1000"
            className="h-96 object-contain w-full rounded-xl"
            alt="Image Size is too large to display, DOWNLOAD to view"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => downloadResult()}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Download Image
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

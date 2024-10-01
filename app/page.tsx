'use client'
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";

const words =
  "Tool that processes multiple images to create a dynamic viewing experience, where the image changes as the viewer's angle shifts";

export default function Page() {
  const router = useRouter();

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Lenticular Software <br /> GoKaptureHub
      </h2>
      <TextGenerateEffect
        className="max-w-xl mx-auto text-sm font-thin md:text-lg text-neutral-700 dark:text-neutral-400 text-center mb-5"
        words={words}
      />
      <RainbowButton
        onClick={() => {
          router.push("/upload");
        }}
      >
        Get Started
      </RainbowButton>
    </BackgroundLines>
  );
}

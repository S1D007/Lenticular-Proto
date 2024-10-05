"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useLenticularStore } from "@/store/useLenticularStore";
import React from "react";
import { Result } from "./_components/result-card";

function Page() {
  const {
    generate,
    result,
    loading,
    images,
    setDetails,
    lpi,
    dpi,
    stripWidth,
  } = useLenticularStore();

  return (
    <div className="w-full flex items-center justify-center flex-col h-screen  py-10 px-6">
      {result ? (
        <Result />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 w-full max-w-md">
            <label className="text-lg font-semibold text-gray-800">
              Lines per Inch
            </label>
            <input
              type="number"
              value={lpi}
              onChange={(e) =>
                setDetails({
                  lpi: parseFloat(e.target.value),
                  dpi,
                  stripWidth,
                })
              }
              placeholder="LPI (Lines per Inch)"
              className="input px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="text-lg font-semibold text-gray-800">
              Dots per Inch (DPI)
            </label>
            <input
              type="number"
              value={dpi}
              onChange={(e) =>
                setDetails({
                  lpi,
                  dpi: parseFloat(e.target.value),
                  stripWidth,
                })
              }
              placeholder="DPI (Dots per Inch)"
              className="input px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="text-lg font-semibold text-gray-800">
              Strip Width
            </label>
            <input
              type="number"
              value={stripWidth}
              onChange={(e) =>
                setDetails({
                  lpi,
                  dpi,
                  stripWidth: parseFloat(e.target.value),
                })
              }
              placeholder="Strip Width"
              className="input px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <FileUpload />

          <RainbowButton
            disabled={images.length === 0 || loading}
            onClick={() => generate()}
          >
            {loading ? "Generating..." : "Generate Lenticular Image"}
          </RainbowButton>
        </>
      )}
    </div>
  );
}

export default Page;

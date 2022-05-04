import { Camera, Trash } from "phosphor-react";

import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  disabled: boolean
  screenshost: string | null;
  onScreenshotTook: (screenshost: string | null) => void;
}

export function ScreenshotButton({ disabled, screenshost, onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');
    onScreenshotTook(base64image);
    
    setIsTakingScreenshot(false);
  }

  if (screenshost) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshost})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
        onClick={() => onScreenshotTook(null)}
      >
        <Trash weight="fill"/>
      </button>
    );
  }

  return(
    <button
      disabled={disabled}
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-zinc-800"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
    </button>
  );
}
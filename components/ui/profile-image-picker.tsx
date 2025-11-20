"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ProfileImagePicker({ currentImage }: { currentImage: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-full overflow-clip w-20 h-20"
      >
        <Image
          src={preview ?? currentImage ?? "/assets/logo.png"}
          alt="Profile image"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />
    </>
  );
}

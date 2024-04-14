import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function TextEditor(value, setValue) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}

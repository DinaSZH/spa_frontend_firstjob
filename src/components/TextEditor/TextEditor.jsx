import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function TextEditor({ value, setValue }) {
  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
    </div>
  );
}

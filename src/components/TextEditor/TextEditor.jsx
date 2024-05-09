import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function TextEditor({ value, setValue }) {
  const handleChange = (content, _, __, editor) => {
    const htmlContent = editor.getHTML();
    setValue(htmlContent);
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
    </div>
  );
}

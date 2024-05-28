import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = ({ description, setDescription, theme }) => {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme={theme}
        value={description}
        onChange={setDescription}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;

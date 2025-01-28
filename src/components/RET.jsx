import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf.js";

export default function RET({ name, control, defaultValue = "" }) {
  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
          apiKey={conf.rtekey}
          initialValue={defaultValue}
          init={{
            initialValue: defaultValue,
            height: 801,
            highlight_on_focus: false,
            placeholder: "Start writing ...",
            menubar: true,
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",
            ],
            toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            body_class: "bg-gray-800 text-gray-100 ",
            skin: "oxide-dark",
            content_css: "dark",
            content_style: `
            body {
              outline : none;
            }
            `,
          }}
          onEditorChange={onChange}
        />
      )}
    />
  );
}

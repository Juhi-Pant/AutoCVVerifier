import React, { useCallback, useState, useRef } from "react";
import {useDropzone} from 'react-dropzone'
import { FileIcon, UploadCloud, X } from "lucide-react";
import { Button } from "../ui/button"; // Adjust path based on your setup
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"; 
import axios from 'axios'

const FileUploadPanel = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();
  const sessionID = useRef(Date.now().toString() + Math.random().toString(36).substring(2));
  
  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.map((file)=> ({
      id: Math.random().toString(36).substring(2),
      file,
    }));
    setFiles((prev)=> [...prev, ...validFiles]);
  });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
    multiple: true,
  });
 


  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleVerify = async() => {
    console.log("Verifying files:", files);
    const formData = new FormData();
    files.forEach(({file}) => {
      formData.append("resumes", file);
      formData.append("sessionId", sessionID.current);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
      })
      console.log("Upload success:", res.data);

      const analyzeRes = await axios.post("http://localhost:5000/analyze/extract-links", {
          sessionId: sessionID.current
      });
      console.log("Analysis Result:", analyzeRes.data);

      const githubRes = await axios.post("http://localhost:5000/evaluate/github", {
          sessionId: sessionID.current
      });
      console.log("Github Analysis Result:", analyzeRes.data);
      
    } catch (error) {
      console.error("Upload error:", error)
    }
  };

  return (
    <Card className="border-[#d9d2cc] bg-white shadow-md ">
      <CardHeader>
        <CardTitle className="text-[#723e31] ">
          Upload Resumes
        </CardTitle>
        <CardDescription>
          Drag and drop PDF or DOCX files to verify candidate resumes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Upload Dropzone */}
                <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
            isDragActive
              ? "border-[#a67564] bg-[#d9d2cc]/20"
              : "border-[#d9d2cc] hover:bg-[#f2f1ef]"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mb-4 h-12 w-12 text-[#a67564]" />
          <div className="mb-2 text-lg font-medium">Drag & drop resumes here</div>
          <p className="mb-4 text-sm text-gray-500">
            Support for PDF, DOCX files
          </p>
          <Button
            variant="outline"
            className="border-[#a67564] text-[#723e31] hover:bg-[#d9d2cc]/20"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse Files
          </Button>
          <input
           {...getInputProps()}
           ref={fileInputRef}
           className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-medium text-[#723e31] ">
              Selected Files ({files.length})
            </h3>
            <div className="max-h-60 overflow-y-auto rounded-md border border-[#d9d2cc] ">
              {files.map(({ id, file }) => (
                <div
                  key={id}
                  className="flex items-center justify-between border-b border-[#d9d2cc] p-3 last:border-0 "
                >
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-5 w-5 text-[#a67564] " />
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-[#723e31] "
                    onClick={() => removeFile(id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-[#a67564] text-white hover:bg-[#723e31] "
                onClick={handleVerify}
                disabled={files.length === 0}
              >
                Verify Now
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadPanel;

import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import { FileIcon, UploadCloud, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from 'axios';

const FileUploadPanel = ({ sessionId, onComplete, onVerificationComplete }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2),
      file,
    }));
    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

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

  const handleVerify = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    files.forEach(({ file }) => {
      formData.append("resumes", file);
      formData.append("sessionId", sessionId);
    });

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log("Upload success:", res.data);

      const analyzeRes = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/analyze/extract-links`, 
        { sessionId: sessionId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Analysis Result:", analyzeRes.data);

      const githubRes = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/evaluate/github`, 
        { sessionId: sessionId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Github Analysis Result:", githubRes.data);

      if (onComplete && typeof onComplete === "function") {
        onComplete();
        onVerificationComplete(true);
      }

    } catch (error) {
      console.error("Upload error:", error);
      onVerificationComplete(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-[#112240] rounded-xl shadow-lg border border-[#1f2d48] overflow-hidden">
        <div className="p-6 border-b border-[#1f2d48]">
          <h2 className="text-2xl font-bold text-[#64ffda] mb-2">Upload Resumes</h2>
          <p className="text-[#8892b0]">
            Drag and drop PDF or DOCX files to verify candidate resumes
          </p>
        </div>

        <div className="p-6">
          {/* Upload Dropzone */}
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
              isDragActive
                ? "border-[#64ffda] bg-[#64ffda]/10"
                : "border-[#1f2d48] hover:bg-[#1f2d48]"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mb-4 h-12 w-12 text-[#64ffda]" />
            <div className="mb-2 text-lg font-medium text-[#ccd6f6]">Drag & drop resumes here</div>
            <p className="mb-4 text-sm text-[#8892b0]">
              Support for PDF, DOCX files
            </p>
            <motion.button
              type="button"
              className="px-4 py-2 border border-[#64ffda] text-[#64ffda] rounded-md hover:bg-[#64ffda]/10 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Browse Files
            </motion.button>
            <input
              {...getInputProps()}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <motion.div 
              className="mt-6 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-[#64ffda]">
                Selected Files ({files.length})
              </h3>
              <div className="max-h-60 overflow-y-auto rounded-md border border-[#1f2d48] bg-[#0a192f]">
                {files.map(({ id, file }) => (
                  <motion.div
                    key={id}
                    className="flex items-center justify-between p-4 border-b border-[#1f2d48] last:border-0 hover:bg-[#1f2d48] transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-5 w-5 text-[#64ffda]" />
                      <div>
                        <span className="text-sm font-medium text-[#ccd6f6]">{file.name}</span>
                        <span className="block text-xs text-[#8892b0]">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      className="p-1 rounded-full hover:bg-[#64ffda]/10 text-[#8892b0] hover:text-[#64ffda] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(id)}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  className={`px-6 py-3 rounded-md font-medium ${
                    isUploading
                      ? "bg-[#64ffda]/70 cursor-not-allowed"
                      : "bg-[#64ffda] hover:bg-[#64ffda]/90"
                  } text-[#0a192f] transition-colors duration-300`}
                  onClick={handleVerify}
                  disabled={files.length === 0 || isUploading}
                  whileHover={!isUploading ? { scale: 1.03 } : {}}
                  whileTap={!isUploading ? { scale: 0.98 } : {}}
                >
                  {isUploading ? "Verifying..." : "Verify Now"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploadPanel;
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Resume upload ke liye
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),

  // Nayi line: Image upload ke liye (Insight banner)
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
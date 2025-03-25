// utils/storage.ts

export const getNextIndex = (type: "image" | "video") => {
    const existing = JSON.parse(localStorage.getItem("posts") || "[]");
    const filtered = existing.filter((post: any) => post.type === type);
    return filtered.length + 1;
  };
  
  export const saveBlobToFile = (blob: Blob, filename: string, path: string): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = `${path}/${filename}`;
        localStorage.setItem(url, reader.result as string);
        resolve(url);
      };
      reader.readAsDataURL(blob);
    });
  };
  
/**
 * Utility to upload a file (image or document) to the backend API,
 * which routes the upload to Cloudinary.
 * 
 * @param file The File object from an input element.
 * @returns Promise resolving to the permanent Cloudinary CDN URL.
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const token = typeof window !== "undefined" ? localStorage.getItem("awl_admin_token") : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const res = await fetch(`${BASE_URL}/pr/upload`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Upload failed with status ${res.status}`
    );
  }

  const json = await res.json();
  if (!json.success || !json.data?.url) {
    throw new Error(json.message || "Failed to obtain CDN URL from Cloudinary.");
  }

  return json.data.url;
}

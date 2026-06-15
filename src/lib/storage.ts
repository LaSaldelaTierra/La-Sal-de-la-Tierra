import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseStorage } from "@/lib/firebase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

function getExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  const mimeMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return mimeMap[file.type] ?? "jpg";
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Formato no válido. Usa JPG, PNG, WebP o GIF.";
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `La imagen no puede superar ${MAX_SIZE_MB} MB.`;
  }
  return null;
}

export async function uploadProductImage(
  file: File,
  productId?: string,
): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const storage = getFirebaseStorage();
  const ext = getExtension(file);
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const folder = productId ? `productos/${productId}` : "productos/temp";
  const storageRef = ref(storage, `${folder}/${uniqueName}`);

  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

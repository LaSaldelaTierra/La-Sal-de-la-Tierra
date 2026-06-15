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

export async function uploadProductImage(file: File, productId?: string): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Falta configurar Cloudinary. Define NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  if (productId) form.append("folder", `productos/${productId}`);
  else form.append("folder", "productos/temp");

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const res = await fetch(url, {
    method: "POST",
    body: form,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || "Error subiendo imagen a Cloudinary.");
  }

  return json.secure_url as string;
}

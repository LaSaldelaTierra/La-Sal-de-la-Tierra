import { redirect } from "next/navigation";

interface ProductosRedirectPageProps {
  searchParams: Promise<{ categoria?: string; buscar?: string }>;
}

/** Redirige al catálogo en la página principal (sin página separada). */
export default async function ProductosRedirectPage({
  searchParams,
}: ProductosRedirectPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.categoria) query.set("categoria", params.categoria);
  if (params.buscar) query.set("buscar", params.buscar);

  const qs = query.toString();
  redirect(qs ? `/?${qs}#productos` : "/#productos");
}

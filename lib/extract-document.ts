export async function extractDocument(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (name.endsWith(".txt") || file.type.startsWith("text/")) return buffer.toString("utf8");

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    const mod = await import("pdf-parse");
    const parser = (mod.default || mod) as unknown as (buffer: Buffer) => Promise<{ text?: string }>;
    const result = await parser(buffer);
    return result.text || "";
  }

  if (name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }

  throw new Error("Unsupported file type. Upload PDF, DOCX or TXT.");
}

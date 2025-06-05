import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, ingredients, instructions, image_url = null, source = "GPT" } = req.body;

  const { data, error } = await supabase
    .from("recipes")
    .insert([{ name, ingredients, instructions, image_url, source }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({
      error: error.message || "Failed to insert recipe",
      details: error.details || null,
      hint: error.hint || null,
    });
  }

  res.status(200).json({ success: true, data });
}

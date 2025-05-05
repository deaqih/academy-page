import { supabase } from "~/lib/supabase.server";

export type Partner = {
  id: number;
  name: string;
  filename: string;
  image_url: string;
  order_number: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("order_number", { ascending: true })
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching partners:", error);
    return [];
  }

  return data as Partner[];
}

export async function getPartnerById(id: number) {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching partner with id ${id}:`, error);
    return null;
  }

  return data as Partner;
}

export async function createPartner(partner: Omit<Partner, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("partners")
    .insert(partner)
    .select()
    .single();

  if (error) {
    console.error("Error creating partner:", error);
    return null;
  }

  return data as Partner;
}

export async function updatePartner(id: number, partner: Partial<Omit<Partner, "id" | "created_at" | "updated_at">>) {
  const { data, error } = await supabase
    .from("partners")
    .update(partner)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating partner with id ${id}:`, error);
    return null;
  }

  return data as Partner;
}

export async function deletePartner(id: number) {
  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting partner with id ${id}:`, error);
    return false;
  }

  return true;
} 
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  await supabase.auth.signOut();
  return redirect("/login");
} 
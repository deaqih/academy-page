import { Form, useActionData } from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import { json, redirect, ActionFunctionArgs } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";
import styles from "~/styles/login.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password_hash = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password_hash,
  });

  if (error) {
    return json({ error: error.message }, { status: 400 });
  }

  return redirect("/cms");
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <Form method="post" className="login-form">
          {actionData?.error && (
            <div className="error-message">{actionData.error}</div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Masukkan password Anda"
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
} 
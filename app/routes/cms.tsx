import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useNavigation } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";
import styles from "~/styles/cms.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {

  
  const [articles, trainings] = await Promise.all([
    supabase.from("articles").select("*").order("created_at", { ascending: false }),
    supabase.from("trainings").select("*").order("created_at", { ascending: false })
  ]);

  return json({
    articles: articles.data || [],
    trainings: trainings.data || []
  });
}

export default function CMS() {
  const { articles, trainings, user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="cms-container">
      <header className="cms-header">
        <h1>CMS Dashboard</h1>
      </header>

      <div className="cms-content">
        <section className="cms-section">
          <div className="section-header">
            <h2>Artikel</h2>
            <Link to="/cms/articles/new" className="add-button">
              Tambah Artikel
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.author}</td>
                    <td>{new Date(article.publish_date).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/cms/articles/${article.id}/edit`}>Edit</Link>
                      <Form method="post" action={`/cms/articles/${article.id}/delete`}>
                        <button type="submit">Hapus</button>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="cms-section">
          <div className="section-header">
            <h2>Program Pelatihan</h2>
            <Link to="/cms/trainings/new" className="add-button">
              Tambah Program
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Tanggal Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training.id}>
                    <td>{training.title}</td>
                    <td>{training.category}</td>
                    <td>{new Date(training.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/cms/trainings/${training.id}/edit`}>Edit</Link>
                      <Form method="post" action={`/cms/trainings/${training.id}/delete`}>
                        <button type="submit">Hapus</button>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 
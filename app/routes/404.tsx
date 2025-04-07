import { Link } from "@remix-run/react";
import styles from "~/styles/404.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="not-found">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Halaman Tidak Ditemukan</h1>
          <p>
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke beranda atau lihat artikel kami.
          </p>
          <div className="actions">
            <Link to="/" className="primary-button">
              Kembali ke Beranda
            </Link>
            <Link to="/artikel" className="secondary-button">
              Lihat Artikel
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 
import styles from "~/styles/footer.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

interface FooterProps {
  type?: "Dark" | "Light";
}

export default function Footer({ type = "Dark" }: FooterProps) {
  return (
    <footer className={`footer ${type.toLowerCase()}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/images/akses.png" alt="Ikram Academy Logo" className="footer-logo" />
            <p>Mengembangkan potensi dan kompetensi untuk masa depan yang lebih baik.</p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h3>Program</h3>
              <ul>
                <li><a href="#">Public Speaking</a></li>
                <li><a href="#">Leadership</a></li>
                <li><a href="#">Followership</a></li>
                <li><a href="#">Team Building</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h3>Layanan</h3>
              <ul>
                <li><a href="#">Training</a></li>
                <li><a href="#">Consulting</a></li>
                <li><a href="#">Assessment</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h3>Perusahaan</h3>
              <ul>
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#">Tim Kami</a></li>
                <li><a href="#">Karir</a></li>
                <li><a href="#">Hubungi Kami</a></li>
              </ul>
            </div>

            <div className="link-group contact">
              <h3>Kontak</h3>
              <ul>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Jl. Example No. 123, Jakarta</span>
                </li>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>info@ikramacademy.com</span>
                </li>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9987 21.4142 21.3738C21.0391 21.7489 20.5109 21.9596 19.96 21.96C16.4289 21.96 13.0149 20.6383 10.2903 18.2467C7.7278 16.0023 5.72787 13.0974 4.64 9.75998C3.85396 7.19092 3.98813 4.45145 5.02 2.00001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3318 7.07561 18.8095 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.7721 6.91101 23 8.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>+62 812 3456 7890</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Ikram Academy. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95724 14.8821 3.28445C14.0247 3.61166 13.2884 4.19447 12.773 4.95376C12.2575 5.71305 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
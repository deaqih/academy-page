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
            <img src="/images/logo.png" alt="Ikram Academy Logo" className="footer-logo" />
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
                <li><a href="/pelatihan">Training</a></li>
                <li><a href="/pelatihan">Consulting</a></li>
                <li><a href="/pelatihan">Assessment</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h3>Perusahaan</h3>
              <ul>
                <li><a href="/about">Tentang Kami</a></li>
                <li><a href="#">Tim Kami</a></li>
                <li><a href="#">Karir</a></li>
                <li><a href="https://wa.me/6285183198360">Hubungi Kami</a></li>
              </ul>
            </div>

            <div className="link-group contact">
              <h3>Kontak</h3>
              <ul>
                {/* <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Jl. Example No. 123, Jakarta</span>
                </li> */}
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ikramacademy.id@gmail.com</span>
                </li>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9987 21.4142 21.3738C21.0391 21.7489 20.5109 21.9596 19.96 21.96C16.4289 21.96 13.0149 20.6383 10.2903 18.2467C7.7278 16.0023 5.72787 13.0974 4.64 9.75998C3.85396 7.19092 3.98813 4.45145 5.02 2.00001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3318 7.07561 18.8095 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.7721 6.91101 23 8.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>+62 851 8319 8360</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Ikram Academy. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/ikramacademy.778939" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://x.com/ikramacademyid" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4L20 20M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 12L16 8M12 12L8 16M12 12L8 8M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ikramacademy.id/" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@IKRAMACADEMYINDONESIA" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 0.999999 11.75C0.988779 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@ikramacademy.id" aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.8218 3.63636C16.8218 3.63636 16.5801 3.63636 16.5801 3.63636V3.63636C15.1602 2.21645 14.3218 2 14.3218 2V6.27273C14.3218 6.27273 12.902 5.33645 11 5.33645C7.87818 5.33645 5.34545 7.86918 5.34545 11C5.34545 14.1218 7.87818 16.6545 11 16.6545C14.1218 16.6545 16.6545 14.1218 16.6545 11V7.09091" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.6545 3.63636C17.8364 4.81818 19.5 5.33645 19.5 5.33645V2H16.6545V3.63636Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://wa.me/6285183198360" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.4054 3.4875C18.1607 1.2375 15.1714 0 11.9946 0C5.4375 0 0.101786 5.33571 0.101786 11.8929C0.101786 13.9821 0.654464 16.0179 1.70357 17.8071L0 24L6.32143 22.3286C8.03571 23.2929 9.99643 23.7964 11.9946 23.7964H12C18.5518 23.7964 24 18.4607 24 11.9036C24 8.72679 22.65 5.7375 20.4054 3.4875ZM11.9946 21.7821C10.2214 21.7821 8.48571 21.3 6.96428 20.3786L6.60714 20.1643L2.85714 21.1714L3.88393 17.5071L3.64821 17.1375C2.63571 15.5518 2.10536 13.7518 2.10536 11.8929C2.10536 6.45 6.55179 2 11.9946 2C14.6357 2 17.1214 3.02679 19.0071 4.91786C20.8929 6.80893 21.9964 9.29464 21.9964 11.9036C21.9964 17.3464 17.4375 21.7821 11.9946 21.7821Z" fill="currentColor"/>
                <path d="M17.6571 14.4214C17.3732 14.2714 15.8946 13.5464 15.6321 13.4393C15.3696 13.3321 15.1821 13.2786 14.9946 13.5625C14.8071 13.8464 14.2339 14.5179 14.0679 14.7054C13.9018 14.8929 13.7357 14.9143 13.4518 14.7643C13.1679 14.6143 12.1768 14.2929 10.9875 13.2357C10.0446 12.4036 9.40714 11.3804 9.24107 11.0964C9.07499 10.8125 9.22499 10.6571 9.36964 10.5125C9.49821 10.3839 9.65357 10.175 9.79821 10.0089C9.94285 9.84286 9.99643 9.71429 10.1036 9.52679C10.2107 9.33929 10.1571 9.17321 10.0821 9.02321C10.0071 8.87321 9.37499 7.39464 9.13392 6.82679C8.89821 6.27321 8.65714 6.34821 8.48035 6.33749C8.31428 6.32679 8.12678 6.32679 7.93928 6.32679C7.75178 6.32679 7.46249 6.40179 7.19999 6.68571C6.93749 6.96964 6.15892 7.69464 6.15892 9.17321C6.15892 10.6518 7.22678 12.0768 7.37142 12.2643C7.51606 12.4518 9.39642 15.3429 12.2625 16.6393C12.9643 16.95 13.5161 17.1375 13.9446 17.2768C14.6464 17.5071 15.2839 17.4696 15.7875 17.3946C16.3446 17.3089 17.5339 16.6714 17.775 16.0179C18.0161 15.3643 18.0161 14.7964 17.9411 14.7054C17.8661 14.6143 17.6786 14.5714 17.3946 14.4214H17.6571Z" fill="currentColor"/>
              </svg>
            </a>
            <a href="mailto:ikramacademy.id@gmail.com" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
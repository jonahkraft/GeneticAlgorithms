import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>Website Information</p>

            <ul className={styles.footerLinks}>
                <li className={styles.footerLinksItem}>Privacy Policy</li>
                <li className={styles.footerLinksItem}>Legal Notice</li>
                <li className={styles.footerLinksItem}>Terms of Use</li>
                <li className={styles.footerLinksItem}>Cookies</li>
            </ul>

            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className={styles.footerLinksItem}>Never gonna give you up :)</a>

        </footer>
    );
}

export default Footer;

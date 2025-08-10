import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; // FontAwesome Icons

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2025 AgriConnect. All rights reserved.</p>
      <div style={styles.icons}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF style={styles.icon} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={styles.icon} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn style={styles.icon} />
        </a>
      </div>
    </footer>
  );
}

// CSS-in-JS Styles
const styles = {
  footer: {
    textAlign: 'center',
    padding: '0px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '10px',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
  },
};

export default Footer;
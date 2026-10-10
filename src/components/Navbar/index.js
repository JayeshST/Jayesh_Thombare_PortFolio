import React, { useRef, useEffect } from 'react'
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink
} from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';

// Material UI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [socialOpen, setSocialOpen] = React.useState(false);
  const theme = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSocialOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const socialLinks = [
    { href: "https://www.youtube.com/@Pov_of_jayesh", icon: <YouTubeIcon />, label: "YouTube" },
    { href: "https://www.instagram.com/pov_of_jayesh", icon: <InstagramIcon />, label: "Instagram" },
    { href: "https://www.linkedin.com/in/jayesh-thombare-473771189/", icon: <LinkedInIcon />, label: "LinkedIn" },
    { href: "https://jayeshthombare.vercel.app/", icon: <DiCssdeck />, label: "Portfolio" },
    { href: "#", icon: <FacebookIcon />, label: "Facebook" },
    { href: "#", icon: <TwitterIcon />, label: "Twitter" },
    { href: "mailto:projectsupport.jayesh@gmail.com", icon: <EmailIcon />, label: "Email" },
    { href: "tel:+917028586111", icon: <SmartphoneIcon />, label: "Phone" }
  ];

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "blue",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "all 0.3s ease"
  };

  return (
    <Nav>
      <NavbarContainer>
        {/* Logo */}
        <NavLogo to='/'>
          <a style={{ display: "flex", alignItems: "center", color: "orange", marginBottom: '20px', cursor: 'pointer' }}>
            <DiCssdeck size="3em" /> <Span>PortFolio</Span>
          </a>
        </NavLogo>

        {/* Mobile Icon */}
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>

        {/* Desktop Nav Items */}
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>

          {/* Social Media Dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <NavLink
              href="#socialmedia"
              onClick={(e) => {
                e.preventDefault();
                setSocialOpen(!socialOpen);
              }}
            >
              Socials▾
            </NavLink>
            {socialOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: "10px",
                  zIndex: 1000,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  padding: "14px",
                  animation: "fadeIn 0.3s ease-in-out"
                }}
              >
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "violet";
                      e.currentTarget.style.background = "rgba(200,200,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "blue";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item.icon} {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </NavItems>

        {/* GitHub Button */}
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">
            Github Profile
          </GitHubButton>
        </ButtonContainer>

        {/* Mobile Menu */}
{isOpen && (
  <MobileMenu isOpen={isOpen}>
    <MobileLink href="#about" onClick={() => setIsOpen(false)}>About</MobileLink>
    <MobileLink href="#skills" onClick={() => setIsOpen(false)}>Skills</MobileLink>
    <MobileLink href="#experience" onClick={() => setIsOpen(false)}>Experience</MobileLink>
    <MobileLink href="#projects" onClick={() => setIsOpen(false)}>Projects</MobileLink>
    <MobileLink href="#education" onClick={() => setIsOpen(false)}>Education</MobileLink>

    {/* Socials Section just below Education */}
    <div style={{ marginTop: "12px" }}>
      <span style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>Socials</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onClick={() => setIsOpen(false)} // close menu after click
          >
            {item.icon} {item.label}
          </a>
        ))}
      </div>
    </div>

    <GitHubButton
      style={{
        padding: '10px 16px',
        background: `${theme.primary}`,
        color: 'white',
        width: 'max-content',
        marginTop: "16px"
      }}
      href={Bio.github}
      target="_blank"
    >
      Github Profile
    </GitHubButton>
  </MobileMenu>
)}

        
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar;

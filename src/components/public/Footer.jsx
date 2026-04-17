import React from "react";
import logo from "../../assets/Global-logo.png";

const socialIcons = [
  { label: "Telegram", path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

const SocialIcon = ({ label, path }) => (
  <a href="#" aria-label={label} className="hover:bg-white/20 transition-colors rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 30, height: 30, background: "rgba(255,255,255,0.12)" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" viewBox="0 0 24 24"><path d={path} /></svg>
  </a>
);

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#121F27", minHeight: "100vh", padding: "16px" }}>
      <div style={{ backgroundColor: "#D92B3A", borderRadius: "24px" }} className="montserrat text-white px-6 md:px-10 py-8 md:py-12">

        {/* ── MOBILE LAYOUT ── */}
        <div className="xl:hidden flex flex-col gap-6  ">

          {/* Logo + Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-1">
              <img src={logo} alt="Universal Detective" className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0" />
              <h2 className="font-semibold text-[13px] leading-snug">Universal Detective pvt ltd</h2>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">A108 Adam Street New York, NY 535022 United States</p>
            <p className="text-xs text-white/80">Phone: +91 5589 55488 55</p>
            <p className="text-xs text-white/80">Email: universaldetective@contact.com</p>
            <div className="flex gap-2 pt-1">
              {socialIcons.map((s) => <SocialIcon key={s.label} {...s} />)}
            </div>
          </div>

          {/* Quick Links + Support side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-[13px] mb-2">Quick Links</h3>
              <ul className="text-xs space-y-2 text-white/80">
                <li>Home</li><li>About us</li><li>Social Media</li><li>Contact us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] mb-2">Support</h3>
              <ul className="text-xs space-y-2 text-white/80">
                <li>Help center</li><li>Terms conditions</li><li>Privacy Policy</li><li>FAQ</li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[13px] mb-3">Services</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[11px]">
              <div>
                <p className="font-bold mb-1">Private Investigation Services</p>
                <ul className="text-white/80 space-y-1">
                  <li>Personal background verification</li>
                  <li>Matrimonial &amp; relationship investigations</li>
                  <li>Missing person tracing</li>
                  <li>Surveillance and evidence collection</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-1">Corporate Investigation Services</p>
                <ul className="text-white/80 space-y-1">
                  <li>Employee background verification</li>
                  <li>Corporate fraud detection</li>
                  <li>Internal policy violation investigations</li>
                  <li>Due diligence &amp; risk assessment</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-1">OSINT (Open-Source Intelligence)</p>
                <ul className="text-white/80 space-y-1">
                  <li>Digital footprint analysis</li>
                  <li>Social media investigations</li>
                  <li>Online reputation assessment</li>
                  <li>Public data intelligence gathering</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-1">Field Investigation Services</p>
                <ul className="text-white/80 space-y-1">
                  <li>On-site verification</li>
                  <li>Location-based investigation</li>
                  <li>Physical surveillance</li>
                  <li>Asset &amp; property verification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Helpline */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
            <h3 className="font-semibold text-[13px] mb-3">Country Helpline numbers</h3>
            <ul className="text-[11px] text-white/90 space-y-1 leading-relaxed">
              <li>Police Control Room – 100</li>
              <li>Fire Brigade – 101</li>
              <li>Ambulance / Medical Emergency – 102</li>
              <li>Disaster Management Services – 108</li>
              <li>All-in-one emergency number – 112</li>
              <li>Women Helpline (All India) – 1091</li>
              <li>Women Helpline (Domestic Abuse) – 181</li>
              <li>Cyber Crime Helpline – 1930</li>
              <li>Tourist Helpline – 1363</li>
              <li>Child Helpline – 1098</li>
              <li>AIDS Helpline – 1097</li>
              <li>Anti-Poison Helpline – 1066</li>
              <li>Senior Citizen Helpline – 1091 / 1291</li>
              <li>Railway Enquiry – 139</li>
              <li>Telephone Complaint Booking – 198</li>
              <li>Directory Enquiry – 197</li>
              <li>Traffic Police – 103</li>
              <li>Voter Helpline – 1950</li>
              <li>Road Accident Emergency – 1033</li>
              <li>DCP – Missing Child &amp; Women – 1094</li>
              <li>KIRAN Mental Health – 1800-599-0019</li>
              <li>Tele-MANAS – 14416</li>
              <li>Vandrevala Foundation – +91-9152987821</li>
              <li>AASRA (24×7) – +91-22-27546669</li>
              <li>iLife Suicide Prevention – +91-78930-78930</li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-center text-[11px] border-t border-white/20 pt-4 text-white/70">
            © Copyright <span className="font-semibold text-white">Universal Detective pvt. ltd.</span> All Rights Reserved
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden xl:block">
          <div className="grid grid-cols-[200px_160px_1fr_1fr_1fr] gap-y-8 gap-x-8">

            {/* Col 1: Logo + Company Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-1">
                <img src={logo} alt="Universal Detective" className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
                <div style={{ display: "none", width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}></div>
                <h2 className="font-semibold text-[15px] leading-snug">Universal<br />Detective pvt ltd</h2>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">A108 Adam Street New York, NY 535022<br />United States</p>
              <p className="text-xs text-white/80">Phone: +91 5589 55488 55</p>
              <p className="text-xs text-white/80">Email: universaldetective@contact.com</p>
              <div className="flex gap-2 pt-1 flex-wrap">
                {socialIcons.map((s) => <SocialIcon key={s.label} {...s} />)}
              </div>
            </div>

            {/* Col 2: Quick Links + Support */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-[13px] mb-3">Quick Links</h3>
                <ul className="text-xs space-y-[9px] text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                  <li className="hover:text-white cursor-pointer transition-colors">About us</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Social Media</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact us</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[13px] mb-3">Support</h3>
                <ul className="text-xs space-y-[9px] text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors">Help center</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Terms conditions</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                </ul>
              </div>
            </div>

            {/* Col 3 */}
            <div className="text-xs leading-relaxed">
              <h3 className="font-semibold text-[13px] mb-4">Services</h3>
              <p className="font-bold text-white text-[11px] mb-[5px]">Private Investigation Services</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>Personal background verification</li>
                <li>Matrimonial &amp; relationship investigations</li>
                <li>Missing person tracing</li>
                <li>Surveillance and evidence collection</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Corporate Investigation Services</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>Employee background verification</li>
                <li>Corporate fraud detection</li>
                <li>Internal policy violation investigations</li>
                <li>Due diligence &amp; risk assessment</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Litigation &amp; Legal Support</p>
              <ul className="text-white/80 space-y-[4px] text-[11px]">
                <li>Evidence collection for legal cases</li>
                <li>Pre-litigation investigations</li>
                <li>Witness verification</li>
                <li>Court-admissible documentation support</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="text-xs leading-relaxed">
              <div style={{ height: "33px" }} />
              <p className="font-bold text-white text-[11px] mb-[5px]">OSINT (Open-Source Intelligence)</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>Digital footprint analysis</li>
                <li>Social media investigations</li>
                <li>Online reputation assessment</li>
                <li>Public data intelligence gathering</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Field Investigation Services</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>On-site verification</li>
                <li>Location-based investigation</li>
                <li>Physical surveillance</li>
                <li>Asset &amp; property verification</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Cyber &amp; Digital Investigation</p>
              <ul className="text-white/80 space-y-[4px] text-[11px]">
                <li>Online fraud investigation</li>
                <li>Email &amp; communication analysis</li>
                <li>Digital identity verification</li>
                <li>Data trail analysis</li>
              </ul>
            </div>

            {/* Col 5 */}
            <div className="text-xs leading-relaxed">
              <div style={{ height: "33px" }} />
              <p className="font-bold text-white text-[11px] mb-[5px]">Intelligence &amp; Monitoring Services</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>Ongoing case monitoring</li>
                <li>Incident tracking</li>
                <li>Activity pattern analysis</li>
                <li>Periodic intelligence reports</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Security &amp; Risk Assessment</p>
              <ul className="text-white/80 space-y-[4px] mb-4 text-[11px]">
                <li>Threat assessment</li>
                <li>Personal security analysis</li>
                <li>Corporate risk evaluation</li>
                <li>Vulnerability audits</li>
              </ul>
              <p className="font-bold text-white text-[11px] mb-[5px]">Background Verification</p>
              <ul className="text-white/80 space-y-[4px] text-[11px]">
                <li>Employment verification</li>
                <li>Education &amp; credential checks</li>
                <li>Address verification</li>
                <li>Criminal record verification</li>
              </ul>
            </div>
          </div>

          {/* Helpline */}
          <div className="rounded-2xl p-5 md:p-6 mt-10" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
            <h3 className="font-semibold text-[13px] mb-4">Country Helpline numbers</h3>
            <div className="grid grid-cols-4 gap-5 text-white/90 text-[11px] leading-relaxed">
              <ul className="space-y-[7px]">
                <li>Police Control Room – 100</li>
                <li>Fire Brigade – 101</li>
                <li>Ambulance / Medical Emergency – 102</li>
                <li>Disaster Management Services – 108</li>
                <li>All-in-one emergency number for Police, Fire, Ambulance, etc – 112</li>
                <li>Women Helpline (All India) – 1091</li>
                <li>Women Helpline (Domestic Abuse) – 181</li>
              </ul>
              <ul className="space-y-[7px]">
                <li>Cyber Crime Helpline – 1930</li>
                <li>Tourist Helpline – 1363 or 180011363</li>
                <li>Child Helpline (Children in Need) – 1098</li>
                <li>AIDS Helpline – 1097</li>
                <li>Anti-Poison Helpline (New Delhi) – 1066 or 011-1066</li>
                <li>Senior Citizen Helpline – 1091 / 1291</li>
                <li>Railway Enquiry – 139</li>
              </ul>
              <ul className="space-y-[7px]">
                <li>Telephone Complaint Booking – 198</li>
                <li>Directory Enquiry – 197</li>
                <li>Traffic Police – 103</li>
                <li>Voter Helpline – 1950</li>
                <li>Road Accident Emergency Service (Private Operators) – 1033</li>
                <li>Deputy Commissioner of Police – Missing Child &amp; Women – 1094</li>
              </ul>
              <ul className="space-y-[7px]">
                <li>· KIRAN Mental Health Helpline – 1800-599-0019 / 18005990019</li>
                <li>· Tele-MANAS Mental Health – 14416 / 1800-891-4416 (Govt of India)</li>
                <li>· Vandrevala Foundation (24×7 support) – +91-9152987821 / 9152987822</li>
                <li>· AASRA (24×7 crisis support) – +91-22-27546669</li>
                <li>· 1Life Suicide Prevention – +91-78930-78930</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-[11px] mt-8 border-t border-white/20 pt-4 text-white/70">
            © Copyright <span className="font-semibold text-white">Universal Detective pvt. ltd.</span> All Rights Reserved
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;

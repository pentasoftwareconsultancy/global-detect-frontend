import React from 'react';
import { Building2, Search, Globe, Home, Shield, UserCheck, Scale, FileText } from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      title: 'Corporate Investigation Services',
      icons: [<Building2 size={24} />, <Shield size={24} />, <FileText size={24} />],
      items: [
        'Employee background verification',
        'Corporate fraud detection',
        'Internal policy violation investigations',
        'Due diligence & risk assessment'
      ]
    },
    {
      title: 'Intelligence & Monitoring Services',
      icons: [<Search size={24} />, <Shield size={24} />, <UserCheck size={24} />],
      items: [
        'Ongoing case monitoring',
        'Incident tracking',
        'Activity pattern analysis',
        'Periodic intelligence reports'
      ]
    },
    {
      title: 'OSINT (Open-Source Intelligence)',
      icons: [<Scale size={24} />, <Globe size={24} />, <FileText size={24} />],
      items: [
        'Digital footprint analysis',
        'Social media investigations',
        'Online reputation assessment',
        'Public data intelligence gathering'
      ]
    },
    {
      title: 'Property services',
      icons: [<Home size={24} />, <Shield size={24} />],
      items: [
        'Housing services',
        'Ploting services',
        'Society services'
      ]
    }
  ];

  return (
    <section id="services" className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24">
    <section className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Services</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Our services include private and corporate investigations, background verification, litigation support, OSINT, and on-field investigations. Each case is handled through a secure digital workflow, ensuring confidentiality, verified professionals, and accurate, evidence-based reporting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((category, idx) => (
            <div key={idx} className="bg-[#1a2333]/50 border border-white/10 rounded-2xl p-8 hover:border-red/50 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {category.icons.map((icon, i) => (
                    <div key={i} className="p-2 bg-red/10 rounded-lg text-red group-hover:bg-red group-hover:text-white transition-colors">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="text-gray-400 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-red rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
    </section>
  );
};

export default Services;
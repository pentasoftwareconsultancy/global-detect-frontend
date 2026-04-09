import React from 'react';
import {
  Building2,
  Search,
  Globe,
  Shield,
  UserCheck,
  Scale,
  FileText
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      cards: [
        {
          title: 'Private Investigation Services',
          icon: UserCheck,
          items: [
            'Personal background verification',
            'Matrimonial & relationship investigations',
            'Missing person tracing',
            'Surveillance and evidence collection'
          ]
        },
        {
          title: 'Security & Risk Assessment',
          icon: Shield,
          items: [
            'Threat assessment',
            'Personal security analysis',
            'Corporate risk evaluation',
            'Vulnerability audits'
          ]
        },
        {
          title: 'Corporate Investigation Services',
          icon: Building2,
          items: [
            'Employee background verification',
            'Corporate fraud detection',
            'Internal policy violation investigations',
            'Due diligence & risk assessment'
          ]
        }
      ]
    },

    {
      cards: [
        {
          title: 'Cyber & Digital Investigation',
          icon: Globe,
          items: [
            'Online fraud investigation',
            'Email & communication analysis',
            'Digital identity verification',
            'Data trail analysis'
          ]
        },
        {
          title: 'Field Investigation Services',
          icon: Search,
          items: [
            'On-ground verification',
            'Site visits & inspections',
            'Surveillance operations',
            'Evidence collection'
          ]
        },
        {
          title: 'Intelligence & Monitoring Services',
          icon: UserCheck,
          items: [
            'Ongoing case monitoring',
            'Incident tracking',
            'Activity pattern analysis',
            'Periodic intelligence reports'
          ]
        }
      ]
    },

    {
      cards: [
        {
          title: 'Litigation & Legal Support',
          icon: Scale,
          items: [
            'Evidence collection for cases',
            'Pre-litigation investigations',
            'Witness verification',
            'Court-admissible documentation'
          ]
        },
        {
          title: 'Background Verification',
          icon: Shield,
          items: [
            'Employment verification',
            'Education checks',
            'Address verification',
            'Criminal record checks'
          ]
        },
        {
          title: 'OSINT (Open-Source Intelligence)',
          icon: FileText,
          items: [
            'Digital footprint analysis',
            'Social media investigations',
            'Online reputation assessment',
            'Public data intelligence gathering'
          ]
        }
      ]
    },

    {
      cards: [
        {
          title: 'Court Disputes',
          icon: Scale,
          items: [
            'Investigation & evidence support',
            'Legal compliance findings',
            'Accurate reporting',
            'Case strengthening insights'
          ]
        },
        {
          title: 'Property Services',
          icon: Building2,
          items: [
            'Ownership verification',
            'Site validation',
            'Risk assessment',
            'Property investigation'
          ]
        }
      ]
    }
  ];

  return (
    <section
      id="services"
      className="bg-[#121F27] text-white py-14 md:py-16 px-6 md:px-12 lg:px-20 "
    >
      <div className="max-w-6xl">

        {/* TITLE */}
        <h2 className="text-4xl font-bold mb-4">Services</h2>
        <p className="text-gray-400 mb-10 max-w-3xl">
          Our services include private and corporate investigations, background verification, litigation support,
          OSINT, and on-field investigations. Each case is handled through a secure digital workflow, ensuring confidentiality,
          verified professionals, and accurate, evidence-based reporting.</p>

        <div className="flex flex-col gap-14">

          {serviceCategories.map((category, idx) => (
            <div key={idx} className="relative h-[160px] group">

              {category.cards.map((card, i) => {
                const Icon = card.icon;
                const isTop = i === category.cards.length - 1;

                return (
                  <div
                    key={i}
                    className={`
                      absolute top-0 left-0
                      rounded-2xl border border-white/20
                      bg-[#1a2333]/60 backdrop-blur
                      flex items-center px-6 py-5
                      transition-all duration-500 ease-out
                      cursor-pointer

                      hover:bg-red-600
                      hover:shadow-[0_0_40px_rgba(255,0,0,0.6)]
                    `}
                    style={{
                      width: '420px', // ✅ same width for all cards
                      transform: `translateX(${i * 75}px)`, // ✅ more spacing → icons fully visible
                      zIndex: i + 1
                    }}
                  >

                    {/* ICON */}
                    <div className="p-3 bg-white rounded-lg text-red-600 mr-4 shrink-0">
                      <Icon size={20} />
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`
                        transition-all duration-500
                        ${isTop ? 'opacity-100' : 'opacity-0'}
                        group-hover:opacity-100
                      `}
                    >
                      <h3 className="text-lg font-semibold mb-2 whitespace-nowrap">
                        {card.title}
                      </h3>

                      <ul className="text-sm text-gray-300 space-y-1">
                        {card.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                );
              })}

              <style>
                {`
                  .group:hover > div:nth-child(1) {
                  transform: translateX(0px) !important;
                }
                  .group:hover > div:nth-child(2) {
                  transform: translateX(450px) !important;
                }
                  .group:hover > div:nth-child(3) {
                  transform: translateX(900px) !important;
                }
                `}
              </style>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;
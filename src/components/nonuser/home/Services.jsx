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
  // Flattened services array for mobile grid
  const allServices = [
    {
      title: 'OSINT (Open-Source Intelligence)',
      icon: FileText,
      items: [
        'Digital footprint analysis',
        'Social media investigations',
        'Online reputation assessment',
        'Public data intelligence gathering'
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
    },
    {
      title: 'Corporate Investigation Services',
      icon: Building2,
      items: [
        'Employee background verification',
        'Corporate fraud detection',
        'Due diligence & risk assessmen'
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
      title: 'Field Investigation Services',
      icon: Search,
      items: [
        'On-site verification',
        'Location-based investigation',
        'Physical surveillance',
        'Asset & property verification'
      ]
    },
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
      title: 'Background Verification',
      icon: Shield,
      items: [
        'Employment verification',
        'Education & credential checks',
        'Address verification',
        'Criminal record verification'
      ]
    },
    {
      title: 'Litigation Support',
      icon: Scale,
      items: [
        'Evidence collection for cases',
        'Pre-litigation investigations',
        'Witness verification',
        'Court-admissible documentation support'
      ]
    },
    {
      title: 'Property Services',
      icon: Building2,
      items: [
        'Housing services',
        'Plotting services',
        'Society services'
      ]
    },
    {
      title: 'Court Disputes',
      icon: Scale,
      items: [
        'Investigation & evidence support',
        'Legal compliance findings',
        'Accurate, verifiable findings'
      ]
    }
  ];

  // Original desktop service categories
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
      className="bg-[#121F27] text-white pt-8 lg:pt-16 pb-6 lg:pb-8 px-4 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">Services</h2>
        <p className="text-gray-400 mb-6 lg:mb-10 max-w-3xl text-xs sm:text-sm lg:text-base leading-relaxed">
          Our services include private and corporate investigations, background verification, litigation support,
          OSINT, and on-field investigations. Each case is handled through a secure digital workflow, ensuring confidentiality,
          verified professionals, and accurate, evidence-based reporting.
        </p>

        {/* MOBILE LAYOUT - 2 Column Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          {allServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-[#1a2333]/60 backdrop-blur border border-white/20 rounded-xl p-3 h-[130px] flex flex-col"
              >
                {/* ICON + TITLE ROW */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white rounded-lg text-red-600 flex-shrink-0">
                    <Icon size={14} />
                  </div>
                  <h3 className="text-[11px] font-semibold leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* ITEMS */}
                <ul className="text-[10px] text-gray-300 space-y-0.5 overflow-hidden">
                  {service.items.slice(0, 3).map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT - Original Animation */}
        <div className="hidden lg:flex flex-col gap-14">
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

                      hover:bg-gradient-to-r hover:from-[#6b0f17] hover:to-[#c0202e]
                      hover:shadow-[0_0_30px_rgba(180,20,40,0.5)]
                    `}
                    style={{
                      width: '420px',
                      transform: `translateX(${i * 75}px)`,
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
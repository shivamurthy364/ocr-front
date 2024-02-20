import React from 'react'
import { useNavigate } from "react-router-dom";

const features = [
    {
      title: "ESI ",
      description:
        "Use this tool to extract data from your ESI files.",
      icon: "fa fa-check-circle text-green-500",
      route: "/fileupload",
    },
    {
      title: "TDS",
      description:
        "Use this tool to extract data from your TDS files.",
      icon: "fa fa-clock text-blue-500",
      route: "/processing",
    },
    {
      title: "PF",
      description:
        "Use this tool to extract data from PF.",
      icon: "fa fa-language text-purple-500",
      route: "/language",
    },
  //   {
  //     title: "Easy Integration",
  //     description:
  //       "Easily integrate our OCR solution into your applications, websites, or workflows with our comprehensive APIs.",
  //     icon: "fa fa-code text-yellow-500",
  //     route: "/integration",
  //   },
  ];

function ToolsList () {

    const navigate = useNavigate();

    const handleFeatureClick = (route) => {
      navigate(route);
    };
    
  return (
    <div className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Try our Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-md cursor-pointer"
              onClick={() => handleFeatureClick(feature.route)}
            >
              <i className={`${feature.icon} text-4xl mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ToolsList

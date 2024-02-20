import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "High Accuracy",
    description:
      "Our OCR technology ensures high accuracy in recognizing characters from images, documents, and scanned files.",
    icon: "fa fa-check-circle text-green-500",
    route: "/accuracy",
  },
  {
    title: "Fast Processing",
    description:
      "With our efficient algorithms, we offer fast processing speeds, allowing you to extract text swiftly and efficiently.",
    icon: "fa fa-clock text-blue-500",
    route: "/toolslist",
  },
  // {
  //   title: "Multi-Language Support",
  //   description:
  //     "Our OCR tool supports recognition of text in multiple languages, making it versatile and globally accessible.",
  //   icon: "fa fa-language text-purple-500",
  //   route: "/language",
  // },
//   {
//     title: "Easy Integration",
//     description:
//       "Easily integrate our OCR solution into your applications, websites, or workflows with our comprehensive APIs.",
//     icon: "fa fa-code text-yellow-500",
//     route: "/integration",
//   },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/toolslist"); // Specify the route of the next page here
  };

  const handleFeatureClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Extractify OCR
        </h1>
        <p className="text-lg text-white">
          Your ultimate solution for Optical Character Recognition
        </p>
        <button 
          onClick={handleGetStarted}
        className="mt-8 bg-white text-purple-500 font-semibold py-2 px-6 rounded-lg hover:bg-purple-100 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Try our Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-center py-16 text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to experience the power of OCR?
        </h2>
        <p className="text-lg mb-6">
       Start extracting text with ease!
        </p>
        {/* <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
          Sign Up
        </button> */}
      </div>
    </div>
  );
}

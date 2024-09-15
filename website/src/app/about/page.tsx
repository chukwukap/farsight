import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          About Farsight
        </h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                className="h-48 w-full object-cover md:w-48"
                src="/images/farsight-logo.png"
                alt="Farsight Logo"
                width={192}
                height={192}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Farcaster Analytics Platform
              </div>
              <p className="mt-2 text-gray-600">
                Farsight is a comprehensive web application designed to provide
                in-depth analytics and visualizations for the entire Farcaster
                ecosystem. Our tool offers valuable insights for individual
                users, channel owners, developers, and platform analysts.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To empower the Farcaster community with actionable insights,
            fostering growth and engagement across the platform.
          </p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "User Analytics",
    description:
      "Track personal growth metrics, content performance, and visualize your network connections.",
  },
  {
    title: "Channel Insights",
    description:
      "Analyze channel growth, engagement metrics, and identify top contributors.",
  },
  {
    title: "Ecosystem-wide Trends",
    description:
      "Discover global trends, cross-channel analysis, and content flow patterns.",
  },
  {
    title: "Developer Tools",
    description:
      "Monitor API usage, track webhook analytics, and optimize app performance.",
  },
  {
    title: "Warp & Frame Analytics",
    description:
      "Measure Warp usage trends and analyze Frame engagement metrics.",
  },
  {
    title: "Predictive Analytics",
    description:
      "Forecast user growth, predict content virality, and identify potential churn.",
  },
];

import React, { useState } from "react";
import { motion } from "framer-motion";

const News = () => {
  const [selectedNews, setSelectedNews] = useState<{
    id: string;
    title: string;
    fullContent: string;
  } | null>(null);

  const newsItems = [
    {
      id: "new-breakthrough-in-cancer-treatment",
      title: "📌 New Breakthrough in Cancer Treatment",
      summary: "Researchers have discovered a promising new therapy that significantly improves cancer treatment outcomes.",
      points: [
        "How the new drug works",
        "Clinical trials and results",
        "Potential side effects and availability",
      ],
      fullContent: `
        New Breakthrough in Cancer Treatment

        Researchers have discovered a promising new therapy that significantly improves cancer treatment outcomes. This groundbreaking treatment targets cancer cells more precisely, reducing damage to healthy tissues.

        Key Details:
        - How the new drug works: The drug uses a novel mechanism to inhibit cancer cell growth while sparing normal cells.
        - Clinical trials and results: Phase 3 trials showed a 40% improvement in survival rates compared to standard treatments.
        - Potential side effects and availability: Common side effects include fatigue and nausea. The drug is expected to be available by mid-2024.
      `,
    },
    {
      id: "ai-in-healthcare-the-future-of-diagnosis",
      title: "🤖 AI in Healthcare: The Future of Diagnosis",
      summary: "Artificial intelligence is revolutionizing diagnostics by improving accuracy and reducing turnaround time.",
      points: [
        "AI-powered tools in radiology",
        "Ethical concerns in AI diagnosis",
        "How AI is improving patient outcomes",
      ],
      fullContent: `
        AI in Healthcare: The Future of Diagnosis

        Artificial intelligence is revolutionizing diagnostics by improving accuracy and reducing turnaround time. AI-powered tools are now being used in radiology to detect abnormalities with unprecedented precision.

        Key Details:
        - AI-powered tools in radiology: AI algorithms can analyze medical images faster and more accurately than human radiologists.
        - Ethical concerns in AI diagnosis: Issues like data privacy and algorithmic bias need to be addressed.
        - How AI is improving patient outcomes: Faster and more accurate diagnoses lead to better treatment plans and outcomes.
      `,
    },
    {
      id: "updates-on-covid-19-vaccines",
      title: "💉 Updates on COVID-19 Vaccines",
      summary: "A new booster shot has been introduced to improve immunity against emerging COVID-19 variants.",
      points: [
        "Who should take the booster?",
        "Effectiveness against new variants",
        "Side effects and safety concerns",
      ],
      fullContent: `
        Updates on COVID-19 Vaccines

        A new booster shot has been introduced to improve immunity against emerging COVID-19 variants. This booster is designed to provide better protection against the latest strains of the virus.

        Key Details:
        - Who should take the booster?: The booster is recommended for adults over 50 and immunocompromised individuals.
        - Effectiveness against new variants: Early studies show a 70% reduction in severe illness.
        - Side effects and safety concerns: Common side effects include mild fever and soreness at the injection site.
      `,
    },
  ];

  const handleShare = (news: { title: string; summary: string }) => {
    const shareText = `${news.title}\n\n${news.summary}\n\nRead more: [Link to full article]`;
    const shareUrl = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(news.title)}&body=${encodeURIComponent(shareText)}`;

    // Open share options
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback for devices that don't support navigator.share
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Medical News & Updates</h2>
      <p className="mb-6 text-gray-700">
        Stay informed with the latest developments in healthcare, medical research, and industry news.
      </p>

      {newsItems.map((news) => (
        <div key={news.id} className="mb-6 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
          <p className="text-gray-600 mb-4">{news.summary}</p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            {news.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => setSelectedNews(news)}
            >
              Read More
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => handleShare(news)}
            >
              Share
            </button>
          </div>
        </div>
      ))}

      {/* Pop-up for Read More */}
      {selectedNews && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedNews(null)}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedNews.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{selectedNews.fullContent}</p>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setSelectedNews(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default News;
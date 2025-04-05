import React, { useState } from "react";
import { motion } from "framer-motion";

const Wellness = () => {
  const [selectedWellness, setSelectedWellness] = useState<{
    id: string;
    title: string;
    fullContent: string;
  } | null>(null);

  const wellnessItems = [
    {
      id: "importance-of-mental-health",
      title: "🧠 The Importance of Mental Health",
      summary: "Mental health is just as important as physical health. Learn how to maintain a healthy mind.",
      points: [
        "Why mental health matters",
        "Tips for improving mental health",
        "Resources for mental health support",
      ],
      fullContent: `
        The Importance of Mental Health

        Mental health is just as important as physical health. A healthy mind contributes to overall well-being and quality of life.

        Key Details:
        - Why mental health matters: Mental health affects how we think, feel, and act.
        - Tips for improving mental health: Practice mindfulness, exercise regularly, and seek professional help when needed.
        - Resources for mental health support: Many organizations offer free or low-cost mental health resources.
      `,
    },
    {
      id: "benefits-of-yoga",
      title: "🧘 Benefits of Yoga",
      summary: "Yoga is a powerful practice for improving physical and mental health. Discover its benefits.",
      points: [
        "Physical benefits of yoga",
        "Mental benefits of yoga",
        "How to get started with yoga",
      ],
      fullContent: `
        Benefits of Yoga

        Yoga is a powerful practice for improving physical and mental health. It combines physical postures, breathing exercises, and meditation.

        Key Details:
        - Physical benefits of yoga: Improves flexibility, strength, and balance.
        - Mental benefits of yoga: Reduces stress, anxiety, and depression.
        - How to get started with yoga: Join a local class or follow online tutorials.
      `,
    },
  ];

  const handleShare = (wellness: { title: string; summary: string }) => {
    const shareText = `${wellness.title}\n\n${wellness.summary}\n\nRead more: [Link to full article]`;
    const shareUrl = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    // Open share options
    if (navigator.share) {
      navigator.share({
        title: wellness.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback for devices that don't support navigator.share
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="p-6">
      {wellnessItems.map((wellness) => (
        <div key={wellness.id} className="mb-6 p-6 border-l-4 border-green-500 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">{wellness.title}</h3>
          <p className="text-gray-600 mb-4">{wellness.summary}</p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            {wellness.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => setSelectedWellness(wellness)}
            >
              Read More
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => handleShare(wellness)}
            >
              Share
            </button>
          </div>
        </div>
      ))}

      {/* Pop-up for Read More */}
      {selectedWellness && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWellness(null)}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedWellness.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{selectedWellness.fullContent}</p>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setSelectedWellness(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Wellness;
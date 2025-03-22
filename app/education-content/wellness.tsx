import React, { useState } from "react";

const Wellness = () => {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const wellnessTips = [
    {
      id: "nutrition",
      title: "📌 Nutrition & Healthy Eating",
      summary: "A balanced diet plays a crucial role in preventing chronic diseases and maintaining overall health.",
      points: [
        "Best foods for heart health",
        "Importance of hydration",
        "Meal planning for busy professionals",
      ],
      fullContent: `
        Nutrition & Healthy Eating

        A balanced diet plays a crucial role in preventing chronic diseases and maintaining overall health. Here are some key tips:

        - Best foods for heart health: Include foods rich in omega-3 fatty acids, fiber, and antioxidants.
        - Importance of hydration: Drink at least 8 glasses of water daily to stay hydrated.
        - Meal planning for busy professionals: Prepare meals in advance to save time and ensure a balanced diet.
      `,
    },
    {
      id: "stress-management",
      title: "📌 Managing Stress & Mental Well-being",
      summary: "Learn stress management techniques to improve focus, productivity, and emotional resilience.",
      points: [
        "Mindfulness meditation exercises",
        "How to balance work and personal life",
        "Recognizing and coping with burnout",
      ],
      fullContent: `
        Managing Stress & Mental Well-being

        Stress management is crucial for maintaining mental health. Here are some techniques:

        - Mindfulness meditation exercises: Practice mindfulness for 10 minutes daily to reduce stress.
        - How to balance work and personal life: Set boundaries and prioritize self-care.
        - Recognizing and coping with burnout: Take regular breaks and seek support when needed.
      `,
    },
    {
      id: "sleep",
      title: "📌 Importance of Sleep & Recovery",
      summary: "Quality sleep is essential for brain function, immunity, and overall health. Learn how to improve your sleep.",
      points: [
        "How screen time affects sleep",
        "Creating a sleep-friendly environment",
        "Benefits of power naps",
      ],
      fullContent: `
        Importance of Sleep & Recovery

        Quality sleep is essential for overall health. Here are some tips:

        - How screen time affects sleep: Avoid screens at least 1 hour before bedtime.
        - Creating a sleep-friendly environment: Keep your bedroom dark, quiet, and cool.
        - Benefits of power naps: Take a 20-minute nap to boost productivity and mood.
      `,
    },
  ];

  const handleShare = (tip: { title: string; summary: string }) => {
    const shareText = `${tip.title}\n\n${tip.summary}\n\nRead more: [Link to full article]`;
    const shareUrl = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(tip.title)}&body=${encodeURIComponent(shareText)}`;

    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription logic
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">💖 Health & Wellness</h2>
      <p className="mb-6 text-gray-700">
        Tips and guides for maintaining a healthy lifestyle, reducing stress, and improving overall well-being.
      </p>

      {wellnessTips.map((tip) => (
        <div
          key={tip.id}
          className="mb-6 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
          <p className="text-gray-600 mb-4">{tip.summary}</p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            {tip.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => setExpandedTip(tip.id === expandedTip ? null : tip.id)}
            >
              {tip.id === expandedTip ? "Show Less" : "Read More"}
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => handleShare(tip)}
            >
              Share
            </button>
          </div>
          {tip.id === expandedTip && (
            <div className="mt-4 text-gray-700 whitespace-pre-line">
              {tip.fullContent}
            </div>
          )}
        </div>
      ))}

      {/* Subscribe to Wellness Tips */}
      <div className="mt-8 p-6 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📩 Subscribe to Wellness Tips</h3>
        <p className="text-gray-600 mb-4">
          Get the latest wellness tips delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
        {subscribed && (
          <p className="mt-4 text-green-600">Thank you for subscribing! 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Wellness;
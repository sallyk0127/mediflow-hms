import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const sessions = [
  {
    role: "Nurses",
    title: "Autism Awareness",
    description:
      "This training covers early signs of autism, sensory sensitivities, and effective communication techniques. Learn how to create an inclusive healthcare environment, tailor care approaches, and support autistic patients with empathy and expertise. Improve your understanding of autism spectrum disorders and best practices for patient interactions."
  },
  {
    role: "Nurses, Doctors, and Staff",
    title: "Mental Health Support",
    description:
      "Gain insights into emotional resilience, stress management, and recognizing burnout symptoms. This session explores practical strategies for fostering a supportive work environment and accessing mental health resources. Understand how to balance professional and personal well-being while ensuring compassionate patient care."
  },
  {
    role: "All Healthcare Professionals",
    title: "Proper Report Writing",
    description:
      "Learn to craft clear, concise, and legally compliant documentation. This session covers best practices in patient record-keeping, structuring reports for accuracy, avoiding ambiguities, and adhering to professional guidelines. Enhance your documentation skills to support effective communication and decision-making in healthcare settings."
  },
  {
    role: "All Healthcare Professionals",
    title: "AI in Healthcare",
    description:
      "Explore how artificial intelligence is revolutionizing diagnostics, treatment planning, and hospital administration. This session covers AI-driven medical imaging, predictive analytics, virtual health assistants, and ethical considerations. Learn how AI can enhance patient outcomes while maintaining human-centered care."
  }
];

const TrainingTab = () => {
  const [selectedSession, setSelectedSession] = useState<{ role: string; title: string; description: string } | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); // Reference to the content section

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-blue-100 p-4 rounded-xl shadow-md cursor-pointer transition duration-300 hover:bg-blue-200 ${
              index === 3 ? "col-span-1 md:col-span-1 lg:col-span-1 justify-self-center" : ""
            }`} // Adjusting the 4th session to be centered
            onClick={() => {
              setSelectedSession(session);
              scrollToContent(); // Scroll to content when a session is clicked
            }}
          >
            <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
            <p className="text-gray-600 mt-2">For: {session.role}</p>
          </motion.div>
        ))}
      </div>

      {selectedSession && (
        <motion.div
          ref={contentRef} // Assign the reference to the content section
          className="mt-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800">{selectedSession.title}</h3>
          <p className="text-gray-700 mt-4">{selectedSession.description}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => setSelectedSession(null)}
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TrainingTab;

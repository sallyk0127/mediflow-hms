import React, { useState } from "react";
import { motion } from "framer-motion";

const sessions = [
  {
    role: "Nurses",
    title: "Autism Awareness",
    description: `
      Autism Awareness Training for Nurses

      Introduction  
      Autism Spectrum Disorder (ASD) affects many individuals and their families. As nurses, it's essential to understand how to interact with and support autistic patients effectively. This report outlines key areas of focus for autism awareness training.

      Understanding Autism  
      Autism is a developmental disorder characterized by challenges in communication, social interaction, and behavioral patterns. Recognizing the early signs, such as delayed speech or difficulties in social situations, is crucial for timely intervention.

      Sensory Sensitivities  
      Many autistic individuals experience sensory sensitivities. This can include heightened responses to sounds, lights, or textures. Nurses should be aware of these sensitivities to create a comfortable healthcare environment. For example, dimming lights or reducing noise during examinations can help ease anxiety for the patient.

      Supporting Families  
      Families of autistic children often feel anxious and protective. It's vital for nurses to approach these families with empathy and understanding. Open communication is key; reassure them that their concerns are valid and that support is available. Providing resources and connecting them with support groups can also be beneficial.

      Effective Communication Strategies  
      When interacting with autistic patients, use clear and simple language. Avoid jargon and be patient, allowing extra time for responses. Non-verbal communication, like using visual aids, can also enhance understanding. Always listen actively and validate the patient's feelings.

      Creating an Inclusive Healthcare Environment  
      Nurses play a significant role in fostering inclusivity. This includes being mindful of sensory triggers and creating a calming atmosphere. Training sessions should focus on practical strategies to improve patient interactions and create a welcoming environment for all.

      Continuous Education  
      To better understand autism spectrum disorders, nurses should engage in ongoing education. Workshops, seminars, and online courses can provide valuable insights into best practices for patient care.

      Conclusion  
      By focusing on these key areas, nurses can enhance their understanding of autism and improve their interactions with autistic patients and their families. This training will not only benefit the patients but also create a more supportive healthcare environment.
    `,
  },
  {
    role: "Nurses, Doctors, and Staff",
    title: "Mental Health Support",
    description: `
      Mental Health Support Training

      1. Recognizing Signs of Stress  
      Be aware of the signs of stress in yourself and your colleagues. This could include changes in mood, irritability, fatigue, or withdrawal from social interactions. Recognizing these signs early can help address issues before they escalate.

      2. Self-Care Strategies  
      Make sure to take care of yourself. This could mean taking short breaks during your shift, staying hydrated, and eating well. Find activities outside of work that help you relax, like exercising, reading, or spending time with friends and family.

      3. Seeking Help  
      Don’t hesitate to seek help if you’re feeling overwhelmed. Our hospital offers employees assistance programs (EAPs) that provide confidential counseling services. It’s important to talk to someone about what you’re going through.

      4. Peer Support  
      Connect with your colleagues. Sometimes just talking to someone who understands what you’re experiencing can be really helpful. Consider forming a support group with your fellow nurses or staff to share experiences and coping strategies.

      5. Mindfulness and Stress Management  
      Techniques like mindfulness, meditation, or yoga can really help manage stress. Even taking a few minutes to breathe deeply or practice mindfulness during a break can make a difference.

      By implementing these strategies, you can better support your own mental health and that of your colleagues. Remember, taking care of yourself is essential to providing the best care for your patients.
    `,
  },
  {
    role: "All Healthcare Professionals",
    title: "Proper Report Writing",
    description: `
      Proper Report Writing Training

      Here are some things to consider when writing professional reports:

      1. Clarity and Conciseness  
      Make sure your writing is clear and to the point. Avoid jargon or overly complex language. Use simple terms so that anyone reading the report can understand it easily.

      2. Structure  
      Organize your report logically. Start with an introduction, followed by the body where you detail the observations, assessments, and interventions, and then conclude with any recommendations or follow-up actions.

      3. Accuracy  
      Ensure all information is accurate and factual. Double-check any statistics or data you include. If you’re referencing patient information, make sure it’s correct and up to date.

      4. Objective Tone  
      Use an objective and professional tone throughout your report. Avoid personal opinions or emotional language. Stick to the facts and observations.

      5. Use of Headings and Bullet Points  
      This can help break up the text and make it easier to read. Headings can guide the reader through different sections, and bullet points can highlight key information.

      By keeping these points in mind, you can write effective and professional reports that will be valuable for patient care and communication within the healthcare team.
    `,
  },
  {
    role: "All Healthcare Professionals",
    title: "AI in Healthcare",
    description: `
      AI in Healthcare Training

      1. AI helps with diagnostics by analyzing medical images and lab results, improving accuracy in detecting diseases.

      2. It enables personalized medicine, tailoring treatments to individual patients based on their unique data.

      3. AI automates administrative tasks, allowing healthcare professionals to focus more on patient care.

      These advancements can really enhance the quality of healthcare!
    `,
  },
  {
    role: "Doctors",
    title: "Doctor-Nurse Communication",
    description: `
      Effective Communication with Nursing Staff Training

      Introduction  
      Effective communication between doctors and nurses is essential for providing high-quality patient care. This training focuses on building strong communication and collaboration between doctors and nurses.

      Key Areas of Focus:  
      1. Clear Communication  
      Learn how to communicate clearly and concisely with nursing staff, ensuring that instructions and patient information are understood accurately.

      2. Team Collaboration  
      Understand the importance of teamwork in healthcare settings and how to foster a collaborative environment.

      3. Conflict Resolution  
      Develop strategies for resolving conflicts and misunderstandings that may arise between doctors and nurses.

      4. Supporting New Nurses  
      Learn how to guide and support new nurses, helping them integrate smoothly into the hospital’s workflow.

      5. Feedback and Improvement  
      Understand the importance of giving and receiving constructive feedback to improve team performance and patient outcomes.

      Conclusion  
      By focusing on these key areas, doctors can enhance their communication skills and build stronger relationships with nursing staff, leading to better patient care and a more positive working environment.
    `,
  },
];

const Training = () => {
  const [selectedSession, setSelectedSession] = useState<{
    role: string;
    title: string;
    description: string;
  } | null>(null);

  const handleScrollToContent = (index: number) => {
    const content = document.getElementById(`session-content-${index}`);
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Removed the redundant "Training" heading here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                setSelectedSession(session);
                handleScrollToContent(index);
              }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">{session.title}</h3>
              <p className="text-gray-600">For: {session.role}</p>
            </motion.div>
          ))}
        </div>

        {selectedSession && (
          <motion.div
            id={`session-content-${sessions.indexOf(selectedSession)}`}
            className="mt-8 p-8 bg-white rounded-lg shadow-md border-l-4 border-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedSession.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{selectedSession.description}</p>
            <button
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setSelectedSession(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Training;
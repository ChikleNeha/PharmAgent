// UserFooter.jsx
export default function UserFooter() {
  return (
    <footer className="bg-[#d9f5e6] p-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="text-[#0f6f4a] font-semibold mb-3">Key Features</h4>
          <p className="text-[#065f46] text-sm mb-1">AI Description Analysis</p>
          <p className="text-[#065f46] text-sm mb-1">Drug Interaction & Allergy Checks</p>
          <p className="text-[#065f46] text-sm mb-1">Dosage Guidance & Reminders</p>
          <p className="text-[#065f46] text-sm mb-1">Symptoms-Based Assistance</p>
          <p className="text-[#065f46] text-sm">Safety Logic</p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-[#0f6f4a] font-semibold mb-3">Quick Links</h4>
          <p className="text-[#065f46] text-sm mb-1">Home</p>
          <p className="text-[#065f46] text-sm mb-1">How It Works</p>
          <p className="text-[#065f46] text-sm mb-1">Demo</p>
          <p className="text-[#065f46] text-sm mb-1">Features</p>
          <p className="text-[#065f46] text-sm mb-1">Tech Stack</p>
          <p className="text-[#065f46] text-sm mb-1">Team</p>
          <p className="text-[#065f46] text-sm">Contact</p>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-[#0f6f4a] font-semibold mb-3">Built With</h4>
          <p className="text-[#065f46] text-sm mb-1">Agentic AI Creation</p>
          <p className="text-[#065f46] text-sm mb-1">Large Language Models</p>
          <p className="text-[#065f46] text-sm mb-1">Secure Backend & Database</p>
          <p className="text-[#065f46] text-sm mb-1">Human-in-the-Loop</p>
          <p className="text-[#065f46] text-sm">Safety by Design</p>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-[#0f6f4a] font-semibold mb-3">Hackathon Info</h4>
          <p className="text-[#065f46] text-sm mb-1">Built for Hackathon</p>
          <p className="text-[#065f46] text-sm mb-1">Feature-3 Submission</p>
          <p className="text-[#065f46] text-sm mb-1">Problem Track: Healthcare</p>
          <p className="text-[#065f46] text-sm">AI for Social Good</p>
        </div>
      </div>

      <div className="text-center mt-10 text-[#064e3b] text-xs">
        PharmaAgent is a decision support system, not a replacement for licensed medical professionals.
        Always consult a qualified doctor or pharmacist before taking or changing any medication.
        <br />
        © 2026 PharmAgent. All rights reserved.
      </div>
    </footer>
  );
}
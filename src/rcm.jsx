import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const rcm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    experience: "",
    weight: "",
    height: "",
    gym: "",
  });
  const [loading, setLoading] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [proteinNeed, setProteinNeed] = useState(0);
  const [supplements, setSupplements] = useState([]);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const generateRecommendation = () => {
    const { age, gender, experience, weight, height, gym } = formData;

    if (!age || !gender || !experience || !weight || !height || !gym) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setResultVisible(false);

    setTimeout(() => {
      let calculatedProtein;
      let recs = [];

      if (age < 15) {
        setWarning(
          "⚠️ You are under 15. Focus on a balanced diet & consult a professional."
        );
        setProteinNeed(0);
        setSupplements([]);
        setResultVisible(true);
        setLoading(false);
        return;
      }

      if (gym === "yes") {
        calculatedProtein = weight < 50 ? weight * 2 : weight * 1.65;
      } else {
        calculatedProtein = weight * 1.5;
      }

      setProteinNeed(calculatedProtein.toFixed(0));

      recs.push({
        name: "💪 Whey Protein",
        description: "For muscle recovery & daily protein needs.",
        brand: "Optimum Nutrition Gold Standard",
        reason: "Essential for muscle building.",
      });

      if (experience === "beginner") {
        recs.push(
          {
            name: "🌿 Multivitamin",
            description: "Covers essential vitamins & minerals.",
            brand: "MuscleTech Platinum",
            reason: "Keeps you healthy overall.",
          },
          {
            name: "⚡ Creatine Monohydrate",
            description: "Boosts power during workouts.",
            brand: "MuscleBlaze Creatine",
            reason: "Perfect for beginners starting strength training.",
          }
        );
      } else if (experience === "intermediate") {
        recs.push(
          {
            name: "🔥 Creatine HCL",
            description: "Better absorption for enhanced performance.",
            brand: "MuscleTech Creatine",
            reason: "For more intense lifting sessions.",
          },
          {
            name: "🧬 BCAAs",
            description: "Amino acids to reduce fatigue & soreness.",
            brand: "Optimum Nutrition BCAA",
            reason: "Helps recovery after heavy training.",
          }
        );
      } else if (experience === "advanced") {
        recs.push(
          {
            name: "🚀 Pre-Workout Pro",
            description: "Energy boost for maximum focus.",
            brand: "MuscleTech Neurocore",
            reason: "To dominate tough sessions.",
          },
          {
            name: "🛡️ L-Glutamine",
            description: "Speeds up recovery & supports immunity.",
            brand: "Optimum Nutrition Glutamine",
            reason: "Great for intense training schedules.",
          }
        );
      }

      if (gender === "female") {
        recs.push({
          name: "❤️ Iron Supplement",
          description: "Important for women training hard.",
          brand: "Nature Made Iron",
          reason: "Helps prevent deficiency.",
        });
      }

      setSupplements(recs);
      setWarning("");
      setResultVisible(true);
      setLoading(false);
    }, 1000);
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className=" mt-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] p-6">
      <div className="backdrop-blur-lg mt-24  bg-black/30 border border-cyan-400/20 rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-cyan-300 drop-shadow-md">
            🏋️‍♂️ Supplement Advisor
          </h1>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="age"
            type="number"
            placeholder="Age (years)"
            value={formData.age}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner (0-6 months)</option>
            <option value="intermediate">Intermediate (6mo-2yrs)</option>
            <option value="advanced">Advanced (2+ yrs)</option>
          </select>
          <input
            id="weight"
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            id="height"
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <select
            id="gym"
            value={formData.gym}
            onChange={handleChange}
            className="p-3 rounded-lg bg-blue-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Gym Regularity</option>
            <option value="yes">Yes (3+ times/week)</option>
            <option value="no">No (less than 3)</option>
          </select>
        </div>

        <button
          onClick={generateRecommendation}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-black via-cyan-600 to-black hover:scale-105 transform transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Analyzing..." : "💥 Get Recommendations"}
        </button>

        {resultVisible && (
          <div className="mt-8 text-white">
            {warning && (
              <div className="p-4 bg-yellow-600/40 border-l-4 border-yellow-400 rounded mb-4">
                ⚠️ {warning}
              </div>
            )}
            {proteinNeed > 0 && (
              <div className="p-4 bg-green-600/40 border-l-4 border-green-400 rounded mb-4">
                🍗 Daily Protein Target: <b>{proteinNeed}g</b>
              </div>
            )}
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">📦 Your Supplements</h2>
            <div className="space-y-3">
              {supplements.map((supp, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-800/30 rounded-lg shadow hover:scale-105 transform transition duration-300"
                >
                  <h3 className="text-xl font-bold text-white">{supp.name}</h3>
                  <p className="text-gray-300">{supp.description}</p>
                  <p className="mt-1 text-cyan-300">
                    <b>Brand:</b> {supp.brand}
                  </p>
                  <p className="text-blue-200">
                    <b>Why:</b> {supp.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default rcm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MedicalTracking = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    hasDisease: '',
    takingMedications: '',
    hasAllergies: '',
    specifications: '',
    conditions: []
  });
  const navigate = useNavigate();

  const conditions = [
    'Allergies', 'Fever', 'Diabetes Mellitus', 'Hypertension', 'Chest Pain',
    'Heart Disease', 'Asthma', 'Respiratory Issues', 'Neurological', 'Hematological',
    'Skin Disorders', 'Eye Problems', 'Ear Problems', 'Nose Issues', 'Throat Issues',
    'Weight Gain', 'Weight Loss', 'Eating Disorders', 'Surgical History',
    'Kidney Disease', 'Liver Disease', 'Thyroid Disorder'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (condition) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Medical History:', formData);
    localStorage.setItem('medicalHistory', JSON.stringify(formData));
    navigate('/user');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black bg-linear-to-r from-emerald-600 via-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-6">
            Medical History
          </h1>
          <p className="text-xl text-emerald-800 font-semibold max-w-2xl mx-auto leading-relaxed">
            Complete your comprehensive medical profile for personalized healthcare tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information Section */}
          <section className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-emerald-100">
            <div className="border-b border-emerald-200 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2 flex items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-lg">1</div>
                Personal Information
              </h2>
              <p className="text-emerald-600 text-sm">Basic demographic details</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-emerald-800 mb-3">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 bg-emerald-50/50 transition-all duration-200 text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-800 mb-3">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 bg-emerald-50/50 transition-all duration-200 text-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-emerald-800 mb-3">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 bg-emerald-50/50 transition-all duration-200 text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-emerald-800 mb-3">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 bg-emerald-50/50 transition-all duration-200 text-lg"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Current Health Status Section */}
          <section className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-emerald-100">
            <div className="border-b border-emerald-200 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2 flex items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-lg">2</div>
                Current Health Status
              </h2>
              <p className="text-emerald-600 text-sm">Current medical conditions and medications</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-emerald-800 mb-3 text-lg">Currently having any disease?</label>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl">
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="hasDisease" value="Yes" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Yes</span>
                    </label>
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="hasDisease" value="No" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-emerald-800 mb-3 text-lg">Taking any medications?</label>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl">
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="takingMedications" value="Yes" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Yes</span>
                    </label>
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="takingMedications" value="No" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-emerald-800 mb-3 text-lg">Medication allergies?</label>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl">
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="hasAllergies" value="Yes" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Yes</span>
                    </label>
                    <label className="flex items-center p-3 bg-white rounded-xl border border-emerald-200 hover:shadow-md cursor-pointer transition-all">
                      <input type="radio" name="hasAllergies" value="No" onChange={handleInputChange} className="mr-3 w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Specifications Section */}
        {(formData.hasDisease === 'Yes' || formData.takingMedications === 'Yes' || formData.hasAllergies === 'Yes') && (
          <section className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-emerald-100 mt-8">
            <div className="border-b border-emerald-200 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2 flex items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-lg">3</div>
                Specifications
              </h2>
              <p className="text-emerald-600 text-sm">Provide detailed information</p>
            </div>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-6 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 bg-emerald-50/50 resize-vertical text-lg"
              placeholder="Please provide detailed information about your conditions, medications, or allergies..."
            />
          </section>
        )}

        {/* Conditions Section */}
        <section className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-emerald-100 mt-8">
          <div className="border-b border-emerald-200 pb-6 mb-8">
            <h2 className="text-2xl font-bold text-emerald-800 mb-2 flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 text-lg">4</div>
              Medical Conditions
            </h2>
            <p className="text-emerald-600 text-sm">Select all that apply (current or past)</p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {conditions.map((condition) => (
                <label key={condition} className="group flex items-center p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.conditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-400 mr-4 shrink-0"
                  />
                  <span className="text-emerald-800 font-medium group-hover:text-emerald-900">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Section */}
        <section className="text-center mt-12">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black py-6 px-12 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 text-2xl w-full max-w-md mx-auto border-4 border-emerald-200"
          >
            ✅ Submit Medical History
          </button>
          <p className="text-emerald-700 mt-4 text-lg font-semibold">
            Proceed to User Dashboard
          </p>
        </section>
      </div>
    </div>
  );
};

export default MedicalTracking;

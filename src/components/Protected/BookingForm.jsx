import React, { useState } from 'react';
import { Train, User, MapPin, Calendar, Clock, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

function BookingForm() {
  const [step, setStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [mainPassenger, setMainPassenger] = useState({
    name: '',
    age: '',
    isArmy: 'false',
    date: '',
    slot: 'MONDAY_EVENING',
    phone: '',
    email: ''
  });
  const [coPassengers, setCoPassengers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const handleMainPassengerChange = (field, value) => {
    setMainPassenger(prev => ({ ...prev, [field]: value }));
  };

  const handleCoPassengerChange = (index, field, value) => {
    const updated = [...coPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setCoPassengers(updated);
  };

  const addCoPassenger = () => {
    if (coPassengers.length < ticketCount - 1) {
      setCoPassengers([...coPassengers, { name: '', age: '', isArmy: 'false' }]);
    }
  };

  const removeCoPassenger = (index) => {
    setCoPassengers(coPassengers.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (step === 1 && mainPassenger.name && mainPassenger.age && mainPassenger.date && mainPassenger.phone && mainPassenger.email) {
      // Initialize co-passengers based on ticket count
      const initialCoPassengers = Array(ticketCount - 1).fill(null).map(() => ({
        name: '',
        age: '',
        isArmy: 'false'
      }));
      setCoPassengers(initialCoPassengers);
      setStep(2);
    }
  };

  const handleClickverificationforTIcketOrder = async () => {
    // Populate tickets array
    const ticketsArray = [];
    
    // Add primary passenger as first object
    ticketsArray.push({
      name: mainPassenger.name,
      age: mainPassenger.age,
      isArmy: mainPassenger.isArmy,
      date: mainPassenger.date,
      slot: mainPassenger.slot,
      phone: mainPassenger.phone,
      email: mainPassenger.email,
      passengerType: 'primary'
    });
    
    // Add co-passengers as subsequent objects
    coPassengers.forEach((coPassenger, index) => {
      ticketsArray.push({
        name: coPassenger.name,
        age: coPassenger.age,
        isArmy: coPassenger.isArmy,
        date: mainPassenger.date, // Same date as primary passenger
        slot: mainPassenger.slot, // Same slot as primary passenger
        phone: mainPassenger.phone, // Same phone as primary passenger
        email: mainPassenger.email, // Same email as primary passenger
        passengerType: 'co-passenger',
        passengerNumber: index + 2
      });
    });
    
    setTickets(ticketsArray);
    console.log('Tickets array populated:', ticketsArray); // For debugging


    
    // You can add your backend processing logic here
    // For example: sendTicketsToBackend(ticketsArray);
     
       
       
    const res = await axios.post(`http://localhost:8080/api/v1/payment/createorder`,{tickets:ticketsArray} , {withCredentials:true});
    
    console.log(res);


  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateTicketPrice = (age, isArmy = false) => {
    if (isArmy) return 100;
    
    const ageNum = parseInt(age);
    if (ageNum >= 60) return 100;
    if (ageNum >= 5 && ageNum <= 18) return 100;
    if (ageNum > 18) return 200;
    if(ageNum<5)return 0;
    return 100; // Default for ages < 5
  };

  const calculateTotalFare = () => {
    let totalBaseFare = 0;
    
    // Main passenger fare
    if (mainPassenger.age) {
      totalBaseFare += calculateTicketPrice(mainPassenger.age, mainPassenger.isArmy === 'true');
    }
    
    // Co-passengers fare
    coPassengers.forEach(passenger => {
      if (passenger.age) {
        totalBaseFare += calculateTicketPrice(passenger.age, passenger.isArmy === 'true');
      }
    });
    
    const total = totalBaseFare;
    
    return { total };
  };

  const isStep1Valid = mainPassenger.name && mainPassenger.age && mainPassenger.date && mainPassenger.phone && mainPassenger.email;
  const isStep2Valid = coPassengers.every(p => p.name && p.age);

  const fareDetails = calculateTotalFare();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Train className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Heritage walk Express</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              </div>
            </div>

            {/* Step 1: Main Passenger Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Primary Passenger Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={mainPassenger.name}
                      onChange={(e) => handleMainPassengerChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={mainPassenger.age}
                      onChange={(e) => handleMainPassengerChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Age"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Are you from Army?</label>
                  <select
                    value={mainPassenger.isArmy}
                    onChange={(e) => handleMainPassengerChange('isArmy', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={mainPassenger.date}
                    onChange={(e) => handleMainPassengerChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  <select
                    value={mainPassenger.slot}
                    onChange={(e) => handleMainPassengerChange('slot', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="MONDAY_EVENING">Monday Evening</option>
                    <option value="TUESDAY_EVENING">Tuesday Evening</option>
                    <option value="WEDNESDAY_EVENING">Wednesday Evening</option>
                    <option value="THURSDAY_EVENING">Thursday Evening</option>
                    <option value="FRIDAY_EVENING">Friday Evening</option>
                    <option value="SATURDAY_EVENING">Saturday Evening</option>
                    <option value="SUNDAY_EVENING">Sunday Evening</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={mainPassenger.phone}
                      onChange={(e) => handleMainPassengerChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={mainPassenger.email}
                      onChange={(e) => handleMainPassengerChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tickets</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold px-4">{ticketCount}</span>
                    <button
                      onClick={() => setTicketCount(Math.min(9, ticketCount + 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Maximum 6 tickets per booking</p>
                </div>
              </div>
            )}

            {/* Step 2: Co-passengers */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Co-Passenger Details</h2>
                </div>

                {ticketCount === 1 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">No co-passengers required for single ticket booking.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {coPassengers.map((passenger, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">Passenger {index + 2}</h3>
                          {coPassengers.length > 1 && (
                            <button
                              onClick={() => removeCoPassenger(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                              type="text"
                              value={passenger.name}
                              onChange={(e) => handleCoPassengerChange(index, 'name', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                            <input
                              type="number"
                              value={passenger.age}
                              onChange={(e) => handleCoPassengerChange(index, 'age', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Age"
                              min="1"
                              max="120"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Are you from Army?</label>
                          <select
                            value={passenger.isArmy}
                            onChange={(e) => handleCoPassengerChange(index, 'isArmy', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <ArrowRight className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Booking Confirmation</h2>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Train className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Booking Successful!</h3>
                      <p className="text-green-600">Your train tickets have been booked successfully.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>PNR Number:</strong> {Math.random().toString(36).substr(2, 10).toUpperCase()}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Total Passengers:</strong> {ticketCount}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Travel Date:</strong> {mainPassenger.date}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Time Slot:</strong> {mainPassenger.slot.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {/* Debug: Display tickets array */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Tickets Array (for backend):</h4>
                  <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto">
                    {JSON.stringify(tickets, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  step === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {step === 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    !isStep1Valid
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleClickverificationforTIcketOrder}
                  disabled={!isStep2Valid}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    !isStep2Valid
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Book Tickets
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Ticket Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Ticket Preview</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Train className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">MCMM</h3>
                    <p className="text-blue-200 text-sm">Train No: 482020</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">Date</p>
                  <p className="font-semibold">{mainPassenger.date || new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">JBP</span>
                  </div>
                  <p className="text-blue-200 text-sm">...</p>
                </div>
                <div className="flex-1 px-4">
                  <div className="border-t-2 border-dashed border-blue-200 relative">
                    <Clock className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600" />
                  </div>
                  <p className="text-center text-blue-200 text-sm mt-1">17h 30m</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">MCMM</span>
                  </div>
                  <p className="text-blue-200 text-sm">...</p>
                </div>
              </div>
            </div>

            {/* Passenger List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Passengers</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {ticketCount} Ticket{ticketCount > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {/* Main Passenger */}
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {mainPassenger.name || 'Primary Passenger'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {mainPassenger.age && `Age: ${mainPassenger.age}`}
                        {mainPassenger.isArmy === 'true' && ' • Army Personnel'}
                      </p>
                      {mainPassenger.age && (
                        <p className="text-xs text-blue-600 font-medium">
                          Fare: ₹{calculateTicketPrice(mainPassenger.age, mainPassenger.isArmy === 'true')}
                        </p>
                      )}
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      PRIMARY
                    </span>
                  </div>
                </div>

                {/* Co-passengers */}
                {coPassengers.map((passenger, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {passenger.name || `Passenger ${index + 2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {passenger.age && `Age: ${passenger.age}`}
                          {passenger.isArmy === 'true' && ' • Army Personnel'}
                        </p>
                        {passenger.age && (
                          <p className="text-xs text-blue-600 font-medium">
                            Fare: ₹{calculateTicketPrice(passenger.age, passenger.isArmy === 'true')}
                          </p>
                        )}
                      </div>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        CO-PASSENGER
                      </span>
                    </div>
                  </div>
                ))}

                {/* Placeholder for remaining tickets */}
                {Array(Math.max(0, ticketCount - 1 - coPassengers.length)).fill(null).map((_, index) => (
                  <div key={`placeholder-${index}`} className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Passenger {coPassengers.length + index + 2}</p>
                        <p className="text-sm text-gray-400">Details pending</p>
                      </div>
                      <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded text-xs">
                        PENDING
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fare Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare ({ticketCount} ticket{ticketCount > 1 ? 's' : ''})</span>
                </div>
              
               
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{fareDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Pricing Information */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Pricing Rules:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Army Personnel: ₹100</li>
                  <li>• Age 5-18: ₹100</li>
                  <li>• Age 60+: ₹100</li>
                  <li>• Age 19-59: ₹200</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
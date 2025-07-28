import React, { useState } from 'react';
import { Train, User, MapPin, Calendar, Clock, Plus, Minus, ArrowRight, ArrowLeft, Flag, ShipWheel } from 'lucide-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function BookingForm() {
  const [step, setStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [mainPassenger, setMainPassenger] = useState({
    name: '',
    age: '',
    isArmy: 'false',
    date: '',
    slot: 'TUESDAY_EVENING',
    phone: '',
    email: ''
  });
  const [coPassengers, setCoPassengers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [dateError, setDateError] = useState('');

  // Check if date is Tuesday (2), Thursday (4), or Sunday (0)
  const isValidDay = (dateString) => {
    if (!dateString) return true; // Allow empty date initially
    const selectedDate = new Date(dateString + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    return [0, 2, 4].includes(dayOfWeek); // Sunday=0, Tuesday=2, Thursday=4
  };

  const handleMainPassengerChange = (field, value) => {
    if (field === 'date') {
      if (value && !isValidDay(value)) {
        const selectedDate = new Date(value + 'T00:00:00');
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];
        setDateError(`Please select a Tuesday, Thursday, or Sunday only. You selected ${dayName}.`);
        return; // Don't update the date if it's invalid
      } else {
        setDateError('');
      }
    }
    setMainPassenger(prev => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const loadJsPDF = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const downloadTicket = async () => {
    try {
      const scriptLoaded = await loadJsPDF();

      if (!scriptLoaded) {
        alert('Failed to load PDF generator. Please try again.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // === HEADER ===
      doc.setFontSize(20);
      doc.setTextColor(37, 99, 235); // blue
      doc.text('Heritage Walk Express', 20, 20);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Train Booking Confirmation', 20, 28);

      // === BOOKING DETAILS ===
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 32, 190, 32);

      doc.setFontSize(14);
      doc.setTextColor(0, 128, 0);
      doc.text(' Booking Details:', 20, 40);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Email: ${mainPassenger.email}`, 20, 48);
      doc.text(`Phone: ${mainPassenger.phone}`, 20, 55);
      doc.text(`Date: ${mainPassenger.date}`, 20, 62);
      doc.text(`Slot: ${mainPassenger.slot.replace('_', ' ')}`, 20, 69);
      doc.text(`Total Tickets: ${tickets.length}`, 20, 76);

      // === PASSENGER TABLE HEADER ===
      let y = 90;
      doc.setFontSize(14);
      doc.setTextColor(0, 128, 0);
      doc.text('Passenger Details:', 20, y);

      y += 10;

      // Table Header
      doc.setFillColor(37, 99, 235); // blue
      doc.setTextColor(255, 255, 255); // white
      doc.rect(20, y, 170, 10, 'F');
      doc.text('S.No', 25, y + 7);
      doc.text('Name', 45, y + 7);
      doc.text('Age', 100, y + 7);
      doc.text('Is Army', 120, y + 7);
      doc.text('Ticket Fee', 160, y + 7);

      // === TABLE BODY ===
      let serial = 1;
      y += 13;

      const addRow = (person) => {
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(240, 240, 240);
        doc.rect(20, y - 5, 170, 10, 'F');

        doc.text(`${serial}`, 25, y + 2);
        doc.text(`${person.name}`, 45, y + 2);
        doc.text(`${person.age}`, 100, y + 2);
        doc.text(`${person.isArmy === 'true' ? 'Yes' : 'No'}`, 120, y + 2);
        doc.text(`${calculateTicketPrice(person.age, person.isArmy === 'true')}`, 160, y + 2);

        y += 12;
        serial++;
      };

      // Add main passenger
      addRow(mainPassenger);

      // Add co-passengers
      coPassengers.forEach(addRow);

      // === TOTAL AMOUNT ===
      y += 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, y, 190, y);
      y += 10;

      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.text(`Total Amount: ${fareDetails.total}`, 20, y);

      // === FOOTER ===
      y += 25;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for booking with Heritage Walk Express!', 20, y);
      doc.text('For support, contact: support@heritageexpress.com', 20, y + 8);
      y += 20;
      const circleX = 40;
      const circleY = y + 10;
      const radius = 12;

      // Draw green circle
      doc.setDrawColor(0, 128, 0);
      doc.setFillColor(0, 200, 0);
      doc.circle(circleX, circleY, radius, 'FD'); // 'FD' = fill and stroke

      // Add text inside the circle
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      doc.text('VERIFIED', circleX, circleY - 1.5, { align: 'center' });
      doc.text('BY MCME', circleX, circleY + 3.5, { align: 'center' });

      doc.save(`Heritage_Walk_Ticket_${mainPassenger.name.replace(/\s+/g, '_')}.pdf`);

    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF.');
    }
  };

  const handleClickverificationforTIcketOrder = async () => {
    try {
      // Populate tickets array
      const ticketsArray = [];
      
      // Add primary passenger as first object
      ticketsArray.push({
        name: mainPassenger.name,
        age: mainPassenger.age,
        army: mainPassenger.isArmy === 'true',
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
          army: coPassenger.isArmy === 'true',
          date: mainPassenger.date, // Same date as primary passenger
          slot: mainPassenger.slot, // Same slot as primary passenger
          phone: mainPassenger.phone, // Same phone as primary passenger
          email: mainPassenger.email, // Same email as primary passenger
          passengerType: 'co-passenger',
          passengerNumber: index + 2
        });
      });
      
      setTickets(ticketsArray);
      console.log('Tickets array populated:', ticketsArray);

      // Create order - Simulated API call (replace with your actual API endpoint)
      const res = await axios.post(`https://royanheritage.onrender.com/api/v1/payment/createorder`, {
        tickets: ticketsArray
      }, { withCredentials: true });
      
      // // For demo: simulate API response
      // const res = {
      //   data: {
      //     data: {
      //       orderId: 'demo_order_' + Date.now(),
      //       amount: fareDetails.total * 100, // Convert to paise
      //       currency: 'INR',
      //       key: 'demo_key'
      //     }
      //   }
      // };
      
      console.log('Order created:', res.data);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      // Initialize Razorpay payment
      const { orderId, amount, currency, key } = res.data.data;
      
      const options = {
        key: key, // Razorpay key from backend
        amount: amount, // Amount in paise
        currency: currency,
        name: 'Heritage Walk Express',
        description: `Train Booking - ${ticketsArray.length} Ticket${ticketsArray.length > 1 ? 's' : ''}`,
        order_id: orderId,
        handler: async function (response) {
          // Payment successful - this only runs when payment is completed
          console.log('✅ Payment successful, starting verification:', response);
          
          try {
            console.log('🔄 Sending verification request to backend...');
            
            // Verify payment on backend - Simulated API call
            const verifyRes = await axios.post(`https://royanheritage.onrender.com/api/v1/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, { withCredentials: true });
            
            // For demo: simulate verification response
            // const verifyRes = {
            //   data: {
            //     success: true,
            //     data: {
            //       paymentId: response.razorpay_payment_id,
            //       orderId: response.razorpay_order_id,
            //       status: 'completed'
            //     }
            //   },
            //   status: 200
            // };
            
            console.log('✅ Verification response:', verifyRes.data);
            
            if (verifyRes.data.success || verifyRes.status === 200) {
              // Store payment data for confirmation page
              setPaymentData(verifyRes.data.data || verifyRes.data);
              
              // Move to step 3 (confirmation page)
              setStep(3);
              alert('Payment successful! Your tickets have been booked.');
            } else {
              console.error('❌ Verification failed:', verifyRes.data);
              alert('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
            }
          } catch (error) {
            console.error('❌ Payment verification error:', error);
            console.error('Error details:', error.response?.data);
            alert('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: mainPassenger.name,
          email: mainPassenger.email,
          contact: mainPassenger.phone
        },
        notes: {
          slot: mainPassenger.slot,
          date: mainPassenger.date,
          passengers: ticketsArray.length
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            console.log('❌ Payment cancelled/dismissed by user');
            alert('Payment cancelled. You can try again anytime.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('❌ Payment failed:', response.error);
        console.error('Payment failure details:', response);
        alert(`Payment failed: ${response.error.description || 'Unknown error occurred'}`);
      });
      
      rzp.open();
      
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to create order. Please try again.');
    }
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
    if (ageNum < 5) return 0;
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

  const isStep1Valid = mainPassenger.name && mainPassenger.age && mainPassenger.date && mainPassenger.phone && mainPassenger.email && !dateError;
  const isStep2Valid = coPassengers.every(p => p.name && p.age);

  const fareDetails = calculateTotalFare();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShipWheel className="w-8 h-8 text-blue-600" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date <span className="text-blue-600">(Only Tuesday, Thursday, Sunday allowed)</span>
                  </label>
                  <input
                    type="date"
                    value={mainPassenger.date}
                    onChange={(e) => handleMainPassengerChange('date', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                      dateError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  )}
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Tuesday</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Thursday</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Sunday</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  <select
                    value={mainPassenger.slot}
                    onChange={(e) => handleMainPassengerChange('slot', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="TUESDAY_EVENING">Tuesday Evening</option>
                    <option value="THURSDAY_EVENING">Thursday Evening</option>
                    <option value="SUNDAY_MORNING">Sunday Morning</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={mainPassenger.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow digits and limit to 10 characters
                        if (/^\d*$/.test(value) && value.length <= 10) {
                          handleMainPassengerChange('phone', value);
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        mainPassenger.phone && mainPassenger.phone.length !== 10 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {mainPassenger.phone && mainPassenger.phone.length !== 10 && (
                      <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
                    )}
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required={true}
                      value={mainPassenger.email}
                      onChange={(e) => handleMainPassengerChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        mainPassenger.email && !isValidEmail(mainPassenger.email)
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="Enter email address"
                    />
                    {mainPassenger.email && !isValidEmail(mainPassenger.email) && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                    )}
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
                  <p className="text-sm text-gray-500 mt-2">Maximum 9 tickets per booking</p>
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
                      <Flag className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Booking Successful!</h3>
                      <p className="text-green-600">Your tickets have been booked successfully.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                     <p className="text-sm text-green-700">
    <strong>Primary Person:</strong> {mainPassenger.name ? mainPassenger.name : 'Not Available'}
  </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Total Visitors:</strong> {ticketCount}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Travel Date:</strong> {mainPassenger.date}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Time Slot:</strong> {mainPassenger.slot.replace('_', ' ')}
                    </p>
                  </div>
                  
                  {/* Download Ticket Button */}
                  <div className="mt-4">
                    <button
                      onClick={downloadTicket}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Download Ticket PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons - UPDATED with centering approach */}
            <div className={`flex mt-8 ${step === 3 ? 'justify-center' : 'justify-between'}`}>
              {/* Only show Previous button if not on step 3 */}
              {step !== 3 && (
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
              )}

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
              ) : step === 2 ? (
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
              ) : null}
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
                  <Flag className="w-8 h-8" />
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
                <h3 className="text-lg font-semibold text-gray-800">Total Occupancy</h3>
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
                  <li>• Age under 5: Free</li>
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

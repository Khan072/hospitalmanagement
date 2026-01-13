import { useState } from 'react'
import './App.css'

// Country codes for mobile number
const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
]

// Dummy data for problems
const PROBLEMS = [
  { id: 1, name: 'General Consultation', icon: '🏥' },
  { id: 2, name: 'Cardiology', icon: '❤️' },
  { id: 3, name: 'Dermatology', icon: '🧴' },
  { id: 4, name: 'Orthopedics', icon: '🦴' },
  { id: 5, name: 'Neurology', icon: '🧠' },
  { id: 6, name: 'Pediatrics', icon: '👶' },
  { id: 7, name: 'Gynecology', icon: '👩' },
  { id: 8, name: 'ENT', icon: '👂' },
]

// Dummy data for doctors (mapped to problems)
// Using valid MongoDB ObjectId format strings (24 hex characters)
const DOCTORS = {
  1: [ // General Consultation
    { id: '507f1f77bcf86cd799439011', name: 'Dr. John Smith', specialization: 'General Medicine', experience: '15 years', hospital: 'City Hospital' },
    { id: '507f1f77bcf86cd799439012', name: 'Dr. Sarah Johnson', specialization: 'Family Medicine', experience: '10 years', hospital: 'Health Care Center' },
    { id: '507f1f77bcf86cd799439013', name: 'Dr. Michael Brown', specialization: 'Internal Medicine', experience: '12 years', hospital: 'Medicare Clinic' },
  ],
  2: [ // Cardiology
    { id: '507f1f77bcf86cd799439014', name: 'Dr. Robert Wilson', specialization: 'Cardiologist', experience: '20 years', hospital: 'Heart Care Center' },
    { id: '507f1f77bcf86cd799439015', name: 'Dr. Emily Davis', specialization: 'Cardiac Surgeon', experience: '18 years', hospital: 'Cardiac Institute' },
  ],
  3: [ // Dermatology
    { id: '507f1f77bcf86cd799439016', name: 'Dr. Lisa Anderson', specialization: 'Dermatologist', experience: '14 years', hospital: 'Skin Care Clinic' },
    { id: '507f1f77bcf86cd799439017', name: 'Dr. James Taylor', specialization: 'Cosmetic Dermatology', experience: '11 years', hospital: 'Beauty Clinic' },
  ],
  4: [ // Orthopedics
    { id: '507f1f77bcf86cd799439018', name: 'Dr. David Martinez', specialization: 'Orthopedic Surgeon', experience: '16 years', hospital: 'Bone & Joint Center' },
    { id: '507f1f77bcf86cd799439019', name: 'Dr. Jennifer White', specialization: 'Sports Medicine', experience: '13 years', hospital: 'Sports Clinic' },
  ],
  5: [ // Neurology
    { id: '507f1f77bcf86cd799439020', name: 'Dr. Christopher Lee', specialization: 'Neurologist', experience: '19 years', hospital: 'Neuro Care Center' },
  ],
  6: [ // Pediatrics
    { id: '507f1f77bcf86cd799439021', name: 'Dr. Amanda Garcia', specialization: 'Pediatrician', experience: '12 years', hospital: 'Children Hospital' },
    { id: '507f1f77bcf86cd799439022', name: 'Dr. Matthew Harris', specialization: 'Child Specialist', experience: '15 years', hospital: 'Kids Care' },
  ],
  7: [ // Gynecology
    { id: '507f1f77bcf86cd799439023', name: 'Dr. Patricia Clark', specialization: 'Gynecologist', experience: '17 years', hospital: 'Women Health Center' },
  ],
  8: [ // ENT
    { id: '507f1f77bcf86cd799439024', name: 'Dr. Richard Lewis', specialization: 'ENT Specialist', experience: '14 years', hospital: 'Ear Nose Throat Clinic' },
  ],
}

// Dummy shifts for doctors (keys must match doctor ObjectIds)
// available: false means the slot is booked/unavailable
const SHIFTS = {
  '507f1f77bcf86cd799439011': [ // Dr. John Smith
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439012': [ // Dr. Sarah Johnson
    { time: '08:00 AM', available: true },
    { time: '09:00 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: false },
    { time: '02:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439013': [ // Dr. Michael Brown
    { time: '09:30 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439014': [ // Dr. Robert Wilson
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439015': [ // Dr. Emily Davis
    { time: '08:00 AM', available: true },
    { time: '09:00 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439016': [ // Dr. Lisa Anderson
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439017': [ // Dr. James Taylor
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439018': [ // Dr. David Martinez
    { time: '08:00 AM', available: false },
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '03:00 PM', available: false },
    { time: '04:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439019': [ // Dr. Jennifer White
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439020': [ // Dr. Christopher Lee
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439021': [ // Dr. Amanda Garcia
    { time: '09:00 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
  ],
  '507f1f77bcf86cd799439022': [ // Dr. Matthew Harris
    { time: '08:00 AM', available: true },
    { time: '09:00 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439023': [ // Dr. Patricia Clark
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
  ],
  '507f1f77bcf86cd799439024': [ // Dr. Richard Lewis
    { time: '09:00 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
  ],
}

function App() {
  const [viewMode, setViewMode] = useState('book') // 'book' or 'check'
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [patientName, setPatientName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91')
  const [bookingStatus, setBookingStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // For checking appointments
  const [checkName, setCheckName] = useState('')
  const [checkPhone, setCheckPhone] = useState('')
  const [checkCountryCode, setCheckCountryCode] = useState('+91')
  const [myAppointments, setMyAppointments] = useState([])
  const [checkingAppointments, setCheckingAppointments] = useState(false)
  const [appointmentsError, setAppointmentsError] = useState(null)

  // Get available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem)
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
    setBookingStatus(null)
  }

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
    setSelectedDate('')
    setSelectedTime('')
    setBookingStatus(null)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
    setBookingStatus(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setBookingStatus(null)
  }

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    
    if (!patientName || !phoneNumber || !selectedDate || !selectedTime || !selectedDoctor) {
      setBookingStatus({ type: 'error', message: 'Please fill all fields' })
      return
    }

    setLoading(true)
    setBookingStatus(null)

    try {
      // Combine country code with phone number
      const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`
      const doctorid = selectedDoctor.id
      
      const response = await fetch('https://hospitalmanagement-1pi6.onrender.com/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patiantname: patientName,
          phoneNo: fullPhoneNumber,
          doctorid: doctorid,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setBookingStatus({ type: 'success', message: data.message || 'Appointment booked successfully!' })
        // Reset form
        setPatientName('')
        setPhoneNumber('')
        setSelectedDate('')
        setSelectedTime('')
      } else {
        setBookingStatus({ type: 'error', message: data.message || 'Failed to book appointment' })
      }
    } catch (error) {
      setBookingStatus({ type: 'error', message: 'Error booking appointment. Please try again.' })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToProblems = () => {
    setSelectedProblem(null)
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
    setBookingStatus(null)
  }

  const handleBackToDoctors = () => {
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
    setBookingStatus(null)
  }

  const handleCheckAppointments = async (e) => {
    e.preventDefault()
    
    if (!checkName || !checkPhone) {
      setAppointmentsError('Please enter both name and phone number')
      return
    }

    setCheckingAppointments(true)
    setAppointmentsError(null)
    setMyAppointments([])

    try {
      // Use the exact format that was used when booking (with country code)
      const fullPhoneNumber = `${checkCountryCode}${checkPhone}`
      const url = `https://hospitalmanagement-1pi6.onrender.com/api/appointments/search?patiantname=${encodeURIComponent(checkName.trim())}&phoneNo=${encodeURIComponent(fullPhoneNumber)}`
      
      console.log('Fetching appointments from:', url)
      console.log('Search params:', { name: checkName.trim(), phone: fullPhoneNumber })
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error or server not responding' }))
        console.error('Search error:', errorData)
        setAppointmentsError(errorData.message || `Server error: ${response.status}`)
        return
      }

      const data = await response.json()
      console.log('Received appointments:', data)

      setMyAppointments(data)
      if (data.length === 0) {
        setAppointmentsError('No appointments found. Please verify:\n1. The name matches exactly (case-insensitive)\n2. The phone number includes the correct country code\n3. You have booked at least one appointment')
      } else {
        setAppointmentsError(null)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setAppointmentsError(`Error: ${error.message || 'Unable to connect to server. Please make sure the backend server is running on port 5000.'}`)
    } finally {
      setCheckingAppointments(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString // Return as is if invalid date
      }
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return dateString
    }
  }

  const getDoctorNameFromId = (doctorId) => {
    if (!doctorId) return 'Unknown Doctor'
    
    // Handle both string ID and object with _id
    let idToCheck = doctorId
    if (typeof doctorId === 'object') {
      idToCheck = doctorId._id || doctorId.id || doctorId
    }
    
    // Convert to string for comparison
    const idString = String(idToCheck)
    
    // Search through all doctors to find matching ID
    for (const problemId in DOCTORS) {
      const doctors = DOCTORS[problemId]
      const doctor = doctors.find(doc => String(doc.id) === idString)
      if (doctor) return doctor.name
    }
    return 'Unknown Doctor'
  }

  const availableDates = getAvailableDates()
  const doctors = selectedProblem ? DOCTORS[selectedProblem.id] || [] : []
  const shifts = selectedDoctor ? SHIFTS[selectedDoctor.id] || [] : []

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🏥 Hospital Management System</h1>
        <div className="view-mode-toggle">
          <button
            className={`toggle-btn ${viewMode === 'book' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('book')
              setSelectedProblem(null)
              setMyAppointments([])
              setAppointmentsError(null)
            }}
          >
            Book Appointment
          </button>
          <button
            className={`toggle-btn ${viewMode === 'check' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('check')
              setSelectedProblem(null)
              setSelectedDoctor(null)
              setBookingStatus(null)
            }}
          >
            Check My Appointments
          </button>
        </div>
      </header>

      <main className="main-content">
        {viewMode === 'check' ? (
          <div className="check-appointments-section">
            <h2>Check Your Appointments</h2>
            <form onSubmit={handleCheckAppointments} className="check-appointments-form">
              <div className="form-group">
                <label htmlFor="checkName">Patient Name</label>
                <input
                  type="text"
                  id="checkName"
                  value={checkName}
                  onChange={(e) => setCheckName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkPhone">Mobile Number</label>
                <div className="phone-input-container">
                  <select
                    className="country-code-select"
                    value={checkCountryCode}
                    onChange={(e) => setCheckCountryCode(e.target.value)}
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="checkPhone"
                    className="phone-number-input"
                    value={checkPhone}
                    onChange={(e) => setCheckPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>

              {appointmentsError && (
                <div className={`status-message ${myAppointments.length === 0 && appointmentsError.includes('No appointments') ? 'info' : 'error'}`}>
                  {appointmentsError}
                </div>
              )}

              <button
                type="submit"
                className="check-button"
                disabled={checkingAppointments}
              >
                {checkingAppointments ? 'Checking...' : 'Check Appointments'}
              </button>
            </form>

            {myAppointments.length > 0 && (
              <div className="appointments-list">
                <h3>Your Appointments ({myAppointments.length})</h3>
                <div className="appointments-grid">
                  {myAppointments.map((appointment) => (
                    <div key={appointment._id} className="appointment-card">
                      <div className="appointment-header">
                        <h4>{getDoctorNameFromId(appointment.doctorid)}</h4>
                        <span className={`status-badge ${appointment.status?.toLowerCase()}`}>
                          {appointment.status || 'Confirmed'}
                        </span>
                      </div>
                      <div className="appointment-details">
                        <div className="detail-item">
                          <span className="detail-label">📅 Date:</span>
                          <span className="detail-value">{formatDate(appointment.date)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🕐 Time:</span>
                          <span className="detail-value">{appointment.time}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">👤 Patient:</span>
                          <span className="detail-value">{appointment.patiantname}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">📞 Phone:</span>
                          <span className="detail-value">{appointment.phoneNo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !selectedProblem && (
          <div className="problems-section">
            <h2>Select a Medical Problem</h2>
            <div className="problems-grid">
              {PROBLEMS.map((problem) => (
                <div
                  key={problem.id}
                  className="problem-card"
                  onClick={() => handleProblemSelect(problem)}
                >
                  <div className="problem-icon">{problem.icon}</div>
                  <div className="problem-name">{problem.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProblem && !selectedDoctor && (
          <div className="doctors-section">
            <button className="back-button" onClick={handleBackToProblems}>
              ← Back to Problems
            </button>
            <h2>Select a Doctor for {selectedProblem.name}</h2>
            <div className="doctors-list">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="doctor-card"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialization">{doctor.specialization}</p>
                    <p className="experience">{doctor.experience}</p>
                    <p className="hospital">{doctor.hospital}</p>
                  </div>
                  <div className="select-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div className="booking-section">
            <button className="back-button" onClick={handleBackToDoctors}>
              ← Back to Doctors
            </button>
            <h2>Book Appointment with {selectedDoctor.name}</h2>
            
            <div className="doctor-details-card">
              <h3>{selectedDoctor.name}</h3>
              <p>{selectedDoctor.specialization} • {selectedDoctor.experience}</p>
              <p>{selectedDoctor.hospital}</p>
            </div>

            <form onSubmit={handleBookAppointment} className="booking-form">
              <div className="form-group">
                <label htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Mobile Number</label>
                <div className="phone-input-container">
                  <select
                    className="country-code-select"
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="phone-number-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Select Date</label>
                <div className="dates-grid">
                  {availableDates.map((date, index) => {
                    const dateStr = date.toISOString().split('T')[0]
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                    const dayNum = date.getDate()
                    const month = date.toLocaleDateString('en-US', { month: 'short' })
                    
                    return (
                      <div
                        key={index}
                        className={`date-card ${selectedDate === dateStr ? 'selected' : ''}`}
                        onClick={() => handleDateSelect(dateStr)}
                      >
                        <div className="day-name">{dayName}</div>
                        <div className="day-number">{dayNum}</div>
                        <div className="month">{month}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="form-group">
                  <label>Select Time</label>
                  <div className="times-grid">
                    {shifts.map((shift, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`time-slot ${selectedTime === shift.time ? 'selected' : ''} ${!shift.available ? 'unavailable' : ''}`}
                        onClick={() => shift.available && handleTimeSelect(shift.time)}
                        disabled={!shift.available}
                      >
                        {shift.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStatus && (
                <div className={`status-message ${bookingStatus.type}`}>
                  {bookingStatus.message}
                </div>
              )}

              <button
                type="submit"
                className="book-button"
                disabled={loading || !selectedDate || !selectedTime}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

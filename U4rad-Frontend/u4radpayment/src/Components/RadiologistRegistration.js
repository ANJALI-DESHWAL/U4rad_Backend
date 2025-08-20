import { useState } from 'react';

const RadiologistRegistration = () => {
  const [step, setStep] = useState(1);

  // Main form state
  const [form, setForm] = useState({
    // PAGE 1 - Personal Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    contact: '',
    resume: null,
    photo: null,
    experienceYears: '',

    // PAGE 2 - Educational Info
    class10School: '',
    class10Passing: '',
    class10Cert: null,
    class12School: '',
    class12Passing: '',
    class12Cert: null,
    mbbsInst: '',
    mbbsPassing: '',
    mbbsMarksheets: null,
    mbbsCert: null,
    mdInst: '',
    mdPassing: '',
    mdMarksheets: null,
    mdCert: null,
    regNumber: '',
    regCert: null,
    aboutYou: '',

    // PAGE 3 - Work Exp
    currentInstitution: '',
    currentStart: '',
    currentEnd: '',
    prevExp: [
      { institution: '', start: '', end: '' }
    ],

    // PAGE 4 - Achievements
    awards: [
      { name: '', date: '' }
    ],
    paperLink: '',

    // PAGE 5 - Bank
    accHolderName: '',
    bankName: '',
    branchName: '',
    accNumber: '',
    ifsc: '',
    panNumber: '',
    aadharNumber: '',
    panCardFile: null,
    aadharCardFile: null,
    chequeFile: null,

    // PAGE 6 - Reporting Area
    mriAreas: [],
    mriOther: '',
    ctAreas: [],
    ctOther: '',
    xray: false,
    otherArea: false,

    // PAGE 7 - Time Availability
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    },
    timeSlots: [
      { from: '', to: '' }
    ]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Change handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(form);

    if (step === 7 && name.startsWith('day-')) {
      const day = name.split('-')[1];
      setForm({
        ...form,
        days: { ...form.days, [day]: checked }
      });
      return;
    }

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMultiSelect = (e, field) => {
    const options = [...e.target.options]
      .filter(opt => opt.selected)
      .map(opt => opt.value);
    setForm({ ...form, [field]: options });
  };

  const addTimeSlot = () => {
    setForm({
      ...form,
      timeSlots: [...form.timeSlots, { from: '', to: '' }]
    });
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit?")) {
      console.log('Form Data:', form);
      alert('Submitted! (Check console)');
    }
  };

  // Page Components
  const Page1 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-6">Personal Information :</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input 
          name="firstName" 
          value={form.firstName} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input 
          name="lastName" 
          value={form.lastName} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email ID</label>
        <input 
          name="email" 
          type="email"
          placeholder="xyz@gmail.com"
          value={form.email} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Create Password</label>
        <div className="relative">
          <input 
            name="password" 
            type={showPassword ? "text" : "password"}
            value={form.password} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-blue-500 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <div className="relative">
          <input 
            name="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-blue-500 text-sm"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input 
          name="address" 
          value={form.address} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact No.</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-sm rounded-l">
            🇮🇳 +91
          </span>
          <input 
            name="contact" 
            placeholder="9876543210"
            value={form.contact} 
            onChange={handleChange} 
            className="flex-1 border border-gray-300 p-3 rounded-r focus:outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Resume</label>
        <input 
          type="file" 
          onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Passport Size Photo</label>
        <input 
          type="file" 
          onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Years of Experience</label>
        <select 
          name="experienceYears" 
          value={form.experienceYears} 
          onChange={handleChange} 
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      <div className="mt-6">
        <button 
          onClick={() => setStep(step + 1)} 
          className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-4">
        <button className="text-blue-600 underline">Sign In Instead, I Have A Account!</button>
      </div>
    </div>
  );

  const Page2 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-6">Educational Information :</h2>
      
      <div className="space-y-4">
        <h3 className="font-medium">Class 10th Details</h3>
        <div>
          <label className="block text-sm font-medium mb-1">School Name</label>
          <input name="class10School" value={form.class10School} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passing Year</label>
          <input name="class10Passing" value={form.class10Passing} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Marksheet / Certificate (Class 10)</label>
          <input type="file" onChange={(e) => setForm({...form, class10Cert: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Class 12th Details</h3>
        <div>
          <label className="block text-sm font-medium mb-1">School Name</label>
          <input name="class12School" value={form.class12School} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passing Year</label>
          <input name="class12Passing" value={form.class12Passing} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Marksheet / Certificate (Class 12)</label>
          <input type="file" onChange={(e) => setForm({...form, class12Cert: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">MBBS Details</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Institution Name</label>
          <input name="mbbsInst" value={form.mbbsInst} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passing Year</label>
          <input name="mbbsPassing" value={form.mbbsPassing} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Marksheets (All 4.5 years Including Final)</label>
          <input type="file" multiple onChange={(e) => setForm({...form, mbbsMarksheets: e.target.files})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Degree</label>
          <input type="file" onChange={(e) => setForm({...form, mbbsCert: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">MD/DNB Details</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Institution Name</label>
          <input name="mdInst" value={form.mdInst} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passing Year</label>
          <input name="mdPassing" value={form.mdPassing} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Marksheets (All 3 years Including Final)</label>
          <input type="file" multiple onChange={(e) => setForm({...form, mdMarksheets: e.target.files})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Degree</label>
          <input type="file" onChange={(e) => setForm({...form, mdCert: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">MCI/NMC Registration</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Registration Number</label>
          <input name="regNumber" value={form.regNumber} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Registration Certificate</label>
          <input type="file" onChange={(e) => setForm({...form, regCert: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ABOUT YOU</label>
        <textarea 
          name="aboutYou" 
          placeholder="Please describe about your strengths and competencies"
          value={form.aboutYou} 
          onChange={handleChange} 
          rows="4"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
        />
      </div>
    </div>
  );

  const Page3 = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-6">Work Experience :</h2>
      
      <div className="space-y-4">
        <h3 className="font-medium">Current Experience</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Name of the Institution</label>
          <input name="currentInstitution" value={form.currentInstitution} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Starting Date</label>
          <input name="currentStart" type="date" placeholder="dd-mm-yyyy" value={form.currentStart} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date (Leave the field if Currently working)</label>
          <input name="currentEnd" type="date" placeholder="dd-mm-yyyy" value={form.currentEnd} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      {form.prevExp.map((exp, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="font-medium">Previous Experience</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Name of the Institution</label>
            <input
              placeholder="Institution Name"
              value={exp.institution}
              onChange={(e) => {
                const list = [...form.prevExp];
                list[idx].institution = e.target.value;
                setForm({ ...form, prevExp: list });
              }}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Starting Date</label>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={exp.start}
              onChange={(e) => {
                const list = [...form.prevExp];
                list[idx].start = e.target.value;
                setForm({ ...form, prevExp: list });
              }}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date (Leave the field if Currently working)</label>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={exp.end}
              onChange={(e) => {
                const list = [...form.prevExp];
                list[idx].end = e.target.value;
                setForm({ ...form, prevExp: list });
              }}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      ))}

      <button 
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => setForm({ ...form, prevExp: [...form.prevExp, { institution:'', start:'', end:''}] })}
      >
        Add More Experience
      </button>
    </div>
  );

  const Page4 = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-6">Achievements :</h2>
      
      {form.awards.map((award, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="font-medium">Recognition / Awards ({idx + 1})</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Name of the Award</label>
            <input
              value={award.name}
              onChange={(e) => {
                const list = [...form.awards];
                list[idx].name = e.target.value;
                setForm({ ...form, awards: list });
              }}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Receiving the Award</label>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={award.date}
              onChange={(e) => {
                const list = [...form.awards];
                list[idx].date = e.target.value;
                setForm({ ...form, awards: list });
              }}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      ))}
      
      <button 
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => setForm({ ...form, awards: [...form.awards, { name:'', date:''}] })}
      >
        Add More Awards
      </button>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Paper Published (if any)</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Link of the Paper</label>
          <input
            name="paperLink"
            value={form.paperLink}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const Page5 = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-6">Banking Details :</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Account Holder's Name</label>
        <input name="accHolderName" value={form.accHolderName} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input name="bankName" value={form.bankName} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Branch Name</label>
        <input name="branchName" value={form.branchName} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <input name="accNumber" value={form.accNumber} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">IFSC Code</label>
        <input name="ifsc" value={form.ifsc} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">PAN Card Number</label>
        <input name="panNumber" value={form.panNumber} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">AADHAR Card Number</label>
        <input name="aadharNumber" value={form.aadharNumber} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload PAN Card</label>
        <input type="file" onChange={(e)=> setForm({...form, panCardFile: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload AADHAR Card</label>
        <input type="file" onChange={(e)=> setForm({...form, aadharCardFile: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Cancelled Cheque</label>
        <input type="file" onChange={(e)=> setForm({...form, chequeFile: e.target.files[0]})} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" />
      </div>
    </div>
  );

  const Page6 = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-6">Reporting Area :</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">MRI :</label>
        <p className="text-sm text-gray-600 mb-2">(hold ctrl to select more than one)</p>
        <select 
          multiple 
          value={form.mriAreas} 
          onChange={(e) => handleMultiSelect(e, 'mriAreas')} 
          className="w-full border border-gray-300 p-3 rounded h-32 focus:outline-none focus:border-blue-500"
        >
          <option value="Brain">Brain</option>
          <option value="Spine">Spine</option>
          <option value="MSK">MSK</option>
          <option value="Body">Body</option>
        </select>
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Other</label>
          <input 
            name="mriOther" 
            value={form.mriOther} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CT :</label>
        <p className="text-sm text-gray-600 mb-2">(hold ctrl to select more than one)</p>
        <select 
          multiple 
          value={form.ctAreas} 
          onChange={(e) => handleMultiSelect(e, 'ctAreas')} 
          className="w-full border border-gray-300 p-3 rounded h-32 focus:outline-none focus:border-blue-500"
        >
          <option value="Brain">Brain</option>
          <option value="Chest">Chest</option>
          <option value="Abdomen">Abdomen</option>
          <option value="Neck">Neck</option>
          <option value="Angio">Angio</option>
        </select>
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Other</label>
          <input 
            name="ctOther" 
            value={form.ctOther} 
            onChange={handleChange} 
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            name="xray" 
            checked={form.xray} 
            onChange={handleChange} 
            className="mr-2"
          /> 
          X-ray
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            name="otherArea" 
            checked={form.otherArea} 
            onChange={handleChange} 
            className="mr-2"
          /> 
          Other
        </label>
      </div>
    </div>
  );

  const Page7 = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-6">Time Availability :</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(form.days).map(day => (
          <label key={day} className="flex items-center">
            <input 
              type="checkbox" 
              name={`day-${day}`} 
              checked={form.days[day]} 
              onChange={handleChange}
              className="mr-2"
            /> 
            {day}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-4">Preferred Time Slots :</h3>
        {form.timeSlots.map((slot, idx) => (
          <div key={idx} className="mb-6 space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">From:</label>
              <input 
                type="time" 
                value={slot.from}
                onChange={(e) => {
                  const list = [...form.timeSlots];
                  list[idx].from = e.target.value;
                  setForm({ ...form, timeSlots: list });
                }}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To:</label>
              <input 
                type="time" 
                value={slot.to}
                onChange={(e) => {
                  const list = [...form.timeSlots];
                  list[idx].to = e.target.value;
                  setForm({ ...form, timeSlots: list });
                }}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>
          </div>
        ))}

        <button 
          onClick={addTimeSlot} 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add More Slots
        </button>
      </div>
    </div>
  );

  // Choose which page content
  const renderStep = () => {
    console.log('Current Step:', step);
    console.log('Form Data:', form);
    switch(step) {
      case 1: return <Page1 />;
      case 2: return <Page2 />;
      case 3: return <Page3 />;
      case 4: return <Page4 />;
      case 5: return <Page5 />;
      case 6: return <Page6 />;
      case 7: return <Page7 />;
      default: return <Page1 />;
    }
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="text-center py-6 border-b">
          <div className="text-2xl font-bold mb-2">
            <span className="text-black">IJ</span><span className="text-red-500">4</span><span className="text-black">RAD</span>
          </div>
          <h1 className="text-xl font-semibold">Radiologist's Signup Form</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center py-6 space-x-8">
          {[
            { label: 'Info.', num: 1 },
            { label: 'Qual.', num: 2 },
            { label: 'Exp.', num: 3 },
            { label: 'Achiev.', num: 4 },
            { label: 'Bank.', num: 5 },
            { label: 'Area.', num: 6 },
            { label: 'Time.', num: 7 }
          ].map((item) => (
            <div key={item.num} className="text-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mb-1 ${
                step === item.num 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : step > item.num 
                    ? 'border-blue-600 bg-blue-100 text-blue-600'
                    : 'border-gray-300 text-gray-500'
              }`}>
                {item.num}
              </div>
              <span className={`text-xs ${step === item.num ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Page Content */}
        <div className="px-8 pb-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)} 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Previous
              </button>
            )}
            {step < 7 ? (
              <button 
                onClick={() => setStep(step + 1)} 
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RadiologistRegistration;
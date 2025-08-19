import React, { useState } from 'react';

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

  // ---------------------------------
  // Change handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // for checkbox days
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

  // Select multiple (MRI & CT)
  const handleMultiSelect = (e, field) => {
    const options = [...e.target.options]
      .filter(opt => opt.selected)
      .map(opt => opt.value);
    setForm({ ...form, [field]: options });
  };

  // Add more time slot
  const addTimeSlot = () => {
    setForm({
      ...form,
      timeSlots: [...form.timeSlots, { from: '', to: '' }]
    });
  };

  // Submit
  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit?")) {
      console.log('Form Data:', form);
      alert('Submitted! (Check console)');
    }
  };

  //----------------------------------
  // Page Components (1 to 7)

  const Page1 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid gap-4">
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded" />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Create Password" value={form.password} onChange={handleChange} className="border p-2 rounded" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="border p-2 rounded" />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 rounded" />
        <input name="contact" placeholder="Contact No." value={form.contact} onChange={handleChange} className="border p-2 rounded" />
        <input type="file" onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}/>
        <input type="file" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}/>
        <input name="experienceYears" placeholder="Years of Experience" value={form.experienceYears} onChange={handleChange} className="border p-2 rounded" />
      </div>
    </>
  );

  const Page2 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Educational Information</h2>
      <input name="class10School" placeholder="Class 10 School Name" value={form.class10School} onChange={handleChange} className="border p-2 rounded" />
      <input name="class10Passing" placeholder="Class 10 Passing Year" value={form.class10Passing} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" onChange={(e) => setForm({...form, class10Cert: e.target.files[0]})}/>
      <input name="class12School" placeholder="Class 12 School Name" value={form.class12School} onChange={handleChange} className="border p-2 rounded" />
      <input name="class12Passing" placeholder="Class 12 Passing Year" value={form.class12Passing} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" onChange={(e) => setForm({...form, class12Cert: e.target.files[0]})}/>
      <input name="mbbsInst" placeholder="MBBS Institute" value={form.mbbsInst} onChange={handleChange} className="border p-2 rounded" />
      <input name="mbbsPassing" placeholder="MBBS Passing Year" value={form.mbbsPassing} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" multiple onChange={(e) => setForm({...form, mbbsMarksheets: e.target.files})}/>
      <input type="file" onChange={(e) => setForm({...form, mbbsCert: e.target.files[0]})}/>
      <input name="mdInst" placeholder="MD/DNB Institute" value={form.mdInst} onChange={handleChange} className="border p-2 rounded" />
      <input name="mdPassing" placeholder="MD/DNB Passing Year" value={form.mdPassing} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" multiple onChange={(e) => setForm({...form, mdMarksheets: e.target.files})}/>
      <input type="file" onChange={(e) => setForm({...form, mdCert: e.target.files[0]})}/>
      <input name="regNumber" placeholder="Registration Number" value={form.regNumber} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" onChange={(e) => setForm({...form, regCert: e.target.files[0]})}/>
      <textarea name="aboutYou" placeholder="About Yourself" value={form.aboutYou} onChange={handleChange} className="border p-2 rounded" />
    </>
  );

  const Page3 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      <input name="currentInstitution" placeholder="Current Institution" value={form.currentInstitution} onChange={handleChange} className="border p-2 rounded" />
      <input name="currentStart" placeholder="Starting Date" value={form.currentStart} onChange={handleChange} className="border p-2 rounded" />
      <input name="currentEnd" placeholder="End Date" value={form.currentEnd} onChange={handleChange} className="border p-2 rounded" />

      {form.prevExp.map((exp, idx) => (
        <div key={idx} className="mt-4">
          <h4>Previous Experience {idx+1}</h4>
          <input
            placeholder="Institution Name"
            value={exp.institution}
            onChange={(e) => {
              const list = [...form.prevExp];
              list[idx].institution = e.target.value;
              setForm({ ...form, prevExp: list });
            }}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Start Date"
            value={exp.start}
            onChange={(e) => {
              const list = [...form.prevExp];
              list[idx].start = e.target.value;
              setForm({ ...form, prevExp: list });
            }}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="End Date"
            value={exp.end}
            onChange={(e) => {
              const list = [...form.prevExp];
              list[idx].end = e.target.value;
              setForm({ ...form, prevExp: list });
            }}
            className="border p-2 rounded w-full" />
        </div>
      ))}

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setForm({ ...form, prevExp: [...form.prevExp, { institution:'', start:'', end:''}] })}>
        Add More Experience
      </button>
    </>
  );

  const Page4 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      {form.awards.map((award, idx) => (
        <div key={idx} className="mb-4">
          <input
            placeholder="Name of the Award"
            value={award.name}
            onChange={(e) => {
              const list = [...form.awards];
              list[idx].name = e.target.value;
              setForm({ ...form, awards: list });
            }}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Date of Receiving the Award"
            value={award.date}
            onChange={(e) => {
              const list = [...form.awards];
              list[idx].date = e.target.value;
              setForm({ ...form, awards: list });
            }}
            className="border p-2 rounded w-full mt-2"
          />
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setForm({ ...form, awards: [...form.awards, { name:'',date:''}] })}>
        Add More Awards
      </button>

      <input
        name="paperLink"
        placeholder="Link of Published Paper (if any)"
        value={form.paperLink}
        onChange={handleChange}
        className="border p-2 rounded w-full" />
    </>
  );

  // ----- PAGE 5 ----
  const Page5 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Banking Details</h2>
      <input name="accHolderName" placeholder="Account Holder's Name" value={form.accHolderName} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
      <input name="branchName" placeholder="Branch Name" value={form.branchName} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
      <input name="accNumber" placeholder="Account Number" value={form.accNumber} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
      <input name="ifsc" placeholder="IFSC Code" value={form.ifsc} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
      <input name="panNumber" placeholder="PAN Card Number" value={form.panNumber} onChange={handleChange} className="border p-2 rounded w-full mt-2" />
      <input name="aadharNumber" placeholder="AADHAR Card Number" value={form.aadharNumber} onChange={handleChange} className="border p-2 rounded w-full mt-2" />

      <label className="mt-3 block">Upload PAN Card</label>
      <input type="file" onChange={(e)=> setForm({...form, panCardFile: e.target.files[0]})} />

      <label className="mt-3 block">Upload AADHAR Card</label>
      <input type="file" onChange={(e)=> setForm({...form, aadharCardFile: e.target.files[0]})} />

      <label className="mt-3 block">Upload Cancelled Cheque</label>
      <input type="file" onChange={(e)=> setForm({...form, chequeFile: e.target.files[0]})} />
    </>
  );

  // ----- PAGE 6 ----
  const Page6 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Reporting Areas</h2>
      <label>MRI Areas (hold Ctrl)</label>
      <select multiple value={form.mriAreas} onChange={(e) => handleMultiSelect(e, 'mriAreas')} className="border p-2 rounded w-full h-28">
        <option value="Brain">Brain</option>
        <option value="Spine">Spine</option>
        <option value="MSK">MSK</option>
        <option value="Body">Body</option>
      </select>
      <input name="mriOther" placeholder="Other (MRI)" value={form.mriOther} onChange={handleChange} className="border p-2 rounded w-full mt-2" />

      <label className="mt-4">CT Areas (hold Ctrl)</label>
      <select multiple value={form.ctAreas} onChange={(e) => handleMultiSelect(e, 'ctAreas')} className="border p-2 rounded w-full h-28">
        <option value="Brain">Brain</option>
        <option value="Chest">Chest</option>
        <option value="Abdomen">Abdomen</option>
        <option value="Neck">Neck</option>
        <option value="Angio">Angio</option>
      </select>
      <input name="ctOther" placeholder="Other (CT)" value={form.ctOther} onChange={handleChange} className="border p-2 rounded w-full mt-2" />

      <div className="mt-4 flex gap-4">
        <label><input type="checkbox" name="xray" checked={form.xray} onChange={handleChange} /> X-ray</label>
        <label><input type="checkbox" name="otherArea" checked={form.otherArea} onChange={handleChange} /> Other</label>
      </div>
    </>
  );

  // ----- PAGE 7 ----
  const Page7 = () => (
    <>
      <h2 className="text-xl font-semibold mb-4">Time Availability</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.keys(form.days).map(day => (
          <label key={day} className="mr-4">
            <input type="checkbox" name={`day-${day}`} checked={form.days[day]} onChange={handleChange} /> {day}
          </label>
        ))}
      </div>

      {form.timeSlots.map((slot, idx) => (
        <div key={idx} className="mb-6">
          <h4 className="font-semibold">Slot #{idx+1}</h4>
          <div className="flex gap-2">
            <div>
              <label>From:</label>
              <input type="time" value={slot.from}
                onChange={(e) => {
                  const list = [...form.timeSlots];
                  list[idx].from = e.target.value;
                  setForm({ ...form, timeSlots: list });
                }}
                className="border p-2 rounded" />
            </div>
            <div>
              <label>To:</label>
              <input type="time" value={slot.to}
                onChange={(e) => {
                  const list = [...form.timeSlots];
                  list[idx].to = e.target.value;
                  setForm({ ...form, timeSlots: list });
                }}
                className="border p-2 rounded" />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addTimeSlot} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add More Slots
      </button>
    </>
  );

  // choose which page content
  const renderStep = () => {
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

  // ---------- Main Render ----------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-10">
      <div className="bg-white p-8 rounded shadow w-full max-w-3xl">

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {['Info','Qual.','Exp.','Achiev.','Bank','Area','Time'].map((label, i) => (
            <div key={i} className="text-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${step===i+1 ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-500'}`}>
                {i+1}
              </div>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Page Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-500 text-white rounded">
              Previous
            </button>
          )}
          {step < 7 ? (
            <button onClick={() => setStep(step + 1)} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="ml-auto px-4 py-2 bg-green-600 text-white rounded">
              Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default RadiologistRegistration;

import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../Components/AnimatedBackground';

const QualityPage = () => {
    const navigate = useNavigate();

    return (
        <AnimatedBackground>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Quality Section */}
                        <div className="relative">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200">
                                {/* Red border accent */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-2xl"></div>
                                
                                {/* Header with icon */}
                                <div className="flex items-start mb-6">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-white font-bold text-xl">Q</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">QUALITY</h2>
                                </div>
                                
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    At U4RAD, we always strive for quality, best in the market. We ensure that all the 
                                    imaging protocols are being followed and reporting is done by the qualified 
                                    Radiologists. At U4RAD, we implement quality assurance programs to monitor 
                                    and improve the quality of reporting services. Quality reviewing of the cases is 
                                    followed including self-review, peer review, superior review, and review based on 
                                    feedback. Here at U4RAD, we always work to have reporting errors less than 
                                    what is acceptable by National Institute of Health (NIH) and American medical 
                                    association (AMA).
                                </p>
                            </div>
                        </div>

                        {/* Turnaround Time Section */}
                        <div className="relative">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200">
                                {/* Red border accent */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-2xl"></div>
                                
                                {/* Header with icon */}
                                <div className="flex items-start mb-6">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">TURNAROUND TIME</h2>
                                </div>
                                
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    We are available 24/7 for reporting of cases. Emergency cases are reported 
                                    within 30 min while regular cases of CT and MRI are reported in 3-4 hours. We 
                                    report X-ray and ECG within 1 hour which allows the consultant to make a timely 
                                    decision.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-8 mb-6">
                    </div>

                    {/* Next Button */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/sande')}
                            className="bg-transparent border-2 border-red-600 text-red-600 px-12 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 uppercase tracking-wider"
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    );
};

export default QualityPage;
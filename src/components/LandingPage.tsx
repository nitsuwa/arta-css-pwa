import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Shield, Lock, QrCode, CheckCircle, Menu, X, FileText, Smartphone, Award, TrendingUp, Clock, Scale, Search, AlertCircle, Calendar, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { SurveyResponse } from '../App';
import valenzuelaSeal from '../assets/valenzuela-seal.svg';

interface LandingPageProps {
  onTakeSurvey: () => void;
  onAdminLogin: () => void;
  responses: SurveyResponse[];
}

export function LandingPage({ onTakeSurvey, onAdminLogin, responses }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [refIdSearch, setRefIdSearch] = useState('');
  const [searchResult, setSearchResult] = useState<SurveyResponse | null | 'not-found'>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Handle feedback status check
  const handleCheckStatus = () => {
    if (!refIdSearch.trim()) {
      setSearchResult(null);
      return;
    }
    
    const found = responses.find(r => r.refId.toLowerCase() === refIdSearch.trim().toLowerCase());
    setSearchResult(found || 'not-found');
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'how-it-works', 'check-status'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hidden admin access via keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A (or Cmd+Shift+A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        onAdminLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAdminLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9FC] to-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 border-b border-[#e5e9f0] shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#e5e9f0] flex-shrink-0">
                <img 
                  src={valenzuelaSeal} 
                  alt="Valenzuela City Seal" 
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-[#0D3B66] text-sm md:text-base truncate !font-bold">City of Valenzuela</h3>
                <p className="text-xs text-[#0B172A]/60 hidden sm:block truncate">ARTA-Compliant CSS System</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`text-[#0B172A]/70 hover:text-[#0D3B66] transition-all relative group ${activeSection === 'home' ? 'text-[#0D3B66]' : ''}`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#3FA7D6] transform origin-left transition-transform ${activeSection === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className={`text-[#0B172A]/70 hover:text-[#0D3B66] transition-all relative group ${activeSection === 'about' ? 'text-[#0D3B66]' : ''}`}
              >
                About
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#3FA7D6] transform origin-left transition-transform ${activeSection === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className={`text-[#0B172A]/70 hover:text-[#0D3B66] transition-all relative group ${activeSection === 'how-it-works' ? 'text-[#0D3B66]' : ''}`}
              >
                How It Works
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#3FA7D6] transform origin-left transition-transform ${activeSection === 'how-it-works' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              <button 
                onClick={() => scrollToSection('check-status')} 
                className={`text-[#0B172A]/70 hover:text-[#0D3B66] transition-all relative group ${activeSection === 'check-status' ? 'text-[#0D3B66]' : ''}`}
              >
                Check Status
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#3FA7D6] transform origin-left transition-transform ${activeSection === 'check-status' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              <Button onClick={onTakeSurvey} className="bg-[#0D3B66] hover:bg-[#3FA7D6] hover:scale-105 text-white transition-all shadow-md hover:shadow-lg">
                Take the Survey
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#e5e9f0]">
              <nav className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('home')} className="text-left px-4 py-2 text-[#0B172A]/70 hover:bg-[#F5F9FC] rounded-lg transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left px-4 py-2 text-[#0B172A]/70 hover:bg-[#F5F9FC] rounded-lg transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-left px-4 py-2 text-[#0B172A]/70 hover:bg-[#F5F9FC] rounded-lg transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('check-status')} className="text-left px-4 py-2 text-[#0B172A]/70 hover:bg-[#F5F9FC] rounded-lg transition-colors">
                  Check Status
                </button>
                <Button onClick={onTakeSurvey} className="bg-[#0D3B66] hover:bg-[#3FA7D6] text-white w-full">
                  Take the Survey
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1742888827024-6d85caf1d09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzU5NjgyNzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        ></div>
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B66]/95 via-[#165a8e]/90 to-[#3FA7D6]/85"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <motion.div 
          className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-8">
            <motion.h1 
              className="text-white text-3xl md:text-5xl lg:text-6xl !font-bold !leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering Data-Driven Governance through Citizen Feedback
            </motion.h1>
            <motion.p 
              className="text-white/95 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Automating ARTA-Compliant Customer Satisfaction Surveys for Efficiency, Transparency, and Citizen Engagement.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                onClick={onTakeSurvey}
                size="lg"
                className="bg-white text-[#0D3B66] hover:bg-white/90 hover:scale-105 shadow-xl hover:shadow-2xl transition-all h-14 px-8"
              >
                <FileText className="w-5 h-5 mr-2" />
                Take the Survey
              </Button>
              <Button 
                onClick={() => setQrModalOpen(true)}
                size="lg"
                className="bg-white text-[#0D3B66] hover:bg-white/90 hover:scale-105 shadow-xl hover:shadow-2xl transition-all h-14 px-8"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section Separator */}
      <hr className="border-[#d1dae6]" />

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 md:py-28 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#0D3B66] mb-6 !text-4xl md:!text-5xl !font-bold">About the Platform</h2>
            <p className="text-[#0B172A]/70 max-w-4xl mx-auto leading-relaxed text-lg">
              The City Government of Valenzuela's Digital ARTA-CSS System allows citizens to share their experiences directly and securely. Your feedback helps improve public services, reduce processing time, and ensure transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-16">
            {[
              { icon: Smartphone, title: 'Accessible Anytime, Anywhere', desc: 'Complete the survey on your phone, tablet, or computer at your convenience.', delay: 0.1 },
              { icon: Lock, title: 'Data Privacy Protected', desc: 'Your information is secure and protected under the Data Privacy Act of 2012.', delay: 0.2 },
              { icon: Shield, title: 'ARTA-Compliant Process', desc: 'Follows official Anti-Red Tape Authority standards for government feedback.', delay: 0.3 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="border border-[#e5e9f0] hover:border-[#3FA7D6]/40 hover:shadow-lg transition-all bg-white group h-full">
                  <CardContent className="pt-12 pb-12 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#3FA7D6]/10 to-[#0D3B66]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-[#0D3B66]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#0D3B66] text-xl !font-bold">{item.title}</h3>
                    <p className="text-[#0B172A]/70 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section Separator */}
      <hr className="border-[#d1dae6]" />

      {/* How It Works Section */}
      <motion.section 
        id="how-it-works" 
        className="py-20 md:py-28 bg-gradient-to-b from-[#F5F9FC] to-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#0D3B66] mb-6 !text-4xl md:!text-5xl !font-bold">How It Works</h2>
            <p className="text-[#0B172A]/70 max-w-3xl mx-auto leading-relaxed text-lg">
              Four simple steps to help us improve our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: QrCode, title: 'Scan or Access the QR Code', description: 'Use your phone or device to open the survey link.', number: '1' },
              { icon: FileText, title: 'Answer the Questions', description: 'Complete the short ARTA-compliant feedback form.', number: '2' },
              { icon: CheckCircle, title: 'Submit Your Response', description: 'Your feedback is securely recorded and assigned a reference ID.', number: '3' },
              { icon: TrendingUp, title: 'Help Improve Services', description: 'Data is analyzed by the City Government to improve service quality.', number: '4' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="text-center h-full shadow-md hover:shadow-xl transition-all border border-[#e5e9f0] hover:border-[#3FA7D6]/40 bg-white group">
                  <CardContent className="pt-12 pb-10 space-y-6 px-6">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#3FA7D6]/10 to-[#0D3B66]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <step.icon className="w-10 h-10 text-[#0D3B66]" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#3FA7D6] text-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="!font-bold text-sm">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-[#0D3B66] text-lg px-2 !font-bold">{step.title}</h3>
                    <p className="text-[#0B172A]/70 leading-relaxed text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section Separator */}
      <hr className="border-[#d1dae6]" />

      {/* Check Feedback Status Section */}
      <motion.section 
        id="check-status" 
        className="py-20 md:py-28 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#0D3B66] mb-4 !text-4xl md:!text-5xl !font-bold">Check Feedback Status</h2>
            <p className="text-[#0B172A]/70 leading-relaxed text-lg">
              Enter your Reference ID below to verify that your feedback was received.
            </p>
          </div>

          <Card className="shadow-xl border-2 border-[#e5e9f0] hover:border-[#3FA7D6]/40 transition-all bg-white">
            <CardContent className="p-8 md:p-10 space-y-6">
              <div className="space-y-4">
                <label htmlFor="ref-id-input" className="block text-sm !font-bold text-[#0D3B66]">
                  Reference ID
                </label>
                <div className="relative">
                  <Input
                    id="ref-id-input"
                    type="text"
                    placeholder="Example: VZM-CSM-1759662846524-3555"
                    value={refIdSearch}
                    onChange={(e) => {
                      setRefIdSearch(e.target.value);
                      setSearchResult(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCheckStatus();
                      }
                    }}
                    className="h-14 pl-12 pr-4 text-base border-2 border-[#d1dae6] focus:border-[#3FA7D6] rounded-xl"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B172A]/40" />
                </div>
              </div>

              <Button 
                onClick={handleCheckStatus}
                className="w-full h-14 bg-[#0D3B66] hover:bg-[#3FA7D6] text-white transition-all shadow-md hover:shadow-lg"
                disabled={!refIdSearch.trim()}
              >
                <Search className="w-5 h-5 mr-2" />
                Check Status
              </Button>

              {/* Search Result */}
              {searchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {searchResult === 'not-found' ? (
                    <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="!font-bold text-red-900 mb-2">Feedback Not Found</h4>
                          <p className="text-sm text-red-800 leading-relaxed">
                            We couldn't find any feedback with this Reference ID. Please check your ID and try again, or contact our office for assistance.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="!font-bold text-green-900 mb-2">Feedback Found</h4>
                          <p className="text-sm text-green-800">
                            Your feedback has been successfully received and is currently <strong>Under Review</strong>.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-green-200">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-green-700">Submitted On</p>
                            <p className="text-sm !font-bold text-green-900">
                              {new Date(searchResult.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-green-700">Service</p>
                            <p className="text-sm !font-bold text-green-900">{searchResult.service}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-green-700">Client Type</p>
                            <p className="text-sm !font-bold text-green-900 capitalize">{searchResult.clientType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-green-700">Satisfaction Rating</p>
                            <p className="text-sm !font-bold text-green-900">{searchResult.sqdAvg.toFixed(2)} / 5.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="pt-4 border-t border-[#e5e9f0]">
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Important:</strong> Keep your Reference ID safe. It serves as your proof of submission for ARTA follow-ups.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Section Separator */}
      <hr className="border-[#d1dae6]" />

      {/* Why Your Feedback Matters Section */}
      <motion.section 
        className="py-20 md:py-28 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#0D3B66] mb-6 !text-4xl md:!text-5xl !font-bold">Why Your Feedback Matters</h2>
            <p className="text-[#0B172A]/70 max-w-3xl mx-auto leading-relaxed text-lg">
              Your voice drives meaningful change in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Transparency', desc: 'Ensures fair and accountable service delivery. Your feedback creates a culture of openness in government operations.', delay: 0.1 },
              { icon: Clock, title: 'Efficiency', desc: 'Helps reduce waiting times and streamline processes. Your input identifies bottlenecks and improves workflows.', delay: 0.2 },
              { icon: TrendingUp, title: 'Improvement', desc: 'Empowers the city to identify and resolve service issues quickly. Your feedback drives continuous enhancement.', delay: 0.3 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="border border-[#e5e9f0] hover:border-[#3FA7D6]/40 hover:shadow-lg transition-all bg-white group h-full">
                  <CardContent className="pt-12 pb-12 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#3FA7D6]/10 to-[#0D3B66]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-[#0D3B66]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#0D3B66] text-xl !font-bold">{item.title}</h3>
                    <p className="text-[#0B172A]/70 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section Separator */}
      <hr className="border-[#d1dae6]" />

      {/* Data Privacy & Compliance */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-b from-[#F5F9FC] to-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-[#e5e9f0] bg-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex gap-4 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3FA7D6]/10 to-[#0D3B66]/10 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-[#0D3B66]" strokeWidth={1.5} />
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3FA7D6]/10 to-[#0D3B66]/10 rounded-2xl flex items-center justify-center">
                    <Scale className="w-8 h-8 text-[#0D3B66]" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-[#0D3B66] !text-3xl md:!text-4xl !font-bold">Data Privacy & Compliance</h2>
                  <p className="text-[#0B172A]/70 leading-relaxed text-base md:text-lg">
                    All responses are securely processed and protected under the <strong>Data Privacy Act of 2012</strong> and <strong>ARTA guidelines</strong>. Your information is confidential and used solely for improving government services.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button variant="outline" size="sm" className="border-[#0D3B66] text-[#0D3B66] hover:bg-[#0D3B66] hover:text-white hover:scale-105 transition-all">
                      Privacy Policy
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#0D3B66] text-[#0D3B66] hover:bg-[#0D3B66] hover:text-white hover:scale-105 transition-all">
                      Terms of Use
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0D3B66] to-[#0a2c4d] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <img 
                    src={valenzuelaSeal} 
                    alt="Valenzuela City Seal" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white !font-bold text-lg">City of Valenzuela</h3>
                  <p className="text-white/70 text-sm">ARTA CSS System</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-md">
                Digitizing citizen feedback for better public services. Your voice helps us build a more efficient and transparent local government.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#3FA7D6]" />
                  <span className="text-white/70 text-sm">ARTA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#3FA7D6]" />
                  <span className="text-white/70 text-sm">DPA 2012</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-6 !font-bold text-lg">Quick Links</h4>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('home')} className="block text-white/70 hover:text-white hover:translate-x-1 transition-all text-sm">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-white/70 hover:text-white hover:translate-x-1 transition-all text-sm">
                  About the Platform
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-white/70 hover:text-white hover:translate-x-1 transition-all text-sm">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('check-status')} className="block text-white/70 hover:text-white hover:translate-x-1 transition-all text-sm">
                  Check Feedback Status
                </button>
                <button onClick={onTakeSurvey} className="block text-white/70 hover:text-white hover:translate-x-1 transition-all text-sm">
                  Take the Survey
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white mb-6 !font-bold text-lg">Get in Touch</h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>City Government of Valenzuela</p>
                <p>Information and Communications<br />Technology Office (ICTO)</p>
                <a href="mailto:icto@valenzuela.gov.ph" className="block text-[#3FA7D6] hover:text-white transition-colors pt-2">
                  icto@valenzuela.gov.ph
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-white/70 text-center md:text-left">
                © 2025 City Government of Valenzuela. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 text-white/70">
                <button className="hover:text-white transition-colors">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-white transition-colors">Terms of Use</button>
                <span>•</span>
                <button className="hover:text-white transition-colors">Accessibility</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#0D3B66]" />
              Scan QR Code to Access Survey
            </DialogTitle>
            <DialogDescription>
              Use your mobile device to scan this QR code and access the survey form instantly.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div className="bg-[#F5F9FC] rounded-xl p-8 flex items-center justify-center border-2 border-dashed border-[#3FA7D6]">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <QrCode className="w-40 h-40 text-[#0D3B66]" strokeWidth={1} />
              </div>
            </div>
            <p className="text-sm text-[#0B172A]/60 text-center mt-6">
              QR Code links directly to the online survey form
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

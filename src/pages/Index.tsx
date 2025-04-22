
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MentorCard from '../components/MentorCard';
import Footer from '../components/Footer';
import { mentors, colleges, faqs, testimonials } from '../utils/data';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />

      {/* Popular Colleges Section */}
      <section className="py-16 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular <span className="text-elophaz-primary">Colleges</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find mentors from top colleges across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colleges.map((college, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src={college.logo} 
                    alt={`${college.name} logo`}
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{college.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{college.location}</p>
                <div className="text-elophaz-primary font-medium">
                  {college.mentorCount} mentors available
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section id="mentors" className="py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-elophaz-primary">Mentors</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with verified current students for authentic college insights
            </p>
          </div>
          
          <div className="space-y-6">
            {mentors.slice(0, 3).map((mentor) => (
              <MentorCard key={mentor.id} {...mentor} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-elophaz-primary hover:bg-elophaz-primary/90 px-8">
              View All Mentors
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-10 bg-gradient-to-br from-elophaz-light via-white to-elophaz-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Student <span className="text-elophaz-primary">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Elophaz has helped students make informed college decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name}'s avatar`}
                    className="w-12 h-12 rounded-full" 
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.college}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-elophaz-primary">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Elophaz
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions?
            </p>
            <Button variant="outline" className="border-elophaz-primary text-elophaz-primary hover:bg-elophaz-primary/10">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-10 bg-elophaz-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect college match?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
            Join Elophaz today and connect with current students from your dream colleges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-elophaz-primary hover:bg-white/90 px-8">
              Join as Student
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
              Become a Mentor
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

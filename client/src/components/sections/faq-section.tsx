import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How far in advance should we book your services?",
    answer: "We recommend booking at least 6-9 months in advance for peak wedding season (October-February). For off-season weddings, 3-6 months advance booking is usually sufficient. Popular dates get booked quickly, so the earlier you finalize, the better!"
  },
  {
    question: "Do you cover destination weddings outside India?",
    answer: "Yes, we do! We have experience photographing Indian weddings in Dubai, Thailand, Singapore, Malaysia, and several European countries. Additional travel and accommodation costs will apply, which we can detail in a custom quote."
  },
  {
    question: "How do payments work? Is there a booking fee?",
    answer: "We require a 30% booking fee to reserve your date, which is non-refundable. The remaining balance is due 14 days before your wedding date. We accept payments through secure online transfers, credit cards, and UPI payments. All payment details will be outlined in your contract."
  },
  {
    question: "How long does it take to receive our photos and videos?",
    answer: "We deliver a sneak peek of 20-30 edited images within 72 hours after your wedding. The complete set of edited photos is delivered within 4-6 weeks. Wedding films typically take 8-10 weeks for full editing and production. Rush delivery options are available for an additional fee."
  },
  {
    question: "Can we customize the packages to fit our specific needs?",
    answer: "Absolutely! Our packages are starting points, and we're happy to tailor them to your specific requirements. Whether you need coverage for additional events, extra hours, or specialized services like same-day edits, we can create a custom package just for you."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our wedding photography services</p>
        </div>
        
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <AccordionTrigger className="bg-cream hover:bg-maroon-50 px-5 py-4 font-medium transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-5 bg-white border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <a 
            href="mailto:contact@weddingmemories.com" 
            className="inline-flex items-center text-maroon-600 font-medium hover:text-maroon-700 transition-colors"
          >
            <span className="mr-2">📧</span> contact@weddingmemories.com
          </a>
        </div>
      </div>
    </section>
  );
}

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Zap } from "lucide-react";
import { Flex, Heading, Box, Text, Container } from "@radix-ui/themes";
import React from "react";

const FaqSection = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <Container size="3" pb="5%" mb="5" px={{ initial: "4", md: "6" }}>
        {/* Заголовок Секции */}
        <Flex mt="6" direction="column" align="center" mb="12">
          <Heading as="h2" size={{ initial: "7", md: "8" }} className="font-extrabold text-black" mb="4">
            Sıkça Sorulan Sorular
          </Heading>
          <Box className="w-24 h-1 bg-yellow-400" mb="4"></Box>
          <Text size="4" className="text-gray-600 max-w-2xl text-center" mb="8">
            Merak ettiğiniz soruların cevapları burada
          </Text>
        </Flex>

        {/* Контейнер Аккордеона Radix */}
        <Box className="max-w-4xl mx-auto">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-4 w-full"
          >
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm data-[state=open]:border-yellow-400 data-[state=open]:border-2 data-[state=open]:shadow-md"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    className="text-left font-semibold text-black w-full h-16 flex justify-between items-center group transition-colors duration-200 text-base data-[state=open]:font-bold data-[state=open]:text-yellow-600 hover:bg-gray-50"
                  >
                    <Flex align="center" py="4" px="6">
                      {faq.question}
                    </Flex>

                    {/* Иконка с плавным поворотом */}
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 group-data-[state=open]:rotate-180 group-data-[state=open]:text-yellow-600" />
                  </Accordion.Trigger>
                </Accordion.Header>

                {/* Accordion.Content с классами для анимации */}
                <Accordion.Content
                  className="text-sm text-gray-700 leading-relaxed data-[state=open]:bg-yellow-50 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp border-t border-yellow-200"
                >
                  <Box py="4" px="6">
                    {faq.answer}
                  </Box>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>
      </Container>
    </section>
  );
};

export default FaqSection;

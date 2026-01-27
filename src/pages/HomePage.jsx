import React, { useState, useEffect } from "react";
// Импорты Radix UI
import {
  TextField,
  Button,
  TextArea,
  Flex,
  Grid,
  Heading,
  Text,
  Box,
  Separator,
  Container,
} from "@radix-ui/themes";
import { Accordion, Toast } from "radix-ui";
// Импорты иконок
import { Truck, Phone, Clock, MapPin, ChevronDown } from "lucide-react";

// --- ДАННЫЕ ДЛЯ КОМПОНЕНТА ---
import FaqSection from "./FaqSection";

import emailjs from "@emailjs/browser";
// Состояние для данных формы
 
const services = [
  {
    title: "Araç Çekme",
    description: "Her türlü araç için 7/24 profesyonel çekici hizmeti",
    icon: "🚗",
    image:"/services1.jpeg",
  },
  {
    title: "Ağır Vasıta Çekimi",
    description: "Kamyon, çekici ve ağır iş makineleri çekme hizmeti",
    icon: "🚛",
    image:
      "/services2.jpeg",
  },
  {
    title: "Acil Yol Yardım",
    description: "Yolda kalan araçlarınız için anında destek",
    icon: "⚡",
    image:
      "/services3.jpeg",
  },
];

const testimonials = [
  {
    rating: 5,
    name: "Mehmet Yılmaz",
    location: "Konyaaltı, Antalya",
    text: "Gece yarısı yolda kaldım, 20 dakika içinde geldiler. Çok profesyonel ve güler yüzlü bir ekip. Kesinlikle tavsiye ederim.",
  },
  {
    rating: 5,
    name: "Ayşe Demir",
    location: "Kepez, Antalya",
    text: "Aracım arıza yaptı, hızlı ve güvenli bir şekilde çektiler. Fiyatları da çok makul. Teşekkürler ALİHANLAR!",
  },
  {
    rating: 5,
    name: "Can Öztürk",
    location: "Alanya, Antalya",
    text: "7/24 hizmet vermeleri çok büyük avantaj. Taahhüt araçım arıza yaptı, hemen yardıma geldiler. Mükemmel hizmet!",
  },
  {
    rating: 5,
    name: "Zeynep Kaya",
    location: "Muratpaşa, Antalya",
    text: "Profesyonel ekip, modern ekipman ve uygun fiyatlar. ALİHANLAR sayesinde sorunsuz bir şekilde evime ulaştım.",
  },
];

const serviceAreas = [
  "Kepez",
  "Konyaaltı",
  "Muratpaşa",
  "Aksu",
  "Döşemealtı",
  "Serik",
  "Manavgat",
  "Alanya",
];

const faqs = [
  {
    question: "Hizmet saatleriniz nedir?",
    answer:
      "7 gün 24 saat kesintisiz hizmet vermekteyiz. Her an bize ulaşabilirsiniz.",
  },
  {
    question: "Hangi bölgelere hizmet veriyorsunuz?",
    answer:
      "Antalya'nın tüm ilçelerine (Merkez ve çevre ilçeler) hizmet vermekteyiz.",
  },
  {
    question: "Ortalama varış süreniz ne kadar?",
    answer:
      "Genellikle 15-20 dakika içinde bulunduğunuz yere ulaşıyoruz. Yoğunluğa ve konuma göre değişiklik gösterebilir.",
  },
  {
    question: "Ağır vasıta çekimi yapıyor musunuz?",
    answer:
      "Evet, kamyon, çekici ve iş makineleri dahil tüm ağır vasıtalar için çekim hizmeti sunuyoruz.",
  },
  {
    question: "Ödeme seçenekleriniz nelerdir?",
    answer: "Nakit ve kredi kartı ile ödeme seçeneklerimiz mevcuttur.",
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Header становится черным после прокрутки на 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 // Обработчик кнопки звонка
  const handleCall = () => {
    window.location.href = 'tel:+905348441209';
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Параметры, которые улетают в шаблон EmailJS
    const templateParams = {
      user_name: formData.name,
      user_phone: formData.phone,
      user_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        'service_ro0xtxy',  // Твой Service ID
        'template_f99d7ij', // Твой Template ID
        templateParams,
        'qy9MnfuyU_N_7WyF7' // Твой Public Key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Mesajınız başarıyla gönderildi! / Сообщение успешно отправлено!');
          // Очищаем форму
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: ''
          });
        },
        (error) => {
          console.log('FAILED...', error);
          alert('Bir hata oluştu, lütfen tekrar deneyin veya bizi arayın. / Ошибка отправки.');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };





  // --- КОМПОНЕНТ РЕНДЕРИНГ ---

  return (
    <div className="min-h-screen min-w-screen bg-white">
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-black/95 backdrop-blur-sm shadow-xl"
          : "bg-transparent"
          }`}
      >
        <Container size="4" px={{ initial: "4", md: "6" }} py={{ initial: scrolled ? "2" : "3", md: scrolled ? "3" : "5" }}>
          <Flex align="center" justify="between">
            <Flex align="center" gap={{ initial: "2", md: "3" }}>
             
              <img
                  src="/logo.png"
                  alt="ALİHANLAR Oto Kurtarıcı"
                  className="w-22 h-12 object-cover rounded-md  "
                />
              <Box>
                
                <Heading
                  as="h1"
                  size={{ initial: "5", md: scrolled ? "6" : "7" }}
                  className="font-bold text-white transition-all"
                >
                  ALİHANLAR
                </Heading>
                <Text size="1" className="text-yellow-400 font-medium">
                  Oto Kurtarıcı
                </Text>
              </Box>
            </Flex>
            <Button
              color="amber"
              radius="full"
              onClick={handleCall}
              size={{ initial: "2", md: "3" }}
              className="cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Hemen Ara</span>
            </Button>
          </Flex>
        </Container>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url(/hero.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <Container size="4" className="relative z-10" pt={{ initial: "28", md: "20" }} px={{ initial: "4", md: "6" }}>
          <Flex direction="column" align="center" justify="center" py={{ initial: "6", md: "4" }}>
            <Box
              px={{ initial: "3", md: "4" }}
              py={{ initial: "2", md: "2" }}
              mb={{ initial: "3", md: "7" }}
              mt={{ initial: "6", md: "7" }}
              className="inline-block rounded-full bg-black/50 backdrop-blur-sm border border-yellow-400/30"
            >
              <Flex align="center" gap="2">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <Text size={{ initial: "1", md: "2" }} className="text-yellow-400 font-semibold">
                  7/24 Kesintisiz Hizmet
                </Text>
              </Flex>
            </Box>

            <Heading
              mb={{ initial: "2", md: "4" }}
              as="h1"
              size={{ initial: "6", md: "9" }}
              className="font-bold text-white text-center leading-tight"
            >
              Antalya'nın En Güvenilir
              <Text as="span" className="block text-yellow-400" mt={{ initial: "1", md: "3" }}>
                Oto Kurtarma Hizmeti
              </Text>
            </Heading>

            <Box className="max-w-xs md:max-w-5xl mx-auto px-8" mb={{ initial: "3", md: "9" }}>
              <Text 
                mb={{ initial: "4", md: "10" }}
                size={{ initial: "2", md: "4" }}
                className="text-gray-200 text-center leading-relaxed"
              >
                Yolda  mı kaldınız? Endişelenmeyin! Profesyonel ekibimiz 7/24
                yanınızda. Antalya genelinde hızlı ve güvenli araç çekме hizmeti.
              </Text>
            </Box>

            <Flex mb={{ initial: "5", md: "16" }} gap={{ initial: "2", md: "6" }} direction={{ initial: "column", sm: "row" }} justify="center">
              <Button
                color="amber"
                variant="solid"
                radius="full"
                onClick={handleCall}
                size={{ initial: "2", md: "4" }}
                className="cursor-pointer"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                +90 534 844 12 09
              </Button>
              <Button
                color="amber"
                variant="outline"
                radius="full"
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                size={{ initial: "2", md: "4" }}
                className="cursor-pointer"
              >
                İletişime Geç
              </Button>
            </Flex>

            <Grid
              columns={{ initial: "1", sm: "3" }}
              gap={{ initial: "3", md: "6" }}
              width="auto"
              className="w-full"
              style={{ maxWidth: "900px", margin: "auto" }}
            >
              <Flex
                px={{ initial: "8", md: "8" }}
                py={{ initial: "5", md: "8" }}
                direction="column"
                align="center"
                justify="center"
                className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[30px] shadow-2xl border border-white/20 text-center"
              >
                <Clock className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mb-2 md:mb-3" />
                <Heading as="h3" size={{ initial: "3", md: "4" }} className="text-white font-bold mb-1">
                  7/24 Hizmet
                </Heading>
                <Text size={{ initial: "1", md: "2" }} className="text-gray-200">
                  Her zaman yanınızdayız
                </Text>
              </Flex>
              <Flex
                px={{ initial: "3", md: "8" }}
                py={{ initial: "4", md: "8" }}
                direction="column"
                align="center"
                justify="center"
                className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[30px] shadow-2xl border border-white/20 text-center"
              >
                <Truck className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mb-2 md:mb-3" />
                <Heading as="h3" size={{ initial: "3", md: "4" }} className="text-white font-bold mb-1">
                  Hızlı Müdahale
                </Heading>
                <Text size={{ initial: "1", md: "2" }} className="text-gray-200">
                  15-20 dk içinde yerinizde
                </Text>
              </Flex>
              <Flex
                px={{ initial: "3", md: "8" }}
                py={{ initial: "4", md: "8" }}
                direction="column"
                align="center"
                justify="center"
                className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[30px] shadow-2xl border border-white/20 text-center"
              >
                <MapPin className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mb-2 md:mb-3" />
                <Heading as="h3" size={{ initial: "3", md: "4" }} className="text-white font-bold mb-1">
                  Antalya Geneli
                </Heading>
                <Text size={{ initial: "1", md: "2" }} className="text-gray-200">
                  Tüm ilçelere hizmet
                </Text>
              </Flex>
            </Grid>
          </Flex>
        </Container>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-yellow-400" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <Container size="4" px={{ initial: "4", md: "6" }}>
          <Flex mt={{ initial: "4", md: "7" }} direction="column" align="center" mb={{ initial: "6", md: "9" }}>
            <Heading as="h2" size={{ initial: "7", md: "8" }} className="font-bold text-black" mb="4">
              Hizmetlerimiz
            </Heading>
            <Box className="w-24 h-1 bg-yellow-400" mb="4"></Box>
            <Text size={{ initial: "2", md: "3" }} className="text-gray-600 max-w-2xl text-center">
              Her türlü araç için profesyonel çekici ve yol yardım hizmetleri
            </Text>
          </Flex>

          <Grid
            mb="10%"
            columns={{ initial: "1", md: "2", lg: "3" }}
            gap={{ initial: "4", md: "6" }}
            style={{ alignItems: "stretch" }}
          >
            {services.map((service, index) => (
              <Flex
                key={index}
                direction="column"
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ height: "100%" }}
              >
                <Box className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Box className="absolute bottom-3 left-3 bg-white p-2 shadow-lg">
                    <Text size="4">{service.icon}</Text>
                  </Box>
                </Box>
                <Flex direction="column" p="6" grow="1">
                  <Heading as="h3" size="5" className="text-black" mb="3">
                    {service.title}
                  </Heading>
                  <Text
                    size="3"
                    className="text-gray-600 leading-relaxed"
                    mb="4"
                    style={{ flexGrow: 1 }}
                  >
                    {service.description}
                  </Text>
                  <Button
                    color="amber"
                    onClick={handleCall}
                    size="3"
                    radius="full"
                    className="cursor-pointer w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <Container size="4" px={{ initial: "4", md: "6" }}>
          <Grid
            mt={{ initial: "6", md: "9" }}
            mb="15%"
            columns={{ initial: "1", lg: "2" }}
            gap={{ initial: "6", md: "9" }}
            style={{ alignItems: "center" }}
          >
            <Box>
              <Heading as="h2" size={{ initial: "7", md: "8" }} className="font-bold text-black" mb="6">
                Hakkımızda
              </Heading>
              <Box className="w-24 h-1 bg-yellow-400" mb="6"></Box>
              <Text
                size="3"
                className="text-gray-700 leading-relaxed block"
                mb="5"
              >
                <Text as="span" weight="bold" className="text-yellow-600">
                  ALİHANLAR
                </Text>
                , Antalya'da faaliyet gösteren güvenilir ve profesyonel bir oto
                kurtarıcı firmasıdır. Yıllardır sektördeki tecrübemiz ve modern
                ekipmanlarımızla, 7/24 kesintisiz hizmet sunuyoruz.
              </Text>
              <Text
                size="3"
                className="text-gray-700 leading-relaxed block"
                mb="8"
              >
                Müşteri memnuniyetini ön planda tutarak, her türlü araç için
                hızlı, güvenli ve ekonomik çözümler üretiyoruz. Profesyonel
                ekibimiz, alanında uzman ve deneyimli personelden oluşmaktadır.
              </Text>
              <Grid columns="2" gap="6" mb="6">
                <Box p="6" className="border-l-4 border-yellow-500 bg-gray-100 rounded-xl">
                  <Heading
                    as="h4"
                    size="6"
                    className="font-bold text-black"
                    mb="2"
                  >
                    7/24
                  </Heading>
                  <Text size="2" className="text-gray-700 font-medium">
                    Kesintisiz Hizmet
                  </Text>
                </Box>
                <Box p="6" className="border-l-4 border-yellow-500 bg-gray-100 rounded-xl">
                  <Heading
                    as="h4"
                    size="6"
                    className="font-bold text-black"
                    mb="2"
                  >
                   8
                  </Heading>
                  <Text size="2" className="text-gray-700 font-medium">
                    İlçede Hizmet
                  </Text>
                </Box>
              </Grid>
              <Button
                color="gray"
                highContrast
                onClick={handleCall}
                size="3"
                radius="full"
                className="cursor-pointer"
              >
                <Phone className="w-5 h-5 mr-2" />
                Bize Ulaşın
              </Button>
            </Box>
            <Box className="relative">
              <Box className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/aboutUs.jpeg"
                  alt="ALİHANLAR Oto Kurtarıcı"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </Box>
              <Box
                px="3"
                py="2"
                className="absolute -bottom-3 -right-4 bg-yellow-400 p-8 rounded-2xl shadow-xl"
              >
                <Text size="3" className="text-black font-bold">
                  Antalya'nın
                </Text>
                <Text size="5" className="text-black font-bold block">
                  1 Numarası
                </Text>
              </Box>
            </Box>
          </Grid>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#161a21]">
        <Container size="4" py="5%" px={{ initial: "4", md: "6" }}>
          <Flex direction="column" align="center" mb="9">
            <Heading as="h2" size={{ initial: "7", md: "8" }} className="font-bold text-white" mb="4">
              Müşteri Yorumları
            </Heading>
            <Box className="w-24 h-1 bg-yellow-400" mb="4"></Box>
            <Text size="3" className="text-gray-300 max-w-2xl text-center">
              Müşterilerimizin memnuniyeti bizim için en önemli başarı
              göstergesi
            </Text>
          </Flex>

          <Grid
            columns={{ initial: "1", md: "2", lg: "4" }}
            gap="6"
            style={{ alignItems: "stretch" }}
          >
            {testimonials.map((testimonial, index) => (
              <Flex
                px="5"
                py="5"
                key={index}
                direction="column"
                className="bg-[#1f2631] border border-white/10 rounded-2xl p-6 hover:bg-[#252c38] transition-all shadow-lg"
                style={{ height: "100%" }}
              >
                <Box>
                  <Flex gap="1" mb="4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Text key={i} className="text-yellow-400 text-xl">
                        ★
                      </Text>
                    ))}
                  </Flex>
                  <Text
                    size="3"
                    className="text-gray-200 leading-relaxed italic block"
                    mb="6"
                  >
                    "{testimonial.text}"
                  </Text>
                </Box>
                <Box pt="4" mt="auto" className="border-t border-white/10">
                  <Text size="3" className="text-white font-semibold block">
                    {testimonial.name}
                  </Text>
                  <Text size="2" className="text-gray-400">
                    {testimonial.location}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Service Areas Section */}
      <section id="service-areas" className="py-20 bg-white">
        <Container size="4" px={{ initial: "4", md: "6" }}>
          <Flex direction="column" align="center" mb="9">
            <Heading
              as="h2"
              size={{ initial: "7", md: "8" }}
              mt="9"
              className="font-bold text-black"
              mb="4"
            >
              Hizmet Bölgelerimiz
            </Heading>
            <Box className="w-24 h-1 bg-yellow-400" mb="4"></Box>
            <Text size="3" className="text-gray-600 max-w-2xl text-center">
              Antalya'nın tüm ilçelerinde 7/24 hizmetinizdeyiz
            </Text>
          </Flex>

          <Box style={{ maxWidth: "900px", margin: "auto" }}>
            <Grid columns={{ initial: "2", sm: "3", md: "4" }} gap="6">
              {serviceAreas.map((area, index) => (
                <Flex
                  py="8"
                  key={index}
                  direction="column"
                  align="center"
                  gap="2"
                  className="bg-yellow-50 hover:bg-yellow-400 border border-yellow-200 hover:border-yellow-400 rounded-xl p-4 sm:p-6 transition-all group cursor-pointer shadow-sm"
                >
                  <MapPin className="w-7 h-7 text-yellow-600 group-hover:text-black" />
                  <Text size="3" className="text-black font-semibold">
                    {area}
                  </Text>
                </Flex>
              ))}
            </Grid>
            <Flex
              mb="10%"
              mt="8"
              py="9"
              direction="column"
              align="center"
              className="text-center w-full bg-yellow-50 border border-yellow-200 rounded-2xl p-8 shadow-md"
            >
              <MapPin className="w-12 h-12 text-yellow-600 mx-auto" mb="4" />
              <Heading mb="3" mt="3" as="h3" size="5" className="text-black">
                Merkez Adresimiz
              </Heading>
              <Text size="3" className="text-gray-700 block">
                Kızıltoprak Mahallesi 933 Sokak No: 24
                <br />
                Antalya
              </Text>
            </Flex>
          </Box>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <FaqSection faqs={faqs} />
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
      <Container size="4" py="9" px={{ initial: "4", md: "6" }}>
        <Flex direction="column" align="center" mb="9">
          <Heading as="h2" size={{ initial: "7", md: "8" }} className="font-bold text-black" mb="4">
            İletişime Geçin
          </Heading>
          <Box className="w-24 h-1 bg-yellow-400" mb="6"></Box>
          <Text size="3" className="text-gray-600 max-w-2xl text-center">
            Sorularınız için bize ulaşın, en kısa sürede size dönüş yapalım
          </Text>
        </Flex>

        <Grid
          columns={{ initial: "1", lg: "2" }}
          gap="9"
          style={{ maxWidth: "750px", margin: "auto" }}
        >
          {/* Contact Info */}
          <Box>
            <Box
              p="6"
              mb="6"
              className="bg-[#1f2631] rounded-2xl text-white shadow-2xl"
            >
              <Heading
                as="h3"
                size="5"
                mb="5"
                className="border-b border-gray-700"
                pb="3"
              >
                İletişim Bilgileri
              </Heading>
              <Flex direction="column" gap="5">
                <Flex align="start" gap="4">
                  <Box p="3" className="bg-yellow-400 rounded-lg shrink-0">
                    <Phone className="w-6 h-6 text-black" />
                  </Box>
                  <Box>
                    <Text size="2" className="text-gray-300 block" mb="1">
                      Telefon
                    </Text>
                    <a
                      href="tel:+905348441209"
                      className="text-xl font-bold hover:text-yellow-400 transition-colors block"
                    >
                      +90 534 844 12 09
                    </a>
                  </Box>
                </Flex>
                <Flex align="start" gap="4">
                  <Box p="3" className="bg-yellow-400 rounded-lg shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </Box>
                  <Box>
                    <Text size="2" className="text-gray-300 block" mb="1">
                      Adres
                    </Text>
                    <Text size="3" className="block">
                      Kızıltoprak Mahallesi
                      <br />
                      933 Sokak No: 24, Antalya
                    </Text>
                  </Box>
                </Flex>
                <Flex align="start" gap="4">
                  <Box p="3" className="bg-yellow-400 rounded-lg shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </Box>
                  <Box>
                    <Text size="2" className="text-gray-300 block" mb="1">
                      Çalışma Saatleri
                    </Text>
                    <Text size="3" weight="bold" className="block">
                      7 Gün 24 Saat
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>

            <Box
              p="7"
              className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl text-center shadow-md"
            >
              <Heading size="5" className="text-black" mb="2">
                Acil Durum?
              </Heading>
              <Text size="3" className="text-gray-700 block" mb="4">
                Hemen arayın!
              </Text>
              <Button
                color="amber"
                radius="full"
                onClick={handleCall}
                size="4"
                className="cursor-pointer w-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                +90 534 844 12 09
              </Button>
            </Box>
          </Box>

          {/* Contact Form */}
          <Box>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 rounded-2xl h-full"
            >
              <Flex direction="column" gap="5" p="5">
                <Box>
                  <Text
                    as="label"
                    htmlFor="name"
                    size="2"
                    weight="bold"
                    className="block"
                    mb="2"
                  >
                    Ad Soyad *
                  </Text>
                  <TextField.Root
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Adınızı ve soyadınızı girin"
                    size="3"
                    required
                  />
                </Box>
                <Box>
                  <Text
                    as="label"
                    htmlFor="phone"
                    size="2"
                    weight="bold"
                    className="block"
                    mb="2"
                  >
                    Telefon *
                  </Text>
                  <TextField.Root
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="05XX XXX XX XX"
                    size="3"
                    required
                  />
                </Box>
                <Box>
                  <Text
                    as="label"
                    htmlFor="email"
                    size="2"
                    weight="bold"
                    className="block"
                    mb="2"
                  >
                    E-posta *
                  </Text>
                  <TextField.Root
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="ornek@email.com"
                    size="3"
                    required
                  />
                </Box>
                <Box>
                  <Text
                    as="label"
                    htmlFor="message"
                    size="2"
                    weight="bold"
                    className="block"
                    mb="2"
                  >
                    Mesajınız *
                  </Text>
                  <TextArea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    size="3"
                    className="resize-none"
                    required
                  />
                </Box>
                <Button
                  color="amber"
                  radius="full"
                  type="submit"
                  disabled={isSubmitting}
                  size="4"
                  className="cursor-pointer w-full"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                </Button>
              </Flex>
            </form>
          </Box>
        </Grid>
      </Container>
    </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <Container size="4" pt="6" px={{ initial: "4", md: "6" }}>
          <Grid columns={{ initial: "1", md: "3" }} gap="8" mb="8">
            <Box>
              <Flex align="center" gap="3" mb="4">
                <Truck className="w-10 h-10 text-yellow-400" />
                <Box>
                  <Heading as="h3" size="5">
                    ALİHANLAR
                  </Heading>
                  <Text size="2" className="text-yellow-400">
                    Oto Kurtarıcı
                  </Text>
                </Box>
              </Flex>
              <Text size="2" className="text-gray-400 block">
                Antalya'nın en güvenilir oto kurtarıcı hizmeti. 7/24
                yanınızdayız.
              </Text>
            </Box>
            <Box>
              <Heading
                as="h4"
                size="3"
                mb="4"
                className="border-b border-yellow-400 pb-1 inline-block"
              >
                Hızlı Linkler
              </Heading>
              <Flex direction="column" gap="2">
                <Text
                  size="3"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <a href="#services">Hizmetler</a>
                </Text>
                <Text
                  size="3"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <a href="#about">Hakkımızda</a>
                </Text>
                <Text
                  size="3"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <a href="#service-areas">Hizmet Bölgeleri</a>
                </Text>
                <Text
                  size="3"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <a href="#contact">İletişim</a>
                </Text>
              </Flex>
            </Box>
            <Box>
              <Heading
                as="h4"
                size="3"
                mb="4"
                className="border-b border-yellow-400 pb-1 inline-block"
              >
                İletişim
              </Heading>
              <Flex direction="column" gap="3" className="text-gray-400">
                <Flex align="center" gap="2">
                  <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                  <a
                    href="tel:+905348441209"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    +90 534 844 12 09
                  </a>
                </Flex>
                <Flex align="start" gap="2">
                  <MapPin className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                  <Text size="2" className="block">
                    Kızıltoprak Mahallesi
                    <br />
                    933 Sokak No: 24, Antalya
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Grid>
          <Separator size="4" my="6" className="border-gray-800" />
          <Text size="1" className="text-center text-gray-400 block">
            &copy; 2025 ALİHANLAR Oto Kurtarıcı. Tüm hakları saklıdır.
          </Text>
        </Container>
      </footer>
    </div >
  );
}

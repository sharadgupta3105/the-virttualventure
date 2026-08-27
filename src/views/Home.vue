<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import TrustStrip from '@/components/TrustStrip.vue'
import Services from '@/components/Services.vue'
import Statement from '@/components/Statement.vue'
import Process from '@/components/Process.vue'
import Results from '@/components/Results.vue'
import WhyUs from '@/components/WhyUs.vue'
import About from '@/components/About.vue'
import CTA from '@/components/CTA.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="bg-bg text-text">
    <Navbar />
    <main id="main">
      <Hero />
      <TrustStrip />
      <Services />
      <Statement />
      <Process />
      <Results />
      <WhyUs />
      <About />
      <CTA />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

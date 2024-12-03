<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  const faqItems = [
    {
      answer:
        "The Creighton Model is a standardized method of tracking fertility signs to understand a woman's reproductive health and fertility cycles. It's used for family planning, both to achieve and avoid pregnancy, as well as to monitor overall reproductive health.",
      question: 'What is the Creighton Model?',
    },
    {
      answer:
        "Our app is specifically designed for the Creighton Model, providing precise tracking tools and analysis based on this method. We offer detailed charting, personalized insights, and integration with Creighton Model practitioners, which generic fertility apps don't provide.",
      question: 'How does your app differ from other fertility tracking apps?',
    },
    {
      answer:
        'Absolutely. We use industry-standard encryption and security measures to protect your data. Your privacy is our top priority, and we never share your personal information without your explicit consent.',
      question: 'Is my data secure and private?',
    },
    {
      answer:
        'While basic knowledge of the Creighton Model is helpful, our app includes tutorials and guides to help you get started. For best results, we recommend working with a certified Creighton Model practitioner, and our app is designed to complement their guidance.',
      question: 'Do I need to be trained in the Creighton Model to use this app?',
    },
    {
      answer:
        'Yes, you can easily generate shareable reports or grant your healthcare provider direct access to your charts through our secure platform. This feature facilitates better communication with your healthcare team.',
      question: 'Can I share my charts with my healthcare provider?',
    },
  ];
</script>

<section class="container py-16">
  <h2 class="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
    Frequently Asked Questions
  </h2>
  <div class="mx-auto max-w-3xl">
    <Accordion.Root type="single" class="w-full">
      {#each faqItems as item}
        <Accordion.Item value={`item-${item.question}`}>
          <Accordion.Trigger
            class="text-left text-lg font-semibold text-gray-700 dark:text-gray-200"
          >
            {item.question}
          </Accordion.Trigger>
          <Accordion.Content class="text-gray-600 dark:text-gray-300">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </div>
</section>

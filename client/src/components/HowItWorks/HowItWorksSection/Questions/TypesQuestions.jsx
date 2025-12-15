import React from 'react';
import QuestionsBlock from '../Common/QuestionsBloc/QuestionsBlock';

const TypesQuestions = () => {
  const contestItems = [
    {
      question: 'How long does it take to start receiving submissions?',
      questionOpen: 'How long does it take to start receiving submissions?',
      text: 'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
    },
    {
      question: 'How long do Naming Contests last?',
      questionOpen: 'How long do Naming Contests last? ',
      text: 'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
    },
    {
      question: 'Where are the creatives located?',
      questionOpen: 'Where are the creatives located?',
      text: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
    },
    {
      question: 'What if I do not like any submissions?',
      questionOpen: 'What if I do not like any submissions?',
      text: 'While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:',
      /////////////////////////////////////////////////////
    },
    {
      question: 'How much does it cost?',
      questionOpen: 'How much does it cost?',
      text: 'Our naming competitions start at $299, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our ....... for details',
      ////////////////////////////////////////////////////////
    },
    {
      question:
        'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
      questionOpen:
        'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
      text: 'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our..........',
      //////////////////////////////////////////////////////////////////////////////
    },
    {
      question: 'What if I want to keep my business idea private?',
      questionOpen: 'What if I want to keep my business idea private?',
      text: 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.',
    },
    {
      question: 'Can you serve customers outside the US?  ',
      questionOpen: 'Can you serve customers outside the US?  ',
      text: 'Absolutely. Atom services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We have helped more than 25,000 customer around the world.',
    },
    {
      question: 'Can I see any examples?',
      questionOpen: 'Can I see any examples?',
      text: 'Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.',
      ////////////////////////////////////////////////////////////////////////////
    },
  ];

  const buyingItems = [
    {
      question: "What's included with a Domain Purchase?",
      questionOpen: "What's included with a Domain Purchase?",
      text: 'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
    },
    {
      question: 'How does the Domain transfer process work?',
      questionOpen: 'How does the Domain transfer process work?',
      text: 'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
    },
    {
      question:
        'If I purchase a Domain on installments, can I start using it to setup my website?',
      questionOpen:
        'If I purchase a Domain on installments, can I start using it to setup my website?',
      text: 'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
    },
  ];

  const menegedContests = [
    {
      question: 'What are Managed Contests?',
      questionOpen: 'What are Managed Contests?',
      text: "The 'Managed' option is a fully managed service by Atom Branding experts. It includes a formal brief preparation by Atom team and management of your contest. Managed Contests are a great fit for companies that are looking for an 'Agency' like experience and they do not want to manage the contest directly. ..........Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project. Learn more about our ........",
      //////////////////////////////////////////////////
    },
    {
      question: "What's a typical timeline for a Managed Contest?",
      questionOpen: "What's a typical timeline for a Managed Contest?",
      text: 'The overall process takes 12-13 days. .............................',
      //////////////////////////////////////////////////////////////////////
    },
    {
      question: 'How much do Managed Contests cost? ',
      questionOpen: 'How much do Managed Contests cost? ',
      text: 'We offer two levels of Managed Contests. Standard ($1499) and Enterprise ($2999). The Enterprise managed contest includes: ....................................',
      ///////////////////////////////////////////////////////
    },
    {
      question: 'Where are the Branding Consultants located?',
      questionOpen: 'Where are the Branding Consultants located?',
      text: 'All our branding consultants are based in in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.',
    },
  ];

  const creativesItems = [
    {
      question: 'Can anyone join your platform?',
      questionOpen: 'Can anyone join your platform?',
      text: "We are open to anyone to signup. However, we have an extensive '........................................................",
      /////////////////////////////////////////////////////////////////////////////
    },
    {
      question: 'Can I start participating immediately upon signing up?',
      questionOpen: 'Can I start participating immediately upon signing up?',
      text: "When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to 'Full Access', so that you can begin participating in all open contests.",
    },
    {
      question: 'How Do I Get Paid?',
      questionOpen: 'How Do I Get Paid?',
      text: 'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
    },
  ];

  return (
    <>
      <QuestionsBlock title="Launching A Contest" items={contestItems} />
      <QuestionsBlock title="Buying From Marketplace" items={buyingItems} />
      <QuestionsBlock title="Managed Contests" items={menegedContests} />
      <QuestionsBlock title="For Creatives" items={creativesItems} />
    </>
  );
};

export default TypesQuestions;

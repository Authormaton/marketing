export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItemData[] = [
  {
    id: '1',
    question: 'What is Web3 and how does it relate to AI?',
    answer: 'Web3 refers to the next generation of the internet, built on decentralized blockchain technology. It empowers users with greater control over their data and digital assets. AI plays a crucial role in Web3 by providing intelligent automation, data analysis for decentralized applications (dApps), and enhancing user experiences through personalized interactions within these decentralized environments.',
  },
  {
    id: '2',
    question: 'How can AI enhance blockchain security?',
    answer: 'AI can enhance blockchain security by identifying anomalous patterns in network transactions that might indicate fraudulent activity or cyber attacks. Machine learning algorithms can analyze vast amounts of data to detect vulnerabilities, predict potential threats, and even automate responses to maintain the integrity and security of the blockchain network.',
  },
  {
    id: '3',
    question: 'What are smart contracts and how does AI interact with them?',
    answer: 'Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They run on a blockchain, executing automatically when predefined conditions are met. AI can interact with smart contracts by providing external data inputs (oracles), optimizing contract execution, or analyzing contract code for vulnerabilities before deployment, making them more efficient and secure.',
  },
  {
    id: '4',
    question: 'Can AI help in the development of dApps?',
    answer: 'Absolutely. AI can significantly aid in the development of decentralized applications (dApps) by automating code generation, optimizing smart contract logic, and providing predictive analytics for user behavior within the dApp ecosystem. AI tools can also assist in testing dApps for security flaws and performance bottlenecks, leading to more robust and user-friendly applications.',
  },
  {
    id: '5',
    question: 'What is the role of AI in decentralized finance (DeFi)?',
    answer: 'In DeFi, AI can be leveraged for various purposes, including algorithmic trading strategies, risk assessment for lending protocols, fraud detection, and personalized financial advice. AI-powered analytics can help users make informed decisions in volatile DeFi markets and improve the overall efficiency and security of decentralized financial services.',
  },
  {
    id: '6',
    question: 'How do NFTs and AI intersect?',
    answer: 'NFTs (Non-Fungible Tokens) represent unique digital assets on a blockchain. AI intersects with NFTs in several ways: AI can be used to generate unique NFT art and collectibles, create dynamic NFTs that evolve based on AI-driven data, or provide appraisal and authentication services for NFTs, ensuring their originality and value.',
  },
  {
    id: '7',
    question: 'What are the ethical considerations when combining Web3 and AI?',
    answer: 'Combining Web3 and AI raises ethical considerations around data privacy, algorithmic bias, and autonomous decision-making. Ensuring transparency in AI models, safeguarding user data in decentralized networks, and preventing bias in AI-driven Web3 applications are critical challenges that require careful design and governance to promote fair and equitable outcomes.',
  },
  {
    id: '8',
    question: 'How can AI be used to improve user experience in Web3?',
    answer: 'AI can significantly improve user experience in Web3 by personalizing interactions with dApps, streamlining complex processes, and providing intelligent assistance. This includes AI-powered chatbots for support, predictive interfaces that anticipate user needs, and advanced analytics to optimize content delivery and engagement within decentralized platforms, making Web3 more accessible and intuitive.',
  },
];
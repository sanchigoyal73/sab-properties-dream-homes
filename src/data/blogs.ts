export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  author: string;
  date: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "top-10-commercial-properties-delhi",
    title: "Top 10 Commercial Properties in Delhi for 2026",
    excerpt: "Discover the most sought-after commercial spaces in Delhi that promise high returns and excellent connectivity.",
    content: `
      <h2>The Rise of Commercial Real Estate in Delhi</h2>
      <p>Delhi continues to be a prime hub for commercial investments. With expanding metro networks and new business districts emerging, investing in a commercial property here is a lucrative opportunity.</p>
      
      <h3>1. Connaught Place</h3>
      <p>The heart of Delhi remains a top choice for premium office spaces and retail outlets. Its historic charm combined with modern amenities makes it unbeatable.</p>

      <h3>2. Okhla Industrial Area</h3>
      <p>Ideal for showrooms and warehouses, Okhla offers robust infrastructure and excellent connectivity to Faridabad and Noida.</p>

      <h3>3. Nehru Place</h3>
      <p>Known as the IT hub, Nehru Place is perfect for tech startups and electronic businesses seeking a well-established ecosystem.</p>

      <p><strong>Conclusion:</strong> Choosing the right location depends on your business needs. Contact SabProperties today to find the perfect space for your enterprise.</p>
    `,
    author: "SabProperties Team",
    date: "2026-06-15",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    seoTitle: "Top 10 Commercial Properties in Delhi | SabProperties Blog",
    seoDescription: "Explore the best commercial properties and office spaces in Delhi for 2026. High returns and prime locations available."
  },
  {
    id: "2",
    slug: "benefits-of-pre-rented-properties",
    title: "Why You Should Invest in Pre-Rented Properties",
    excerpt: "Learn why pre-rented properties are considered one of the safest and most profitable real estate investments.",
    content: `
      <h2>Understanding Pre-Rented Properties</h2>
      <p>Pre-rented properties, also known as pre-leased properties, are commercial or residential spaces that already have a tenant paying rent. When you buy the property, the lease agreement is transferred to you.</p>

      <h3>Benefits of Investing</h3>
      <ul>
        <li><strong>Immediate ROI:</strong> You start earning rental income from day one.</li>
        <li><strong>Zero Waiting Period:</strong> No need to spend months finding a suitable tenant.</li>
        <li><strong>Capital Appreciation:</strong> Along with regular income, the property value appreciates over time.</li>
      </ul>

      <p>If you're looking for a hassle-free investment with steady returns, explore our exclusive pre-rented properties in Delhi.</p>
    `,
    author: "SabProperties Team",
    date: "2026-06-10",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    seoTitle: "Benefits of Pre-Rented Properties | Investment Guide",
    seoDescription: "Discover the advantages of investing in pre-rented properties. Earn immediate ROI and secure your financial future."
  }
];

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  twitterHandle?: string;
  structuredData?: object;
  keywords?: string;
  useBusinessSchema?: boolean;
}

const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/og-image.jpg",
  twitterHandle = "@sabproperties",
  structuredData,
  keywords,
  useBusinessSchema = false,
}: SEOProps) => {
  const siteName = "SAB Properties Private Limited";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Trusted real estate consultancy, portfolio management & legal assistance in New Delhi. Specializing in office spaces, warehouses (godowns), and showrooms.";
  const metaDescription = description || defaultDescription;
  const baseUrl = "https://sabproperties.in";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteName,
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.jpg`,
    "description": defaultDescription,
    "telephone": "+918700513200",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1/22 Asaf Ali Road",
      "addressLocality": "New Delhi",
      "postalCode": "110002",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61579467053882",
      "https://www.instagram.com/sabprop/"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonical} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Structured Data */}
      {useBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      )}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

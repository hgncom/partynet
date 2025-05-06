import React from 'react';

/**
 * LocalBusinessSchema component for adding local business structured data
 * Helps with local SEO and Google Maps integration
 */
export default function LocalBusinessSchema({
  businessName = "Party.net Planning Services",
  description = "Professional party planning services for all occasions",
  image = "https://partynet.netlify.app/images/party-default.jpg",
  telephone = "+1-555-123-4567",
  email = "contact@partynet.netlify.app",
  url = "https://partynet.netlify.app",
  address = {
    streetAddress: "123 Party Avenue",
    addressLocality: "Celebration City",
    addressRegion: "CA",
    postalCode: "90210",
    addressCountry: "US"
  },
  geo = {
    latitude: "34.0522",
    longitude: "-118.2437"
  },
  openingHours = [
    "Mo-Fr 09:00-17:00",
    "Sa 10:00-15:00"
  ],
  priceRange = "$$",
  serviceArea = "Los Angeles and surrounding areas"
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: businessName,
    description: description,
    image: image,
    telephone: telephone,
    email: email,
    url: url,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo
    },
    openingHours: openingHours,
    priceRange: priceRange,
    areaServed: serviceArea,
    hasMap: `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`,
    sameAs: [
      "https://www.facebook.com/partynet",
      "https://www.instagram.com/partynet",
      "https://www.pinterest.com/partynet"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

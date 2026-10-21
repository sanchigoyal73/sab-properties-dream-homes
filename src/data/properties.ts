export interface Property {
  id: number;
  image: string;
  category: string;
  status: string;
  title: string;
  location: string;
  address?: string;
  area: string;
  size: number;
  price: string;
  priceValue: number;
  featured: boolean;
  description: string;
  amenities: string[];
  floor: string;
  facing: string;
  age: string;
  highlights?: string[];
  seats?: string;
  floorPlanUrl?: string;
  rent?: number | string;
  salePrice?: number | string;
  roi?: number | string;
  tenant?: string;
  securityDeposit?: number | string;
  lockin?: string;
  tenure?: number;
  leaseCommencement?: string | number;
  escalation?: string;
  furnishing?: string;
}

export const allProperties: Property[] = [
  {
    "id": 1,
    "image": "/officeSpaces/officeSpace1.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Plug and Play Office for 5–6 Team",
    "location": "Asaf Ali Road",
    "area": "50-150 sq ft",
    "size": 50,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Plug and Play Office for 5–6 Team. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 50-150 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "5–6 Seats"
  },
  {
    "id": 2,
    "image": "/officeSpaces/officeSpace5.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Modern Office Space for 6–10 Team",
    "location": "Asaf Ali Road",
    "area": "160-200 sq ft",
    "size": 160,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Modern Office Space for 6–10 Team. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 160-200 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "6–10 Seats"
  },
  {
    "id": 3,
    "image": "/officeSpaces/officeSpace3.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Premium Office Setup for 10–15 Team",
    "location": "Asaf Ali Road",
    "area": "300-500 sq ft",
    "size": 300,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Premium Office Setup for 10–15 Team. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 300-500 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "10–15 Seats"
  },
  {
    "id": 4,
    "image": "/officeSpaces/officeSpace4.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Customizable Managed Office in Central Delhi",
    "location": "Asaf Ali Road",
    "area": "1200 sq ft",
    "size": 1200,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Customizable Managed Office in Central Delhi. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 1200 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Managed Setup"
  },
  {
    "id": 5,
    "image": "/officeSpaces/officeSpace2.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Scalable Office Space for Teams up to 60",
    "location": "Asaf Ali Road",
    "area": "2000-2600 sq ft",
    "size": 2000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Scalable Office Space for Teams up to 60. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 2000-2600 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Up to 60 Seats"
  },
  {
    "id": 6,
    "image": "/officeSpaces/officeSpace6.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Large Office Setup for 100+ Team",
    "location": "Asaf Ali Road",
    "area": "4000-4600 sq ft",
    "size": 4000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Large Office Setup for 100+ Team. This premium serviced office is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 4000-4600 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "100+ Seats"
  },
  {
    "id": 7,
    "image": "/godown/godown.jpg",
    "category": "Warehouse",
    "status": "Raw",
    "title": "Warehouse Space Near Kamla Market",
    "location": "Asaf Ali Road",
    "area": "2600 sq ft",
    "size": 2600,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Warehouse Space Near Kamla Market. This premium warehouse is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 2600 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Ample Storage",
      "Independent Entry",
      "Secure Access"
    ],
    "seats": "Logistics Ready"
  },
  {
    "id": 8,
    "image": "/godown/godown1.png",
    "category": "Warehouse",
    "status": "Raw",
    "title": "Warehouse with Independent Entry",
    "location": "Asaf Ali Road",
    "area": "2000 sq ft",
    "size": 2000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Warehouse with Independent Entry. This premium warehouse is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 2000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Ample Storage",
      "Independent Entry",
      "Secure Access"
    ],
    "seats": "Independent Entry"
  },
  {
    "id": 9,
    "image": "/godown/godown2.jpg",
    "category": "Warehouse",
    "status": "Raw",
    "title": "Spacious Warehouse with Parking",
    "location": "Asaf Ali Road",
    "area": "4000 sq ft",
    "size": 4000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Spacious Warehouse with Parking. This premium warehouse is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 4000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Ample Storage",
      "Independent Entry",
      "Secure Access"
    ],
    "seats": "Ample Parking"
  },
  {
    "id": 10,
    "image": "/showroom/showroom.jpg",
    "category": "Showroom",
    "status": "Raw",
    "title": "Retail Showroom Near Ajmeri Gate",
    "location": "Asaf Ali Road",
    "area": "600 sq ft",
    "size": 600,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Retail Showroom Near Ajmeri Gate. This premium showroom is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 600 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "Retail Frontage"
  },
  {
    "id": 11,
    "image": "/showroom/showroom2.jpg",
    "category": "Showroom",
    "status": "Raw",
    "title": "Prime Showroom in Asaf Ali Road Market",
    "location": "Asaf Ali Road",
    "area": "300 sq ft",
    "size": 300,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Prime Showroom in Asaf Ali Road Market. This premium showroom is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 300 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "Market Hub"
  },
  {
    "id": 12,
    "image": "/showroom/showroom1.png",
    "category": "Showroom",
    "status": "Raw",
    "title": "Large Showroom for Retail Chains",
    "location": "Asaf Ali Road",
    "area": "4000 sq ft",
    "size": 4000,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Large Showroom for Retail Chains. This premium showroom is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 4000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "Premium Visibility"
  },
  {
    "id": 13,
    "image": "/coworking/co-work.png",
    "category": "Co-Working",
    "status": "Raw",
    "title": "Affordable Coworking Space in Central Delhi",
    "location": "Asaf Ali Road",
    "area": "7000/- sq ft",
    "size": 7000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Affordable Coworking Space in Central Delhi. This premium co-working is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 7000/- sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Standard Amenities",
      "Managed Setup",
      "Networking Hub"
    ],
    "seats": "Flexible Desk"
  },
  {
    "id": 14,
    "image": "/coworking/co-work1.jpg",
    "category": "Co-Working",
    "status": "Raw",
    "title": "Flexible Coworking Office in Central Delhi",
    "location": "Asaf Ali Road",
    "area": "7000/- sq ft",
    "size": 7000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Flexible Coworking Office in Central Delhi. This premium co-working is strategically located in the heart of Asaf Ali Road, offering exceptional connectivity and visibility for your business. With a spacious area of 7000/- sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Standard Amenities",
      "Managed Setup",
      "Networking Hub"
    ],
    "seats": "Managed Office"
  },
  {
    "id": 15,
    "image": "/coworking/co-work2.jpg",
    "category": "Co-Working",
    "status": "Raw",
    "title": "Modern Coworking Space in East of Kailash",
    "location": "East Of Kailash",
    "area": "7000/- sq ft",
    "size": 7000,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Modern Coworking Space in East of Kailash. This premium co-working is strategically located in the heart of East Of Kailash, offering exceptional connectivity and visibility for your business. With a spacious area of 7000/- sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Standard Amenities",
      "Managed Setup",
      "Networking Hub"
    ],
    "seats": "Premium Workzone"
  },
  {
    "id": 16,
    "image": "/coworking/co-work3.jpg",
    "category": "Co-Working",
    "status": "Raw",
    "title": "Premium Coworking Office in Kirti Nagar",
    "location": "Kirti Nagar",
    "area": "7000/- sq ft",
    "size": 7000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Premium Coworking Office in Kirti Nagar. This premium co-working is strategically located in the heart of Kirti Nagar, offering exceptional connectivity and visibility for your business. With a spacious area of 7000/- sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Standard Amenities",
      "Managed Setup",
      "Networking Hub"
    ],
    "seats": "West Delhi Hub"
  },
  {
    "id": 17,
    "image": "/officeSpaces/officeSpace7.JPG",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Managed Office Space in Connaught Place",
    "location": "Connaught Place",
    "area": "1000 sq ft",
    "size": 1000,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Managed Office Space in Connaught Place. This premium serviced office is strategically located in the heart of Connaught Place, offering exceptional connectivity and visibility for your business. With a spacious area of 1000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Premium Managed"
  },
  {
    "id": 18,
    "image": "/showroom/showroom3.png",
    "category": "Showroom",
    "status": "Raw",
    "title": "Retail Showroom in CP Inner Circle",
    "location": "Connaught Place",
    "area": "1800 sq ft",
    "size": 1800,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Retail Showroom in CP Inner Circle. This premium showroom is strategically located in the heart of Connaught Place, offering exceptional connectivity and visibility for your business. With a spacious area of 1800 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "CP Inner Circle"
  },
  {
    "id": 20,
    "image": "/showroom/showroom4.jpg",
    "category": "Showroom",
    "status": "Raw",
    "title": "Retail Showroom in Karol Bagh Market",
    "location": "Karol Bagh",
    "area": "650 sq ft",
    "size": 650,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Retail Showroom in Karol Bagh Market. This premium showroom is strategically located in the heart of Karol Bagh, offering exceptional connectivity and visibility for your business. With a spacious area of 650 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "Market Frontage"
  },
  {
    "id": 21,
    "image": "/godown/godown3.jpg",
    "category": "Warehouse",
    "status": "Raw",
    "title": "Basement Warehouse for Storage and Logistics",
    "location": "Karol Bagh",
    "area": "1800 sq ft",
    "size": 1800,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Basement Warehouse for Storage and Logistics. This premium warehouse is strategically located in the heart of Karol Bagh, offering exceptional connectivity and visibility for your business. With a spacious area of 1800 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Ample Storage",
      "Independent Entry",
      "Secure Access"
    ],
    "seats": "Basement Logistics"
  },
  {
    "id": 23,
    "image": "/officeSpaces/officeSpace8.jpeg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Office Space on DB Road",
    "location": "Karol Bagh",
    "area": "2000 sq ft",
    "size": 2000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Office Space on DB Road. This premium serviced office is strategically located in the heart of Karol Bagh, offering exceptional connectivity and visibility for your business. With a spacious area of 2000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Professional Setup"
  },
  {
    "id": 24,
    "image": "/showroom/showroom5.jpg",
    "category": "Showroom",
    "status": "Raw",
    "title": "Large Showroom in Okhla Phase 1",
    "location": "Okhla",
    "area": "6800 sq ft",
    "size": 6800,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Large Showroom in Okhla Phase 1. This premium showroom is strategically located in the heart of Okhla, offering exceptional connectivity and visibility for your business. With a spacious area of 6800 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Prime Frontage",
      "High Visibility",
      "Retail Display"
    ],
    "seats": "Okhla Flagship"
  },
  {
    "id": 25,
    "image": "/godown/godown4.jpg",
    "category": "Warehouse",
    "status": "Raw",
    "title": "Industrial Warehouse in Okhla Phase 1",
    "location": "Okhla",
    "area": "10000 sq ft",
    "size": 10000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Industrial Warehouse in Okhla Phase 1. This premium warehouse is strategically located in the heart of Okhla, offering exceptional connectivity and visibility for your business. With a spacious area of 10000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Ample Storage",
      "Independent Entry",
      "Secure Access"
    ],
    "seats": "Industrial Zone"
  },
  {
    "id": 26,
    "image": "/officeSpaces/officeSpace9.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Raw Office Space in Time Tower",
    "location": "MG Road",
    "area": "1180 sq ft",
    "size": 1180,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Raw Office Space in Time Tower. This premium serviced office is strategically located in the heart of MG Road, offering exceptional connectivity and visibility for your business. With a spacious area of 1180 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Raw Setup"
  },
  {
    "id": 27,
    "image": "/officeSpaces/officeSpace10.jpg",
    "category": "Office/Serviced Office",
    "status": "Raw",
    "title": "Managed Office in JMD Tower",
    "location": "MG Road",
    "area": "1440 sq ft",
    "size": 1440,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Managed Office in JMD Tower. This premium serviced office is strategically located in the heart of MG Road, offering exceptional connectivity and visibility for your business. With a spacious area of 1440 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Fully Managed",
      "Premium Setup",
      "Concierge Service"
    ],
    "seats": "Managed Hub"
  },
  {
    "id": 29,
    "image": "/showroom/showroom6.jpg",
    "category": "Showroom",
    "status": "Raw",
    "title": "Retail Showroom in Lajpat Nagar Market",
    "location": "Lajpat Nagar",
    "area": "1000 sq ft",
    "size": 1000,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Retail Showroom in Lajpat Nagar Market. This premium showroom is strategically located in the heart of Lajpat Nagar, offering exceptional connectivity and visibility for your business. With a spacious area of 1000 sq ft, this property is designed to meet modern commercial standards, providing a professional environment that fosters productivity and growth. Ideal for companies looking for a prestigious address in one of Delhi's most sought-after commercial hubs.",
    "amenities": [
      "Prime Location",
      "Power Backup",
      "Modern Infrastructure"
    ],
    "floor": "N/A",
    "facing": "N/A",
    "age": "N/A",
    "seats": "Fashion Market"
  },
  {
    "id": 101,
    "image": "/pre-rented/preRented.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Private Office for Sale in Connaught Place",
    "location": "Connaught Place",
    "address": "Connaught Place",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Private Office for Sale in Connaught Place. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Sixth Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: DG POWER LIMITED",
      "ROI: 6.00%",
      "Locking Period: 3 yrs",
      "Escalation: 5% every yr"
    ],
    "rent": 190000,
    "salePrice": 3.8,
    "roi": 0.06,
    "tenant": "DG POWER LIMITED",
    "securityDeposit": 570000,
    "lockin": "3 yrs",
    "tenure": 5,
    "leaseCommencement": 46113,
    "escalation": "5% every yr",
    "furnishing": "Owner"
  },
  {
    "id": 102,
    "image": "/pre-rented/preRented1.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Building for Sale in Connaught Place",
    "location": "Connaught Place",
    "address": "Connaught Place",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Building for Sale in Connaught Place. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Building",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: MARKS CREATION",
      "ROI: 6.00%",
      "Locking Period: 3 yrs",
      "Escalation: 5% every yr"
    ],
    "rent": 600000,
    "salePrice": 12,
    "roi": 0.06,
    "tenant": "MARKS CREATION",
    "securityDeposit": 1200000,
    "lockin": "3 yrs",
    "tenure": 5,
    "leaseCommencement": 46113,
    "escalation": "5% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 103,
    "image": "/pre-rented/preRented2.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Private Office for Sale in Time Tower, MG Road",
    "location": "MG Road",
    "address": "MG Road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Pre Rented Private Office for Sale in Time Tower, MG Road. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Fourth Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: HOCHIKI EUROPE (U.K) LTD INDIA",
      "ROI: 5.50%",
      "Locking Period: 1 yr",
      "Escalation: 5% every yr"
    ],
    "rent": 184000,
    "salePrice": 4.01,
    "roi": 0.055,
    "tenant": "HOCHIKI EUROPE (U.K) LTD INDIA",
    "securityDeposit": 552000,
    "lockin": "1 yr",
    "tenure": 3,
    "leaseCommencement": 46113,
    "escalation": "5% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 104,
    "image": "/pre-rented/preRented3.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Private Bank for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Pre Rented Private Bank for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Ground Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: AXIS BANK LIMITED",
      "ROI: 3.14%",
      "Locking Period: 3 yrs",
      "Escalation: 15% every 3 yrs"
    ],
    "rent": 418000,
    "salePrice": 16,
    "roi": 0.03136,
    "tenant": "AXIS BANK LIMITED",
    "securityDeposit": 825000,
    "lockin": "3 yrs",
    "tenure": 15,
    "leaseCommencement": 42461,
    "escalation": "15% every 3 yrs",
    "furnishing": "Tenant"
  },
  {
    "id": 105,
    "image": "/pre-rented/preRented4.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Private Office for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Private Office for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "First Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: AQUILA ORGANICS PRIVATE LIMITED",
      "ROI: 6.50%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 78000,
    "salePrice": 1.44,
    "roi": 0.065,
    "tenant": "AQUILA ORGANICS PRIVATE LIMITED",
    "securityDeposit": 468000,
    "lockin": "1 yr",
    "tenure": 5,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 106,
    "image": "/pre-rented/preRented5.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Hotel Chain for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Hotel Chain for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Basement Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: GOSTOPS HOSPITALITY PRIVATE LIMITED",
      "ROI: 6.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 110000,
    "salePrice": 2.21,
    "roi": 0.06,
    "tenant": "GOSTOPS HOSPITALITY PRIVATE LIMITED",
    "securityDeposit": 330000,
    "lockin": "1 yr",
    "tenure": 5,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 107,
    "image": "/pre-rented/preRented6.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Dark Store for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Dark Store for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Basement Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: SCOOTSY LOGISTICS PRIVATE LIMITED",
      "ROI: 7.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 450000,
    "salePrice": 7.72,
    "roi": 0.07,
    "tenant": "SCOOTSY LOGISTICS PRIVATE LIMITED",
    "securityDeposit": 1170000,
    "lockin": "1 yr",
    "tenure": 5,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 108,
    "image": "/pre-rented/preRented7.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Warehouse Space (E commerce operator) for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": true,
    "description": "Pre Rented Warehouse Space (E commerce operator) for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Basement Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: INSTANT PROCUREMENT SERVICES PRIVATE LIMITED",
      "ROI: 6.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 209000,
    "salePrice": 4.19,
    "roi": 0.06,
    "tenant": "INSTANT PROCUREMENT SERVICES PRIVATE LIMITED",
    "securityDeposit": 598500,
    "lockin": "1 yr",
    "tenure": 5,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 109,
    "image": "/pre-rented/preRented8.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Private Office for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Pre Rented Private Office for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "First Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: VIRSAD LOGISTICS PRIVATE LIMITED",
      "ROI: 5.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 50000,
    "salePrice": 1.2,
    "roi": 0.05,
    "tenant": "VIRSAD LOGISTICS PRIVATE LIMITED",
    "securityDeposit": 150000,
    "lockin": "1 yr",
    "tenure": 5,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 110,
    "image": "/pre-rented/preRented9.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Warehouse Space (Private Company) for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Pre Rented Warehouse Space (Private Company) for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Basement Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: MANAV OVERSEAS",
      "ROI: 5.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 160000,
    "salePrice": 3.84,
    "roi": 0.05,
    "tenant": "MANAV OVERSEAS",
    "securityDeposit": 480000,
    "lockin": "1 yr",
    "tenure": 3,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  },
  {
    "id": 111,
    "image": "/pre-rented/preRented10.jpg",
    "category": "Pre-Rented",
    "status": "Active",
    "title": "Pre Rented Warehouse Space (Private Company) for Sale in Central Delhi",
    "location": "asaf ali road",
    "address": "asaf ali road",
    "area": "N/A",
    "size": 0,
    "price": "On Request",
    "priceValue": 0,
    "featured": false,
    "description": "Pre Rented Warehouse Space (Private Company) for Sale in Central Delhi. Premium investment opportunity with high ROI and stable corporate tenant.",
    "amenities": [
      "24/7 Access",
      "Security",
      "Power Backup"
    ],
    "floor": "Basement Floor",
    "facing": "N/A",
    "age": "N/A",
    "highlights": [
      "Tenant: DP JAGAN & BROS",
      "ROI: 5.00%",
      "Locking Period: 1 yr",
      "Escalation: 6% every yr"
    ],
    "rent": 150000,
    "salePrice": 3.6,
    "roi": 0.05,
    "tenant": "DP JAGAN & BROS",
    "securityDeposit": 450000,
    "lockin": "1 yr",
    "tenure": 3,
    "leaseCommencement": 45748,
    "escalation": "6% every yr",
    "furnishing": "Tenant"
  }

];

// Category tiles that group listings by what they are rather than their category field,
// e.g. a pre-rented dark store also counts as a "Cloud Kitchen/Dark Store" property
const KEYWORD_CATEGORIES: Record<string, RegExp> = {
  "Cloud Kitchen/Dark Store": /cloud\s*kitchen|dark\s*store/i,
};

// Category tiles that also show every listing from other categories,
// e.g. warehouses/godowns can be used as cloud kitchens or dark stores
const INCLUDED_CATEGORIES: Record<string, string[]> = {
  "Cloud Kitchen/Dark Store": ["Warehouse"],
};

export const matchesCategory = (property: Property, category: string): boolean => {
  const keywords = KEYWORD_CATEGORIES[category];
  return property.category === category
    || (INCLUDED_CATEGORIES[category] ?? []).includes(property.category)
    || (!!keywords && keywords.test(`${property.title} ${property.description}`));
};

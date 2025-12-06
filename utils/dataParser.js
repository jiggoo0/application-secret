// utils/dataParser.js

/**
 * Parses a price string (e.g., "฿1,000 / 48 ชม.") into price and delivery time.
 * @param {string | null | undefined} priceString - String ราคาที่ต้องการแปลง
 * @returns {{price: number, deliveryTime: string}}
 */
const parsePriceString = (priceString) => {
  if (!priceString) return { price: 0, deliveryTime: '' };

  // Clean up currency symbol and split by '/'
  const parts = priceString
    .replace(/[\u0e3f,฿]/g, '')
    .trim()
    .split('/');

  const pricePart = parts[0].trim();
  const deliveryTimePart = parts.length > 1 ? parts[1].trim() : '';

  // Get the base price (extract only digits)
  const price = parseInt(pricePart.replace(/[^0-9]/g, ''), 10) || 0;

  return { price, deliveryTime: deliveryTimePart };
};

/**
 * Transforms the raw VISA_DOCUMENT_PRICING structure into the ServiceCard's expected Service structure.
 * @param {any[]} rawData - ข้อมูลดิบจาก VISA_DOCUMENT_PRICING
 * @returns {any[]} - ข้อมูลที่แปลงเป็นโครงสร้าง Service ที่มี Tiers
 */
export const transformVisaData = (rawData) => {
  return rawData.map((item) => {
    // Determine the base price for comparison (for OriginalPrice in Promo)
    const basePriceResult = parsePriceString(item.pricing.normal || item.pricing.promo || '0');

    const tiers = [];

    // 1. Normal Tier
    if (item.pricing.normal) {
      const { price, deliveryTime } = parsePriceString(item.pricing.normal);
      if (price > 0) tiers.push({ label: 'ปกติ', price, deliveryTime: deliveryTime || '48 ชม.' });
    }

    // 2. Promo Tier (ต้องมีราคาโปรโมชั่น)
    if (item.pricing.promo) {
      const { price: promoPrice } = parsePriceString(item.pricing.promo);
      const deliveryTime = basePriceResult.deliveryTime || '48 ชม.';
      const originalPrice = basePriceResult.price > promoPrice ? basePriceResult.price : undefined;

      if (promoPrice > 0)
        tiers.push({
          label: 'โปรโมชั่น',
          price: promoPrice,
          originalPrice: originalPrice,
          deliveryTime,
        });
    }

    // 3. Urgent Tier (ต้องมีราคาเร่งด่วน)
    if (item.pricing.urgent) {
      const { price, deliveryTime } = parsePriceString(item.pricing.urgent);
      if (price > 0)
        tiers.push({ label: 'เร่งด่วน', price, deliveryTime: deliveryTime || '2 ชม.' });
    }

    // ตรวจสอบว่าเป็น Single Price (เช่น Cover Letter)
    const isSinglePrice = item.title.includes('Cover Letter');

    return {
      id: item.title.replace(/\s/g, '-').toLowerCase(),
      name: item.title,
      description: item.description,
      images: item.images || [],
      isPopular: item.title.includes('Dual Package'),
      isSinglePrice: isSinglePrice,
      tiers: tiers,
      ctaText: isSinglePrice ? 'ดำเนินการสั่งซื้อ' : 'ดำเนินการสั่งซื้อเร่งด่วน',
      // ctaUrl: `/flight-booking?service=${item.title.replace(/\s/g, '-').toLowerCase()}`, // Example local routing
    };
  });
};

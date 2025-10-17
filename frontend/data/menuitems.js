const menuitems = {
  yomari: [
    { foodid: 14, name: 'Plain Yomari', nepali: 'साधारण योमरी', price: 60, description: 'Traditional steamed dumplings' },
    { foodid: 15, name: 'Sweet Yomari', nepali: 'मिठो योमरी', price: 70, description: 'Sweet filled steamed dumplings', specialty: true },
    { foodid: 27, name: 'Chocolate Yomari', nepali: 'चोकलेट योमरी', price: 80, description: 'Steamed dumpling filled with chocolate' },
    { foodid: 34, name: 'Sesame Yomari', nepali: 'तिलको योमरी', price: 75, description: 'Yomari filled with sesame paste' }
  ],
  bara: [
    { foodid: 16, name: 'Plain Bara', nepali: 'साधारण बारा', price: 80, description: 'Traditional lentil pancake',  },
    { foodid: 17, name: 'Egg Bara', nepali: 'अण्डा बारा', price: 140, description: 'Lentil pancake with egg topping',  },
    { foodid: 18, name: 'Meat Bara', nepali: 'मासु बारा', price: 160, description: 'Lentil pancake with meat topping', specialty: true },
    { foodid: 19, name: 'Mixed Bara', nepali: 'मिक्स बारा', price: 180, description: 'Lentil pancake with mixed toppings',  },
    { foodid: 28, name: 'Cheese Bara', nepali: 'चिज बारा', price: 150, description: 'Lentil pancake with melted cheese topping',  },
    { foodid: 35, name: 'Paneer Bara', nepali: 'पनीर बारा', price: 160, description: 'Lentil pancake with paneer topping',  }
  ],
  chatamari: [
    { foodid: 20, name: 'Plain Chatamari', nepali: 'साधारण चाटामरी', price: 90, description: 'Plain Newari rice crepe',  },
    { foodid: 21, name: 'Egg Chatamari', nepali: 'अण्डा चाटामरी', price: 140, description: 'Rice crepe with egg topping',  },
    { foodid: 22, name: 'Meat Chatamari', nepali: 'मासु चाटामरी', price: 180, description: 'Rice crepe with meat topping',  },
    { foodid: 23, name: 'Mixed Chatamari', nepali: 'मिक्स चाटामरी', price: 200, description: 'Rice crepe with mixed toppings', specialty: true },
    { foodid: 29, name: 'Paneer Chatamari', nepali: 'पनीर चाटामरी', price: 160, description: 'Rice crepe topped with spiced paneer',  },
    { foodid: 36, name: 'Cheese Chatamari', nepali: 'चिज चाटामरी', price: 170, description: 'Rice crepe with cheese topping',  }
  ],
  momo: [
    { foodid: 24, name: 'Veg Momo', nepali: 'तरकारी मोमो', price: 140, description: 'Steamed vegetable dumplings',  },
    { foodid: 25, name: 'Chicken Momo', nepali: 'कुखुराको मोमो', price: 160, description: 'Steamed chicken dumplings',  },
    { foodid: 26, name: 'Buff Momo', nepali: 'भैंसको मोमो', price: 200, description: 'Steamed buffalo meat dumplings',  },
    { foodid: 30, name: 'Jhol Momo', nepali: 'झोल मोमो', price: 180, description: 'Steamed dumplings served in spicy soup', specialty: true },
    { foodid: 37, name: 'Fried Momo', nepali: 'तारेको मोमो', price: 160, description: 'Crispy fried dumplings',  }
  ],
  snacks: [
    { foodid: 5, name: 'Sekuwa', nepali: 'सेकुवा', price: 300, description: 'Grilled marinated meat skewers',  },
    { foodid: 6, name: 'Choila', nepali: 'छोयला', price: 280, description: 'Spiced grilled buffalo meat', specialty: true },
    { foodid: 7, name: 'Sukuti', nepali: 'सुकुटी', price: 250, description: 'Traditional dried meat curry',  },
    { foodid: 8, name: 'Chatpate', nepali: 'चटपटे', price: 150, description: 'Spicy mixed snack',  },
    { foodid: 31, name: 'Fried Sukuti', nepali: 'तारेको सुकुटी', price: 270, description: 'Crispy fried dried meat with spices',  },
    { foodid: 38, name: 'Spicy Peanut Mix', nepali: 'मसालेदार बदाम', price: 120, description: 'Roasted peanuts with spices',  }
  ],
  weekendSpecial: [
    { foodid: 11, name: 'Weekend BBQ', nepali: 'सप्ताहान्त बार्बेक्यू', price: 500, description: 'Special weekend barbecue platter',  },
    { foodid: 32, name: 'Newari Feast', nepali: 'नेवारी भोज', price: 600, description: 'Weekend platter with assorted Newari dishes', specialty: true },
    { foodid: 39, name: 'Family Combo', nepali: 'परिवार सेट', price: 700, description: 'Weekend combo for family sharing', specialty: true }
  ],
  seasonal: [
    { foodid: 12, name: 'Seasonal Thakali', nepali: 'मौसमी थकाली', price: 350, description: 'Seasonal Thakali set meal',  },
    { foodid: 13, name: 'Festival Special', nepali: 'चाडपर्व विशेष', price: 400, description: 'Festival special combination', specialty: true },
    { foodid: 33, name: 'Winter Ghyu Set', nepali: 'जाडो घ्यू सेट', price: 380, description: 'Seasonal meal with ghee-rich items', specialty: true },
    { foodid: 40, name: 'Summer Achar Set', nepali: 'गर्मी अचार सेट', price: 320, description: 'Seasonal pickles and light meal',  }
  ],
  liquorSpecial: [
    { foodid: 9, name: 'Special Thon', nepali: 'विशेष थों', price: 300, description: 'Traditional rice beer special' },
    { foodid: 10, name: 'Aila', nepali: 'ऐला', price: 250, description: 'Local distilled spirits' }
  ],
  liquor: [
    { foodid: 1, name: 'Whiskey', nepali: 'ह्विस्की', price: 300, description: 'Premium whiskey selection' },
    { foodid: 2, name: 'Vodka', nepali: 'भोड्का', price: 250, description: 'Premium vodka selection' },
    { foodid: 3, name: 'Rum', nepali: 'रम', price: 280, description: 'Premium rum selection' },
    { foodid: 4, name: 'Beer', nepali: 'बियर', price: 200, description: 'Cold beer bottles' }
  ]
};

export default menuitems;
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppGradientBtn from '../AppGradientBtn';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadFile} from '../../api/setup/uploadFile';
import {firestore} from '../../api/setup/config';
// import NewPath from '../../assets/images/hoodie/1.jpg';
import stateRegion from '../../utilities/stateRegion';


const flyoutMenu = [
  {
      title: "Phones & Tablets",
      groups: [
          {title: "MOBILE PHONES", types: ["SmartPhones", "Basic Phones", "Refurbished Phones"] }, 
          {title: "TABLETS", types: ["iPads", "Andriod Tablets", "Educational Tablets", "Tablet Accessories"] },
          {title: "MOBILE ACCESSORIES", types: ["Accessory Kits","Adapters","Batteries","Battery Chargers","Bluetooth Headsets","Cables","Car Accessories","Chargers","Earphones & Headsets","MicroSD Cards","Screen Protectors","Selfie Sticks & Tripods","Smart Watches"] },
          {title: "TOP SMARTPHONES", types: ["iphone 13 pro max","iphone 13 pro","iphone 12 pro max","iphone 12 pro","iPhone 11 Pro Max","Samsung Galaxy S10","iPhone 11","Nokia 7.2","Huawei Y9 S","iPhone XS Max","Infinix S5","Vivo Y6","Oppo A8"] },
          {title: "MOBILE PHONES", types: ["Samsung","Apple","Huawei","Nokia","Xiaomi","Tecno","Hawuei","Vivo","Oppo"] },
      ],
  },

  {
      title: "Computing",
      groups: [
          {title: "COMPUTERS", types: ["Desktops", "Laptops"] },
          {title: "DATA STORAGE", types: ["External Hard Drives", "USB Flash Drives", "External Solid State"] },
          {title: "ANTIVIRUS & SECURITY",  types: ["Antivirus",  "Internet Security"] },
          {title: "PRINTERS",  types: ["Inkjet Printers", "Laser Printers", "Printer Ink & Toner"] },
          {title: "COMPUTER ACCESSORIES",  types: ["Keyboards & Mice", "Uninterrupted Power Supply", "Memory Cards", "Batteries", "Scanners", "Video Projectors"] },
          {title: "TOP BRANDS", types: ["HP","Logitech", "Dell", "Lenovo", "Apple", "ASUS", "Huawei", "Microsoft", "Kingston", "Seagate", "Samsung", "Sandisk", "Toshiba", ] },
      ],
  },

  {
      title: "Electronics",
      groups: [
          {title: "TELEVISION & VIDEO", types: ["Televisions", "Smart TVs", "LED & LCD TVs", "QLED & OLED TVs", "DVD Players & Recorders"] },
          {title: "HOME AUDIO", types: ["Home Theatre Systems", "Receivers & Amplifiers", "Sound Bars"] },
          {title: "CAMERAS & PHOTOS", types: ["Digital", "Cameras", "Projectors", "Video Surveillance", "Camcorders"] },
          {title: "GENERATORS & PORTABLE POWER", types: ["Generators", "Power Inverters", "Solar & Wind Power", "Stablizers"] },
          {title: "TOP ELECTRONICS BRANDS", types: ["LG", "Samsung", "Sony", "TCL", "Hisense", "Canon", "DStv"] }
      ],
  },

  {
      title: "Fashion",
      groups: [
          {title: "WOMEN'S FASHION", types: ["Clothing", "Shoes", "Accessories", "Jewelry", "Handbags & Wallets", "Underwear & Sleepwear", "Maternity", "Dresses", "Traditional", "Beach & Swimwear", "Flats"] },
          {title: "KID'S FASHION", types: ["Boy's Fashion", "Girl's Fashion"] },
          {title: "MEN'S FASHION", types: ["Clothing", "Shoes", "Accessories", "Underwear & Sleepwear", "Traditional & Cultural Wear", "T-Shirts", "Polo Shirts", "Trousers & Chinos", "Sneakers", "Jewelry", "Jerseys"] },
          {title: "ALL FASHION", types: [] },
          {title: "WATCHES", types: ["Men's Watches", "Women's Watches"] },
          {title: "SUNGLASSES", types: ["Men's Sunglasses", "Women's Sunglasses"] },
          {title: "TOP BRANDS", types: ["Adidas", "Zara", "Nike", "Casio", "Puma", "Defacto", "Citizen"] }
      ],
  },

  {
      title: "Automobiles",
      groups: [
          {title: "CAR CARE", types: ["Cleaning Kits", "Exterior Care", "Interior Care"] },
          {title: "CAR ELECTRONICS & ACCESSORIES", types: ["Car Electronics", "Car Accessories", "Power & Battery"] },
          {title: "CAR CARE", types: ["Bulbs", "Accent & Off Road Lighting"] },
          {title: "EXTERIOR ACCESSORIES", types: ["Covers", "Mirrors", "Bumper Stickers, Decals & Magnets"] },
          {title: "OILS & FLUIDS", types: ["Brake Fluids", "Greases & Lubricants", "Oils"] },
          {title: "INTERIOR ACCESSORIES", types: ["Air Freshners", "Consoles & Organizers", "Key Chains", "Floor Mats & Cargo Liners", "Sun Protection", "Seat Covers & Accessories"] },
          {title: "TYRE & RIMS", types: ["Tyre", "Inflator & Guages"] }
      ], 
  },

  {
      title: "Home & office",
      groups: [
          {title: "HOME & KITCHEN", types: ["Bath", "Bedding", "Home Decor", "Home Furniture", "Vacuums & Floor Care", "Wall Art", "Cookware", "Bakeware", "Small Appliances", "Cutlery & Knife Accessories"] },
          {title: "HOME & OFFICE FURNITURE", types: ["Kitchen & Dining", "Lighting", "Stationery", " Storage & Organization"] },
          {title: "OFFICE PRODUCTS", types: ["Office & School Supplies", "Office Furniture & Lighting", "Packaging Materials"] },
          {title: "SMALL APPLIANCES", types: ["Ironing & Laundry", "Kettles", "Mixing & Blending", "Microwave Ovens", "Vacuum Cleaners", "Kitchen Bundles"] },
          {title: "LARGE APPLIANCES", types: ["Air Conditioners", "Cookers", "Washers & Dryers", "Fans", "Freezers", "Refrigerators", "Dishwashers"] }
      ],
  },

  {
      title: "Supermarket",
      groups: [
          {title: "CAR CARE", types: ["Grains & Rice", "Pasta", "Noodles", "Breakfast Foods", "Herbs, Spices & Seasoning", "Flours & Meals", "Malt Drinks", "Coffee", "Water", "Cooking Oil", "Juices", "Soft Drinks", "Canned & Packaged Foods", "Candy & Chocolate", "Syrups, Sugars & Sweeteners"] },
          {title: "BABY PRODUCTS", types: [] },
          {title: "HOUSEHOLD CLEANING", types: ["Laundry", "Air Fresheners", "Toilet Paper & Wipes", "Bathroom Cleaners", "Dishwashing", "Disinfectant Wipes"] },
          {title: "BEER, WINE & SPIRITS", types: ["Beers", "Vodka", "Red Wine", "Champagne & Sparkling Wine", "White Wine", "Whiskey", "Liquors"] }
      ],
  },

  {
      title: "Baby Products",
      groups: [
          {title: "APPAREL & ACCESSORIES", types: ["Baby Boys", "Baby Girls"] },
          {title: "DIAPERING", types: ["Disposable Diapers", "Diaper Bags", "Wipes & Holders"] },
          {title: "BABY & TODDLER TOYS", types: ["Activity Play Centers", "Music & Sound", "Bath Toys"] },
          {title: "BATHING & SKIN CARE", types: ["Washcloths & Towels", "Grooming & Healthcare Kits", "Skin Care", "Bathing Tubs & Seats", "Bathroom Safety"] },
          {title: "FEEDING", types: ["Bibs & Burp Cloths", "Breastfeeding", "Bottle-Feeding", "Pacifiers & Accessories", "Food Storage", "Highchairs & Booster Seats", "Solid Feeding"] },
          {title: "GEAR", types: ["Backpacks & Carriers", "Swings, Jumpers & Bouncers", "Walkers"] }
      ],
  },

  {
      title: "Health & Beauty",
      groups: [
          {title: "MAKE UP", types: ["Concealers & Color Correctors", "Foundation", "Powder", "Lip Gloss", "Lip Liner", "Lipstick", "Eyeliner & Kajal", "Eyeshadow", "Mascara"] },
          {title: "FRAGRANCES", types: ["Women's", "Men's"] },
          {title: "HAIR CARE", types: ["Hair & Scalp Care", "Hair Accessories", "Hair Cutting Tools", "Shampoo & Conditioner", "Wigs & Accessories"] },
          {title: "PERSONAL CARE", types: ["Feminine Care", "Contraceptives & Lubricants", "Body"] },
          {title: "ORAL CARE", types: ["Dental Care kits", "Dental Floss & Picks", "Teeth Whitening", "Toothbrushes"] },
          {title: "HEALTH CARE", types: ["Face Protection", "Thermometers", "Hand Sanitizers", "Lab, Safety & Work Gloves"] }
      ],
  },

  {
      title: "Sporting goods",
      groups: [
          {title: "CARDIO TRAINING", types: ["Exercise Bikes", "Treadmills", "Elliptical Trainers"] },
          {title: "STRENGTH TRAINING EQUIPMENT", types: ["Core & Abdominal Trainers", "Dumbbells", "Bars"] },
          {title: "ACCESSORIES", types: ["Exercise Bands", "Exercise Mats", "Jump Ropes", "Sports Clothing"] },
          {title: "TEAM SPORTS", types: ["Basketball", "Team Sport Accessories", "Tennis & Racquet Sports", "Swimming"] },
          {title: "OUTDOOR & ADVENTURE", types: ["Cycling", "Running"] }
      ],
  },

  {
      title: "Other Cateories",
      groups: [
          {title: "TOYS & GAMES", types: ["Games", "Dress Up & Pretend Play", "Sports & Outdoor Play", "Top Toys & Games"] },
          {title: "MISCELLANEOUS", types: [] },
          {title: "BOOKS, MOVIES AND MUSIC", types: [] },
          {title: "MUSICAL INSTRUMENTS", types: [] },
          {title: "PET SUPPLIES", types: [] },
          {title: "ESHOP GLOBAL", types: [] },
          {title: "OFFICIAL STORES", types: ["Michelin", "Nestle", "Xiaomi", "Huawei", "L'Oreal", "MAC", "Apple", "Intel", "Reckitt Benckiser", "Binatone", "Nexus"] },
          {title: "GROCERY", types: ["Food Cupboards", "Baby Products", "Plastic & Paper Products", "Drinks", "Hygiene", "Household Cleaning", "Beer, Wine & Spirits"] },
          {title: "GARDEN & OUTDOORS", types: [] },
          {title: "INDUSTRIAL & SCIENTIFIC", types: [] },
          {title: "SERVICES", types: [] },
          {title: "LIVESTOCK", types: [] },
      ],
  },
]

const ImageUploadTest = props => {
  // https://locus.fkkas.com/api/states
  // https://locus.fkkas.com/api/regions/imo
  const uploadImage = async () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(image => {
        // console.log(typeof image.path, 'heyyyyyyyyyyyyyy');
        console.log(image);
        // uploadFile(image.path);
      })
      .catch(error => {
        console.log(error, 'failed.........');
      });
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     quality: 0.5,
    //   });
    //   if (!result.cancelled) onChangeImage(result.uri);
    // } catch (error) {
    //   console.log("Error reading an Image", error);
    // }
  };

  const categoriesRef = firestore().collection('categories');

  // const handleSubmit = async () => {
  //   for (let i = 0; i < flyoutMenu.length; i++) {
  //     await categoriesRef.doc(`${Date.now()+i}`).set(flyoutMenu[i])
  //     .then(()=>{
  //       console.log(flyoutMenu[i].title, 'category added')
  //     })
  //     .catch((error)=> {
  //       console.log(error);
  //     })
  //   }
  //   // const path = require('../../assets/images/hoodie/2.jpg');
  //   // console.log(NewPath);
  // };

  // console.log(stateRegion);

  const stateList = Object.keys(stateRegion).map((key, index) => {
    return {label: key, value: key};
  });

  

  // console.log(stateList, 'frank');

  return (
    <View style={styles.container}>
      <AppGradientBtn label="upload to firebase" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageUploadTest;

import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AppGradientBtn from '../AppGradientBtn';
import ImagePicker from 'react-native-image-crop-picker';
// import {uploadFile} from '../../api/setup/uploadFile';
import {firestore} from '../../api/setup/config';
import stateRegion from '../../utilities/stateRegion';
import {uploadFile} from '../../api/setup/uploadFile';
import collectionRefs from '../../api/setup/collectionRefs';
import AuthContext from '../../auth/AuthContext';
import {addCategory} from '../../api/setup/postApi/addCategory';

const flyoutMenu = [
  {
    title: 'Phones & Tablets'.toLowerCase(),
    img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
    groups: [
      {
        title: 'MOBILE PHONES'.toLowerCase(),
        types: [
          {
            title: 'SmartPhones'.toLowerCase(),
            img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
          },
          {
            title: 'Basic Phones'.toLowerCase(),
            img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
          },
          {
            title: 'Refurbished Phones'.toLowerCase(),
            img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
          },
        ],
      },
      {
        title: 'TABLETS'.toLowerCase(),
        types: [
          'iPads'.toLowerCase(),
          'Andriod Tablets'.toLowerCase(),
          'Educational Tablets'.toLowerCase(),
          'Tablet Accessories'.toLowerCase(),
        ],
      },
      {
        title: 'MOBILE ACCESSORIES'.toLowerCase(),
        types: [
          'Accessory Kits'.toLowerCase(),
          'Adapters'.toLowerCase(),
          'Batteries'.toLowerCase(),
          'Battery Chargers'.toLowerCase(),
          'Bluetooth Headsets'.toLowerCase(),
          'Cables'.toLowerCase(),
          'Car Accessories'.toLowerCase(),
          'Chargers'.toLowerCase(),
          'Earphones & Headsets'.toLowerCase(),
          'MicroSD Cards'.toLowerCase(),
          'Screen Protectors'.toLowerCase(),
          'Selfie Sticks & Tripods'.toLowerCase(),
          'Smart Watches'.toLowerCase(),
        ],
      },
      {
        title: 'TOP SMARTPHONES'.toLowerCase(),
        types: [
          'iphone 13 pro max'.toLowerCase(),
          'iphone 13 pro'.toLowerCase(),
          'iphone 12 pro max'.toLowerCase(),
          'iphone 12 pro'.toLowerCase(),
          'iPhone 11 Pro Max'.toLowerCase(),
          'Samsung Galaxy S10'.toLowerCase(),
          'iPhone 11'.toLowerCase(),
          'Nokia 7.2'.toLowerCase(),
          'Huawei Y9 S'.toLowerCase(),
          'iPhone XS Max'.toLowerCase(),
          'Infinix S5'.toLowerCase(),
          'Vivo Y6'.toLowerCase(),
          'Oppo A8'.toLowerCase(),
        ],
      },
      {
        title: 'MOBILE PHONES'.toLowerCase(),
        types: [
          'Samsung'.toLowerCase(),
          'Apple'.toLowerCase(),
          'Huawei'.toLowerCase(),
          'Nokia'.toLowerCase(),
          'Xiaomi'.toLowerCase(),
          'Tecno'.toLowerCase(),
          'Hawuei'.toLowerCase(),
          'Vivo'.toLowerCase(),
          'Oppo'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Computing'.toLowerCase(),
    groups: [
      {
        title: 'COMPUTERS'.toLowerCase(),
        types: ['Desktops'.toLowerCase(), 'Laptops'.toLowerCase()],
      },
      {
        title: 'DATA STORAGE'.toLowerCase(),
        types: [
          'External Hard Drives'.toLowerCase(),
          'USB Flash Drives'.toLowerCase(),
          'External Solid State'.toLowerCase(),
        ],
      },
      {
        title: 'ANTIVIRUS & SECURITY'.toLowerCase(),
        types: ['Antivirus'.toLowerCase(), 'Internet Security'.toLowerCase()],
      },
      {
        title: 'PRINTERS'.toLowerCase(),
        types: [
          'Inkjet Printers'.toLowerCase(),
          'Laser Printers'.toLowerCase(),
          'Printer Ink & Toner'.toLowerCase(),
        ],
      },
      {
        title: 'COMPUTER ACCESSORIES'.toLowerCase(),
        types: [
          'Keyboards & Mice'.toLowerCase(),
          'Uninterrupted Power Supply'.toLowerCase(),
          'Memory Cards'.toLowerCase(),
          'Batteries'.toLowerCase(),
          'Scanners'.toLowerCase(),
          'Video Projectors'.toLowerCase(),
        ],
      },
      {
        title: 'TOP BRANDS'.toLowerCase(),
        types: [
          'HP'.toLowerCase(),
          'Logitech'.toLowerCase(),
          'Dell'.toLowerCase(),
          'Lenovo'.toLowerCase(),
          'Apple'.toLowerCase(),
          'ASUS'.toLowerCase(),
          'Huawei'.toLowerCase(),
          'Microsoft'.toLowerCase(),
          'Kingston'.toLowerCase(),
          'Seagate'.toLowerCase(),
          'Samsung'.toLowerCase(),
          'Sandisk'.toLowerCase(),
          'Toshiba'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Electronics'.toLowerCase(),
    groups: [
      {
        title: 'TELEVISION & VIDEO'.toLowerCase(),
        types: [
          'Televisions'.toLowerCase(),
          'Smart TVs'.toLowerCase(),
          'LED & LCD TVs'.toLowerCase(),
          'QLED & OLED TVs'.toLowerCase(),
          'DVD Players & Recorders'.toLowerCase(),
        ],
      },
      {
        title: 'HOME AUDIO'.toLowerCase(),
        types: [
          'Home Theatre Systems'.toLowerCase(),
          'Receivers & Amplifiers'.toLowerCase(),
          'Sound Bars'.toLowerCase(),
        ],
      },
      {
        title: 'CAMERAS & PHOTOS'.toLowerCase(),
        types: [
          'Digital'.toLowerCase(),
          'Cameras'.toLowerCase(),
          'Projectors'.toLowerCase(),
          'Video Surveillance'.toLowerCase(),
          'Camcorders'.toLowerCase(),
        ],
      },
      {
        title: 'GENERATORS & PORTABLE POWER'.toLowerCase(),
        types: [
          'Generators'.toLowerCase(),
          'Power Inverters'.toLowerCase(),
          'Solar & Wind Power'.toLowerCase(),
          'Stablizers'.toLowerCase(),
        ],
      },
      {
        title: 'TOP ELECTRONICS BRANDS'.toLowerCase(),
        types: [
          'LG'.toLowerCase(),
          'Samsung'.toLowerCase(),
          'Sony'.toLowerCase(),
          'TCL'.toLowerCase(),
          'Hisense'.toLowerCase(),
          'Canon'.toLowerCase(),
          'DStv'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Fashion'.toLowerCase(),
    groups: [
      {
        title: "WOMEN'S FASHION".toLowerCase(),
        types: [
          'Clothing'.toLowerCase(),
          'Shoes'.toLowerCase(),
          'Accessories'.toLowerCase(),
          'Jewelry'.toLowerCase(),
          'Handbags & Wallets'.toLowerCase(),
          'Underwear & Sleepwear'.toLowerCase(),
          'Maternity'.toLowerCase(),
          'Dresses'.toLowerCase(),
          'Traditional'.toLowerCase(),
          'Beach & Swimwear'.toLowerCase(),
          'Flats'.toLowerCase(),
        ],
      },
      {
        title: "KID'S FASHION".toLowerCase(),
        types: ["Boy's Fashion".toLowerCase(), "Girl's Fashion".toLowerCase()],
      },
      {
        title: "MEN'S FASHION".toLowerCase(),
        types: [
          'Clothing'.toLowerCase(),
          'Shoes'.toLowerCase(),
          'Accessories'.toLowerCase(),
          'Underwear & Sleepwear'.toLowerCase(),
          'Traditional & Cultural Wear'.toLowerCase(),
          'T-Shirts'.toLowerCase(),
          'Polo Shirts'.toLowerCase(),
          'Trousers & Chinos'.toLowerCase(),
          'Sneakers'.toLowerCase(),
          'Jewelry'.toLowerCase(),
          'Jerseys'.toLowerCase(),
        ],
      },
      {title: 'ALL FASHION'.toLowerCase(), types: []},
      {
        title: 'WATCHES'.toLowerCase(),
        types: ["Men's Watches".toLowerCase(), "Women's Watches".toLowerCase()],
      },
      {
        title: 'SUNGLASSES'.toLowerCase(),
        types: [
          "Men's Sunglasses".toLowerCase(),
          "Women's Sunglasses".toLowerCase(),
        ],
      },
      {
        title: 'TOP BRANDS'.toLowerCase(),
        types: [
          'Adidas'.toLowerCase(),
          'Zara'.toLowerCase(),
          'Nike'.toLowerCase(),
          'Casio'.toLowerCase(),
          'Puma'.toLowerCase(),
          'Defacto'.toLowerCase(),
          'Citizen'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Automobiles'.toLowerCase(),
    groups: [
      {
        title: 'CAR CARE'.toLowerCase(),
        types: [
          'Cleaning Kits'.toLowerCase(),
          'Exterior Care'.toLowerCase(),
          'Interior Care'.toLowerCase(),
        ],
      },
      {
        title: 'CAR ELECTRONICS & ACCESSORIES'.toLowerCase(),
        types: [
          'Car Electronics'.toLowerCase(),
          'Car Accessories'.toLowerCase(),
          'Power & Battery'.toLowerCase(),
        ],
      },
      {
        title: 'CAR CARE'.toLowerCase(),
        types: [
          'Bulbs'.toLowerCase(),
          'Accent & Off Road Lighting'.toLowerCase(),
        ],
      },
      {
        title: 'EXTERIOR ACCESSORIES'.toLowerCase(),
        types: [
          'Covers'.toLowerCase(),
          'Mirrors'.toLowerCase(),
          'Bumper Stickers, Decals & Magnets'.toLowerCase(),
        ],
      },
      {
        title: 'OILS & FLUIDS'.toLowerCase(),
        types: [
          'Brake Fluids'.toLowerCase(),
          'Greases & Lubricants'.toLowerCase(),
          'Oils'.toLowerCase(),
        ],
      },
      {
        title: 'INTERIOR ACCESSORIES'.toLowerCase(),
        types: [
          'Air Freshners'.toLowerCase(),
          'Consoles & Organizers'.toLowerCase(),
          'Key Chains'.toLowerCase(),
          'Floor Mats & Cargo Liners'.toLowerCase(),
          'Sun Protection'.toLowerCase(),
          'Seat Covers & Accessories'.toLowerCase(),
        ],
      },
      {
        title: 'TYRE & RIMS'.toLowerCase(),
        types: ['Tyre'.toLowerCase(), 'Inflator & Guages'.toLowerCase()],
      },
    ],
  },

  {
    title: 'Home & office'.toLowerCase(),
    groups: [
      {
        title: 'HOME & KITCHEN'.toLowerCase(),
        types: [
          'Bath'.toLowerCase(),
          'Bedding'.toLowerCase(),
          'Home Decor'.toLowerCase(),
          'Home Furniture'.toLowerCase(),
          'Vacuums & Floor Care'.toLowerCase(),
          'Wall Art'.toLowerCase(),
          'Cookware'.toLowerCase(),
          'Bakeware'.toLowerCase(),
          'Small Appliances'.toLowerCase(),
          'Cutlery & Knife Accessories'.toLowerCase(),
        ],
      },
      {
        title: 'HOME & OFFICE FURNITURE'.toLowerCase(),
        types: [
          'Kitchen & Dining'.toLowerCase(),
          'Lighting'.toLowerCase(),
          'Stationery'.toLowerCase(),
          ' Storage & Organization'.toLowerCase(),
        ],
      },
      {
        title: 'OFFICE PRODUCTS'.toLowerCase(),
        types: [
          'Office & School Supplies'.toLowerCase(),
          'Office Furniture & Lighting'.toLowerCase(),
          'Packaging Materials'.toLowerCase(),
        ],
      },
      {
        title: 'SMALL APPLIANCES'.toLowerCase(),
        types: [
          'Ironing & Laundry'.toLowerCase(),
          'Kettles'.toLowerCase(),
          'Mixing & Blending'.toLowerCase(),
          'Microwave Ovens'.toLowerCase(),
          'Vacuum Cleaners'.toLowerCase(),
          'Kitchen Bundles'.toLowerCase(),
        ],
      },
      {
        title: 'LARGE APPLIANCES'.toLowerCase(),
        types: [
          'Air Conditioners'.toLowerCase(),
          'Cookers'.toLowerCase(),
          'Washers & Dryers'.toLowerCase(),
          'Fans'.toLowerCase(),
          'Freezers'.toLowerCase(),
          'Refrigerators'.toLowerCase(),
          'Dishwashers'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Supermarket'.toLowerCase(),
    groups: [
      {
        title: 'CAR CARE'.toLowerCase(),
        types: [
          'Grains & Rice'.toLowerCase(),
          'Pasta'.toLowerCase(),
          'Noodles'.toLowerCase(),
          'Breakfast Foods'.toLowerCase(),
          'Herbs, Spices & Seasoning'.toLowerCase(),
          'Flours & Meals'.toLowerCase(),
          'Malt Drinks'.toLowerCase(),
          'Coffee'.toLowerCase(),
          'Water'.toLowerCase(),
          'Cooking Oil'.toLowerCase(),
          'Juices'.toLowerCase(),
          'Soft Drinks'.toLowerCase(),
          'Canned & Packaged Foods'.toLowerCase(),
          'Candy & Chocolate'.toLowerCase(),
          'Syrups, Sugars & Sweeteners'.toLowerCase(),
        ],
      },
      {title: 'BABY PRODUCTS'.toLowerCase(), types: []},
      {
        title: 'HOUSEHOLD CLEANING'.toLowerCase(),
        types: [
          'Laundry'.toLowerCase(),
          'Air Fresheners'.toLowerCase(),
          'Toilet Paper & Wipes'.toLowerCase(),
          'Bathroom Cleaners'.toLowerCase(),
          'Dishwashing'.toLowerCase(),
          'Disinfectant Wipes'.toLowerCase(),
        ],
      },
      {
        title: 'BEER, WINE & SPIRITS'.toLowerCase(),
        types: [
          'Beers'.toLowerCase(),
          'Vodka'.toLowerCase(),
          'Red Wine'.toLowerCase(),
          'Champagne & Sparkling Wine'.toLowerCase(),
          'White Wine'.toLowerCase(),
          'Whiskey'.toLowerCase(),
          'Liquors'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Baby Products'.toLowerCase(),
    groups: [
      {
        title: 'APPAREL & ACCESSORIES'.toLowerCase(),
        types: ['Baby Boys'.toLowerCase(), 'Baby Girls'.toLowerCase()],
      },
      {
        title: 'DIAPERING'.toLowerCase(),
        types: [
          'Disposable Diapers'.toLowerCase(),
          'Diaper Bags'.toLowerCase(),
          'Wipes & Holders'.toLowerCase(),
        ],
      },
      {
        title: 'BABY & TODDLER TOYS'.toLowerCase(),
        types: [
          'Activity Play Centers'.toLowerCase(),
          'Music & Sound'.toLowerCase(),
          'Bath Toys'.toLowerCase(),
        ],
      },
      {
        title: 'BATHING & SKIN CARE'.toLowerCase(),
        types: [
          'Washcloths & Towels'.toLowerCase(),
          'Grooming & Healthcare Kits'.toLowerCase(),
          'Skin Care'.toLowerCase(),
          'Bathing Tubs & Seats'.toLowerCase(),
          'Bathroom Safety'.toLowerCase(),
        ],
      },
      {
        title: 'FEEDING'.toLowerCase(),
        types: [
          'Bibs & Burp Cloths'.toLowerCase(),
          'Breastfeeding'.toLowerCase(),
          'Bottle-Feeding'.toLowerCase(),
          'Pacifiers & Accessories'.toLowerCase(),
          'Food Storage'.toLowerCase(),
          'Highchairs & Booster Seats'.toLowerCase(),
          'Solid Feeding'.toLowerCase(),
        ],
      },
      {
        title: 'GEAR'.toLowerCase(),
        types: [
          'Backpacks & Carriers'.toLowerCase(),
          'Swings, Jumpers & Bouncers'.toLowerCase(),
          'Walkers'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Health & Beauty'.toLowerCase(),
    groups: [
      {
        title: 'MAKE UP'.toLowerCase(),
        types: [
          'Concealers & Color Correctors'.toLowerCase(),
          'Foundation'.toLowerCase(),
          'Powder'.toLowerCase(),
          'Lip Gloss'.toLowerCase(),
          'Lip Liner'.toLowerCase(),
          'Lipstick'.toLowerCase(),
          'Eyeliner & Kajal'.toLowerCase(),
          'Eyeshadow'.toLowerCase(),
          'Mascara'.toLowerCase(),
        ],
      },
      {
        title: 'FRAGRANCES'.toLowerCase(),
        types: ["Women's".toLowerCase(), "Men's".toLowerCase()],
      },
      {
        title: 'HAIR CARE'.toLowerCase(),
        types: [
          'Hair & Scalp Care'.toLowerCase(),
          'Hair Accessories'.toLowerCase(),
          'Hair Cutting Tools'.toLowerCase(),
          'Shampoo & Conditioner'.toLowerCase(),
          'Wigs & Accessories'.toLowerCase(),
        ],
      },
      {
        title: 'PERSONAL CARE'.toLowerCase(),
        types: [
          'Feminine Care'.toLowerCase(),
          'Contraceptives & Lubricants'.toLowerCase(),
          'Body'.toLowerCase(),
        ],
      },
      {
        title: 'ORAL CARE'.toLowerCase(),
        types: [
          'Dental Care kits'.toLowerCase(),
          'Dental Floss & Picks'.toLowerCase(),
          'Teeth Whitening'.toLowerCase(),
          'Toothbrushes'.toLowerCase(),
        ],
      },
      {
        title: 'HEALTH CARE'.toLowerCase(),
        types: [
          'Face Protection'.toLowerCase(),
          'Thermometers'.toLowerCase(),
          'Hand Sanitizers'.toLowerCase(),
          'Lab, Safety & Work Gloves'.toLowerCase(),
        ],
      },
    ],
  },

  {
    title: 'Sporting goods'.toLowerCase(),
    groups: [
      {
        title: 'CARDIO TRAINING'.toLowerCase(),
        types: [
          'Exercise Bikes'.toLowerCase(),
          'Treadmills'.toLowerCase(),
          'Elliptical Trainers'.toLowerCase(),
        ],
      },
      {
        title: 'STRENGTH TRAINING EQUIPMENT'.toLowerCase(),
        types: [
          'Core & Abdominal Trainers'.toLowerCase(),
          'Dumbbells'.toLowerCase(),
          'Bars'.toLowerCase(),
        ],
      },
      {
        title: 'ACCESSORIES'.toLowerCase(),
        types: [
          'Exercise Bands'.toLowerCase(),
          'Exercise Mats'.toLowerCase(),
          'Jump Ropes'.toLowerCase(),
          'Sports Clothing'.toLowerCase(),
        ],
      },
      {
        title: 'TEAM SPORTS'.toLowerCase(),
        types: [
          'Basketball'.toLowerCase(),
          'Team Sport Accessories'.toLowerCase(),
          'Tennis & Racquet Sports'.toLowerCase(),
          'Swimming'.toLowerCase(),
        ],
      },
      {
        title: 'OUTDOOR & ADVENTURE'.toLowerCase(),
        types: ['Cycling'.toLowerCase(), 'Running'.toLowerCase()],
      },
    ],
  },

  {
    title: 'Other Cateories'.toLowerCase(),
    groups: [
      {
        title: 'TOYS & GAMES'.toLowerCase(),
        types: [
          'Games'.toLowerCase(),
          'Dress Up & Pretend Play'.toLowerCase(),
          'Sports & Outdoor Play'.toLowerCase(),
          'Top Toys & Games'.toLowerCase(),
        ],
      },
      {title: 'MISCELLANEOUS'.toLowerCase(), types: []},
      {title: 'BOOKS, MOVIES AND MUSIC'.toLowerCase(), types: []},
      {title: 'MUSICAL INSTRUMENTS'.toLowerCase(), types: []},
      {title: 'PET SUPPLIES'.toLowerCase(), types: []},
      {title: 'ESHOP GLOBAL'.toLowerCase(), types: []},
      {
        title: 'OFFICIAL STORES'.toLowerCase(),
        types: [
          'Michelin'.toLowerCase(),
          'Nestle'.toLowerCase(),
          'Xiaomi'.toLowerCase(),
          'Huawei'.toLowerCase(),
          "L'Oreal".toLowerCase(),
          'MAC'.toLowerCase(),
          'Apple'.toLowerCase(),
          'Intel'.toLowerCase(),
          'Reckitt Benckiser'.toLowerCase(),
          'Binatone'.toLowerCase(),
          'Nexus'.toLowerCase(),
        ],
      },
      {
        title: 'GROCERY'.toLowerCase(),
        types: [
          'Food Cupboards'.toLowerCase(),
          'Baby Products'.toLowerCase(),
          'Plastic & Paper Products'.toLowerCase(),
          'Drinks'.toLowerCase(),
          'Hygiene'.toLowerCase(),
          'Household Cleaning'.toLowerCase(),
          'Beer, Wine & Spirits'.toLowerCase(),
        ],
      },
      {title: 'GARDEN & OUTDOORS'.toLowerCase(), types: []},
      {title: 'INDUSTRIAL & SCIENTIFIC'.toLowerCase(), types: []},
      {title: 'SERVICES'.toLowerCase(), types: []},
      {title: 'LIVESTOCK'.toLowerCase(), types: []},
    ],
  },
];

const updateUserData = (catId, data) => {
  return collectionRefs.categoryCollectionRef.doc(catId).update(data);
};

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

  const categoriesRef = firestore().collection('categoriesTest');

  // const {categories} = useContext(AuthContext);

  const updateCat = [
    {
      id: '1659126814416',
      title: 'phones & tablets',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/phone&tab.jpg',
    },
    {
      id: '1659126815066',
      title: 'computing',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/computing2.jpg',
    },
    {
      id: '1659126815526',
      title: 'electronics',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/elect.jpg',
    },
    {
      id: '1659126816008',
      title: 'fashion',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/fashion.jpg',
    },
    {
      id: '1659126816527',
      title: 'automobiles',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/automobile.jpg',
    },
    {
      id: '1659126816967',
      title: 'home & office',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/home-office.jpg',
    },
    {
      id: '1659126817367',
      title: 'supermarket',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/grocery.jpg',
    },
    {
      id: '1659126817806',
      title: 'baby products',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/baby.jpg',
    },
    {
      id: '1659126818182',
      title: 'health & beauty',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
    },
    {
      id: '1659126818612',
      title: 'sporting goods',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/sporting.jpg',
    },
    {
      id: '1659126819052',
      title: 'other cateories',
      img: 'file:///storage/emulated/0/DCIM/MyAlbums/Upload/others.jpg',
    },
  ];

  const handleSubmit = async () => {
    // const data = flyoutMenu[0];
    for (let i = 0; i < updateCat.length; i++) {
      const data = updateCat[i];

      const img = await uploadFile(`${'CATEGORY_IMAGES/CATEGORIES'}`, data.img);

      updateUserData(data.id, {['img']: img}).then(() => {
        console.log(data.title, 'success');
      });
      // await addCategory(`${Date.now() + i}`, flyoutMenu[i])
      //   .then(() => {
      //     console.log(flyoutMenu[i].title, 'category added');
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
    // require('../../assets/images/Categories/automobile.jpg');
    // let imageUrls = [];
    // for (let i = 0; i < '1'.length; i++) {
    //   imageUrls.push(
    //     await uploadFile(
    //       `${'CATEGORY_IMAGES'}`,
    //       'file:///storage/emulated/0/DCIM/MyAlbums/Upload/health & beauty.jpg',
    //       // require('../../assets/images/Categories/automobile.jpg'),
    //     ),
    //   );
    // }
    // console.log(data, 'confirm');
  };

  // console.log(stateRegion);

  // const stateList = Object.keys(stateRegion).map((key, index) => {
  //   return {label: key, value: key};
  // });

  // console.log(
  //   categories.map(el => {
  //     return {id: el.id, title: el.title};
  //   }),
  //   'frank',
  // );

  return (
    <View style={styles.container}>
      <AppGradientBtn label="upload to firebase" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageUploadTest;

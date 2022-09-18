import {addCarousel} from './setup/postApi/addCarousel';
import {addFeed} from './setup/postApi/addFeed';
import {dirNames, uploadFile} from './setup/uploadFile';

const feed = [
  {
    // _id: 1,
    title: 'Trending products',
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/trendingproducts.png',
    description: 'Check out most of the Products currently trending',
  },
  {
    // _id: 2,
    title: 'Deals of the Day',
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/daydeal-red.png',
    description: "See our today's best offer for you ",
  },
  {
    // _id: 3,
    title: 'Free delivery',
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/freedelivery-blue.png',
    description: 'Order Products currently available for free delivery',
  },
  {
    // _id: 4,
    title: 'Buy airtime/data',
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/buyairtime-3.png',
    description: 'We offer instant recharge of Airtime & Databundle',
  },
  {
    // _id: 5,
    title: 'MultiChoice subscription',
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/multichoice-black.png',
    description: 'Subcribe your multichioce decoder (e.g: DStv, GOtv, etc)',
  },
];

const caro = [
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_1.jpg',
    title: 'carousel 1',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_2.jpg',
    title: 'carousel 2',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_3.jpg',
    title: 'carousel 3',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_4.jpg',
    title: 'carousel 4',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_5.jpg',
    title: 'carousel 5',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_6.jpg',
    title: 'carousel 6',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_7.jpg',
    title: 'carousel 7',
  },
  {
    image: 'file:///storage/3904-1A1E/DCIM/MyAlbums/Feed/carouselimage_8.jpg',
    title: 'carousel 8',
  },
];

export const addAllFeed = async () => {
  // for (let i = 0; i < caro.length; i++) {
  //   const image = await uploadFile(dirNames.CAROUSEL_IMAGES, caro[i].image);
  //   addCarousel(`${Date.now() + i}`, {...caro[i], image}).then(() => {
  //     console.log(caro[i].title, 'Added succesfully');
  //   });
  // }
  // for (let i = 0; i < feed.length; i++) {
  //   const image = await uploadFile(dirNames.FEED_IMAGES, feed[i].image);
  //   addFeed(`${Date.now() + i}`, {...feed[i], image}).then(() => {
  //     console.log(feed[i].title, 'Added succesfully');
  //   });
  // }
};

export function getFeed() {
  return feed;
}

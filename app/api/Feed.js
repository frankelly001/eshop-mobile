const feed = [
  {
    _id: 1,
    title: 'Trending products',
    image: require('../assets/images/trendingproducts.png'),
    description: 'Check out most of the Products currently trending',
  },
  {
    _id: 2,
    title: 'Deals of the Day',
    image: require('../assets/images/daydeal-red.png'),
    description: "See our today's best offer for you ",
  },
  {
    _id: 3,
    title: 'Free delivery',
    image: require('../assets/images/freedelivery-blue.png'),
    description: 'Order Products currently available for free delivery',
  },
  {
    _id: 4,
    title: 'Buy airtime/data',
    image: require('../assets/images/buyairtime-3.png'),
    description: 'We offer instant recharge of Airtime & Databundle',
  },
  {
    _id: 5,
    title: 'MultiChoice subscription',
    image: require('../assets/images//multichoice-black.png'),
    description: 'Subcribe your multichioce decoder (e.g: DStv, GOtv, etc)',
  },
];

export function getFeed() {
  return feed;
}

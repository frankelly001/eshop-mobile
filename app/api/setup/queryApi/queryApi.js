import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

const searchFields = {
  TITLE: 'title',
  CATEGORY: 'category.title',
  CATEGORY_GROUP: 'category.group.title',
  CATEGORY_GROUP_TYPE: 'category.group.type',
};

// This is only for meant exact match
const categoryFieldSearch = (categoryName, catSearchField) => {
  return new Promise((resolve, reject) => {
    collectionRefs.productsCollectionRef
      .where(catSearchField, '==', categoryName)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });
        resolve(data);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

// This is only for query
const singleFieldSearch = (query, searchField) => {
  return new Promise((resolve, reject) => {
    collectionRefs.productsCollectionRef
      .orderBy(searchField)
      .startAt(query.toLowerCase())
      .endAt(query.toLowerCase() + '\uf8ff')
      .get()
      .then(querySnapShot => {
        const data = [];
        querySnapShot?.docs.forEach(el => data.push({id: el.id, ...el.data()}));
        resolve(data);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

const AllFieldsSearch = query => {
  return new Promise((resolve, reject) => {
    singleFieldSearch(query, searchFields.TITLE)
      .then(querySnapShot1 => {
        const data1 = [...querySnapShot1];
        singleFieldSearch(query, searchFields.CATEGORY)
          .then(querySnapShot2 => {
            const data2 = [...data1, ...querySnapShot2];
            singleFieldSearch(query, searchFields.CATEGORY_GROUP)
              .then(querySnapShot3 => {
                const data3 = [...data2, ...querySnapShot3];
                singleFieldSearch(query, searchFields.CATEGORY_GROUP_TYPE)
                  .then(finalQuerySnapShot => {
                    const data4 = [...data3, ...finalQuerySnapShot];
                    const finalData = getUniqueListBy(data4, 'id');
                    resolve(finalData);
                  })
                  .catch(finalError => {
                    reject('FINAL ERROR', finalError);
                  });
              })
              .catch(error3 => {
                reject('ERROR 3:', error3);
              });
          })
          .catch(error2 => {
            reject('ERROR2:', error2);
          });
      })
      .catch(error1 => {
        reject('ERROR1:', error1);
      });
  });
};

// const samplesRef = firestore()
//   .collectionGroup('examples')
//   .where('title', '==', 'fashion')
//   .where('category', '==', 'fashion')
//   .where('group', '==', 'fashion')
//   .where('type', '==', 'fashion');

// const handleQuery = () => {
//   samplesRef.get().then(querySnapShot => {
//     const data = [];
//     querySnapShot.forEach(el => {
//       data.push({id: el.id, ...el.data()});
//     });
//     console.log(data, 'This is the Query Snapshot');
//   });
// };

export default {
  searchFields,
  singleFieldSearch,
  AllFieldsSearch,
  categoryFieldSearch,
};
